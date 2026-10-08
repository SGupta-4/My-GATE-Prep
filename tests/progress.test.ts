import { describe, expect, it } from "vitest";
import type { Subject } from "../lib/schema";
import {
  addDays, dueRevisions, emptyProgress, isHttpUrl, progressStats, roadmapToday, setStatus, updateTopic,
} from "../lib/progress";
import { loadExam } from "../lib/exams";

const topic = (id: string, questionCount: number, marks: number | null) => ({
  id, name: id, questionCount, marks, oneMark: null, twoMark: null, yearsAsked: [], isTop20: false, isFoundation: false,
});
const subject: Subject = {
  id: "s", name: "S", totalQuestions: 22, totalMarks: 36,
  topics: [topic("big", 21, 34), topic("small", 1, 2)],
};

describe("weighted progress", () => {
  it("weights done topics by PYQ marks", () => {
    const p = setStatus(emptyProgress(), "big", "done", "2026-01-01");
    expect(progressStats([subject], p)).toMatchObject({ done: 1, total: 2, remaining: 1, pct: 50, weightedPct: 94 });
    const q = setStatus(emptyProgress(), "small", "done", "2026-01-01");
    expect(progressStats([subject], q)).toMatchObject({ pct: 50, weightedPct: 6 });
  });

  it("falls back to the subject's average marks per question when a topic has no marks", () => {
    const ga: Subject = { id: "ga", name: "GA", totalQuestions: 4, totalMarks: 6, topics: [topic("a", 3, null), topic("b", 1, null)] };
    expect(progressStats([ga], setStatus(emptyProgress(), "a", "done", "2026-01-01")).weightedPct).toBe(75);
  });

  it("handles no topics done and zero-weight topics", () => {
    expect(progressStats([subject], emptyProgress())).toMatchObject({ pct: 0, weightedPct: 0 });
    const zero: Subject = { ...subject, topics: [topic("z", 0, 0)] };
    expect(progressStats([zero], emptyProgress()).weightedPct).toBe(0);
  });
});

describe("revision scheduling", () => {
  it("schedules +3, +10, +30 days when a topic is marked Done, across month/year ends", () => {
    const p = setStatus(emptyProgress(), "big", "done", "2026-12-25");
    expect(p.topics.big.revisions).toEqual([
      { due: "2026-12-28", done: false },
      { due: "2027-01-04", done: false },
      { due: "2027-01-24", done: false },
    ]);
  });

  it("keeps the schedule when Done is set again and clears it when leaving Done", () => {
    const p = setStatus(emptyProgress(), "big", "done", "2026-01-01");
    expect(setStatus(p, "big", "done", "2026-02-01").topics.big.revisions[0].due).toBe("2026-01-04");
    expect(setStatus(p, "big", "needs-revision", "2026-02-01").topics.big.revisions).toEqual([]);
  });

  it("lists only revisions that are due and not done", () => {
    const exam = { id: "x", name: "X", subjects: [subject] };
    let p = setStatus(emptyProgress(), "big", "done", "2026-01-01");
    expect(dueRevisions(exam, p, "2026-01-03")).toHaveLength(0);
    expect(dueRevisions(exam, p, "2026-01-11").map((d) => d.due)).toEqual(["2026-01-04", "2026-01-11"]);
    p = updateTopic(p, "big", { revisions: p.topics.big.revisions.map((r, i) => ({ ...r, done: i === 0 })) });
    expect(dueRevisions(exam, p, "2026-01-11").map((d) => d.due)).toEqual(["2026-01-11"]);
  });

  it("adds days across DST changes", () => expect(addDays("2026-03-28", 3)).toBe("2026-03-31"));
});

describe("roadmap today", () => {
  const { roadmap } = loadExam("gate-cs-2027");
  it("maps a date to week/day", () => {
    const t = roadmapToday(roadmap, "2026-01-01", "2026-01-10");
    expect(t.kind === "on" && [t.week.week, t.day.day]).toEqual([2, 3]);
    expect(roadmapToday(roadmap, "2026-01-05", "2026-01-01")).toEqual({ kind: "before", daysLeft: 4 });
    expect(roadmapToday(roadmap, "2026-01-01", "2026-02-26").kind).toBe("after");
  });
});

it("accepts only http/https URLs", () => {
  expect(isHttpUrl("https://example.com/a")).toBe(true);
  expect(isHttpUrl("http://example.com")).toBe(true);
  expect(isHttpUrl("javascript:alert(1)")).toBe(false);
  expect(isHttpUrl("ftp://example.com")).toBe(false);
  expect(isHttpUrl("example.com")).toBe(false);
});
