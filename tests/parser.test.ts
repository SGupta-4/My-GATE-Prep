import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { listExams, loadExam } from "../lib/exams";
import { parseGateMd } from "../scripts/parse-gate-md";

const md = readFileSync("docs/GATE_CS_Analysis_and_Roadmap.md", "utf8");

describe("parse-gate-md", () => {
  const { exam, roadmap, errors } = parseGateMd(md);
  const topics = exam.subjects.flatMap((s) => s.topics);

  it("passes every check", () => expect(errors).toEqual([]));
  it("finds 11 sections", () => expect(exam.subjects).toHaveLength(11));
  it("totals 650 questions", () => expect(topics.reduce((n, t) => n + t.questionCount, 0)).toBe(650));
  it("flags 20 top-20 topics", () => expect(topics.filter((t) => t.isTop20)).toHaveLength(20));
  it("builds 8 weeks of 7 days", () => expect(roadmap.weeks.map((w) => w.days.length)).toEqual(Array(8).fill(7)));

  it("matches the committed JSON", () => {
    expect(loadExam("gate-cs-2027")).toEqual({ exam, roadmap });
  });

  it("reports a mismatch instead of passing", () => {
    expect(parseGateMd(md.replace("| Probability & statistics | 21 | 8 / 13 |", "| Probability & statistics | 20 | 8 / 12 |")).errors)
      .toContain("Expected 650 questions in total, found 649");
  });
});

it("every exam folder validates", () => {
  for (const { id } of listExams()) expect(() => loadExam(id)).not.toThrow();
});
