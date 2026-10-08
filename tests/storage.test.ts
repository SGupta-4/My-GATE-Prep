import { beforeEach, expect, it } from "vitest";
import { emptyProgress, setStatus, updateTopic } from "../lib/progress";
import { exportAll, importAll, loadProgress, saveProgress } from "../lib/storage";

// Minimal in-memory localStorage for the node test environment.
beforeEach(() => {
  const m = new Map<string, string>();
  globalThis.localStorage = {
    get length() { return m.size; },
    key: (i: number) => [...m.keys()][i] ?? null,
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, String(v)),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
  };
});

it("round-trips export → import", () => {
  let p = setStatus(emptyProgress(), "t1", "done", "2026-01-01");
  p = updateTopic(p, "t1", {
    note: "watch sign bits", confidence: 2,
    links: [{ id: "l1", title: "Lecture", url: "https://example.com/v", type: "video" }],
  });
  p = { ...p, startDate: "2026-01-01", doneDays: ["w1d1"], mocks: [{ id: "m1", date: "2026-02-01", paper: "Mock 1", total: 61.5, subjectMarks: { algorithms: 7 } }] };
  saveProgress("exam-a", p);
  saveProgress("exam-b", emptyProgress());

  const json = exportAll();
  localStorage.clear();
  expect(loadProgress("exam-a")).toEqual(emptyProgress());

  expect(importAll(json)).toEqual({ ok: true, examIds: ["exam-a", "exam-b"] });
  expect(loadProgress("exam-a")).toEqual(p);
  expect(loadProgress("exam-b")).toEqual(emptyProgress());
});

it("rejects invalid backups without writing anything", () => {
  expect(importAll("not json").ok).toBe(false);
  expect(importAll(JSON.stringify({ app: "other", version: 1, exams: {} })).ok).toBe(false);
  const bad = { app: "prep-dashboard", version: 1, exams: { x: { topics: { t: { links: [{ id: "1", title: "x", url: "javascript:alert(1)", type: "video" }] } } } } };
  expect(importAll(JSON.stringify(bad)).ok).toBe(false);
  expect(localStorage.length).toBe(0);
});

it("survives storage that throws", () => {
  globalThis.localStorage.getItem = () => { throw new Error("blocked"); };
  globalThis.localStorage.setItem = () => { throw new Error("quota"); };
  expect(loadProgress("x")).toEqual(emptyProgress());
  expect(saveProgress("x", emptyProgress())).toBe(false);
});
