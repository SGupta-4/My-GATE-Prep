// Converts docs/GATE_CS_Analysis_and_Roadmap.md into content/exams/gate-cs-2027/{exam,roadmap}.json.
// Usage: npm run parse:gate   (exits 1 and writes nothing if any check fails)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { ExamSchema, RoadmapSchema } from "../lib/schema.ts";
import type { Exam, Roadmap, Subject } from "../lib/schema.ts";

const EXAM_ID = "gate-cs-2027";
const EXAM_NAME = "GATE CS 2027";

// The md lists foundation *concepts*, not syllabus topics. Each concept is mapped to the
// topics that teach it directly. Checked below against the md's foundation table.
const FOUNDATION_TOPICS: Record<string, string[]> = {
  "Binary numbers & powers of 2 (bit-field math)": ["Number representation & arithmetic (2's comp, IEEE 754)"],
  "Finite automata & grammars": [
    "Regular expressions & finite automata (DFA/NFA, minimization)",
    "CFGs & push-down automata",
  ],
  "C pointers, arrays & recursion tracing": ["Programming in C (pointers, arrays, scope, output tracing)", "Recursion"],
  "Logic, sets & relations": [
    "Discrete: propositional & first-order logic",
    "Discrete: sets, relations, functions, posets, lattices",
  ],
  "Graph theory basics": ["Discrete: graph theory (connectivity, matching, colouring)"],
  "Counting & probability": ["Probability & statistics", "Discrete: combinatorics (counting)"],
  "Recurrences & asymptotic growth": [
    "Asymptotic complexity & solving recurrences",
    "Discrete: recurrence relations & generating functions",
  ],
  "Matrices & linear algebra": ["Linear algebra (matrices, determinants, eigen, systems, LU)"],
};

export const slug = (s: string) =>
  s.toLowerCase().replace(/'/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim().replace(/\*\*/g, ""));

/** Groups table rows (header and separator dropped) under the nearest ## or ### heading. */
function tables(md: string): { heading: string; rows: string[][] }[] {
  const out: { heading: string; rows: string[][] }[] = [];
  let heading = "";
  let current: string[][] | null = null;
  for (const line of md.split("\n")) {
    if (/^#{2,3} /.test(line)) {
      heading = line.replace(/^#+ /, "").trim();
      current = null;
    } else if (line.trim().startsWith("|")) {
      if (!current) {
        current = [];
        out.push({ heading, rows: current });
        continue; // header row
      }
      if (!/^\|[\s|:-]+\|$/.test(line.trim())) current.push(cells(line));
    } else current = null;
  }
  return out;
}

export function parseGateMd(md: string): { exam: Exam; roadmap: Roadmap; errors: string[] } {
  const errors: string[] = [];
  const all = tables(md);
  const subjects: Subject[] = [];

  for (const { heading, rows } of all) {
    const m = heading.match(/^\d+\. (.+?) — Total Questions: (\d+) \(Marks: (\d+)\)$/);
    if (!m) continue;
    const id = slug(m[1]);
    const hasSplit = rows[0]?.length === 5; // Rank | Topic | No. | 1-mark / 2-mark | Years
    subjects.push({
      id,
      name: m[1],
      totalQuestions: Number(m[2]),
      totalMarks: Number(m[3]),
      topics: rows.map((r) => {
        const [name, count, split, years] = hasSplit ? r.slice(1) : [r[0], r[1], null, r[2]];
        const questionCount = parseInt(count, 10);
        let oneMark: number | null = null;
        let twoMark: number | null = null;
        if (split !== null) {
          const s = split.match(/^(\d+)\s*\/\s*(\d+)$/);
          if (s) [oneMark, twoMark] = [Number(s[1]), Number(s[2])];
          else if (questionCount === 0) [oneMark, twoMark] = [0, 0];
          else errors.push(`${m[1]} / ${name}: cannot read 1-mark/2-mark split "${split}"`);
        }
        return {
          id: `${id}.${slug(name)}`,
          name,
          questionCount,
          marks: oneMark === null || twoMark === null ? null : oneMark + 2 * twoMark,
          oneMark,
          twoMark,
          yearsAsked: years === "–" ? [] : years.split(",").map((y) => y.trim()),
          isTop20: false,
          isFoundation: false,
        };
      }),
    });
  }

  const findTopic = (subjectName: string | null, topicName: string) =>
    subjects.filter((s) => !subjectName || s.name === subjectName).flatMap((s) => s.topics).find((t) => t.name === topicName);

  // Top-20 list
  const top = all.find((t) => t.heading.includes("Most Important Topics"))?.rows ?? [];
  for (const [, name, subject, count, marks] of top) {
    const t = findTopic(subject, name);
    if (!t) errors.push(`Top-20 topic not found in its subject table: ${subject} / ${name}`);
    else {
      t.isTop20 = true;
      if (t.questionCount !== Number(count)) errors.push(`Top-20 "${name}": ${count} questions vs ${t.questionCount} in subject table`);
      if (t.marks !== Number(marks)) errors.push(`Top-20 "${name}": ${marks} marks vs ${t.marks} in subject table`);
    }
  }

  // Foundation topics
  const foundationRows = all.find((t) => t.heading.includes("Foundation Topics"))?.rows ?? [];
  const foundationNames = foundationRows.map((r) => r[0]);
  if (foundationNames.join("|") !== Object.keys(FOUNDATION_TOPICS).join("|"))
    errors.push(`Foundation table changed; update FOUNDATION_TOPICS. Found: ${foundationNames.join("; ")}`);
  for (const name of Object.values(FOUNDATION_TOPICS).flat()) {
    const t = findTopic(null, name);
    if (t) t.isFoundation = true;
    else errors.push(`Foundation mapping points to unknown topic: ${name}`);
  }

  // Cross-check against the weightage summary
  const summary = all.find((t) => t.heading.includes("Subject Weightage Summary"))?.rows ?? [];
  for (const [name, q, marks] of summary) {
    if (name === "Total") continue;
    const s = subjects.find((x) => x.name === name);
    if (!s) errors.push(`Weightage summary lists unknown subject: ${name}`);
    else if (s.totalQuestions !== Number(q) || s.totalMarks !== Number(marks))
      errors.push(`${name}: summary says ${q} Qs / ${marks} marks, section header says ${s.totalQuestions} / ${s.totalMarks}`);
  }

  // Roadmap
  const weeks = new Map<number, Roadmap["weeks"][number]>();
  for (const { heading, rows } of all) {
    if (!heading.startsWith("Week")) continue;
    const title = heading.split(" — ").slice(1).join(" — ");
    let prev = { pyqTarget: "", revision: "" };
    for (const [w, days, topicText, tasks, pyq, rev] of rows) {
      const week = Number(w);
      if (!weeks.has(week)) {
        weeks.set(week, { week, title, days: [] });
        prev = { pyqTarget: "", revision: "" };
      }
      // "↑" means "same as the row above".
      const row = { pyqTarget: pyq === "↑" ? prev.pyqTarget : pyq, revision: rev === "↑" ? prev.revision : rev };
      prev = row;
      const r = days.match(/^D(\d)(?:–D(\d))?$/);
      if (!r) {
        errors.push(`Week ${week}: cannot read days "${days}"`);
        continue;
      }
      // Split on separators that follow a "(count)", so "IPv4: subnetting, CIDR, ... (16)" stays whole.
      const topics = topicText.split(/(?<=\))\s*(?:,|\+)\s*/);
      for (let d = Number(r[1]); d <= Number(r[2] ?? r[1]); d++)
        weeks.get(week)!.days.push({ id: `w${week}d${d}`, day: d, topics, tasks, ...row });
    }
  }
  const roadmap: Roadmap = { weeks: [...weeks.values()].sort((a, b) => a.week - b.week) };

  const exam: Exam = { id: EXAM_ID, name: EXAM_NAME, subjects };
  errors.push(...checkGate(exam, roadmap));
  return { exam, roadmap, errors };
}

/** The checks the spec requires, plus per-subject totals. */
export function checkGate(exam: Exam, roadmap: Roadmap): string[] {
  const errors: string[] = [];
  const topics = exam.subjects.flatMap((s) => s.topics);
  const total = topics.reduce((n, t) => n + t.questionCount, 0);
  const top20 = topics.filter((t) => t.isTop20).length;
  if (exam.subjects.length !== 11) errors.push(`Expected 11 sections, found ${exam.subjects.length}`);
  if (total !== 650) errors.push(`Expected 650 questions in total, found ${total}`);
  if (top20 !== 20) errors.push(`Expected 20 top-20 topics, found ${top20}`);
  for (const s of exam.subjects) {
    const q = s.topics.reduce((n, t) => n + t.questionCount, 0);
    if (q !== s.totalQuestions) errors.push(`${s.name}: topics add up to ${q} questions, header says ${s.totalQuestions}`);
    if (s.topics.every((t) => t.marks !== null)) {
      const m = s.topics.reduce((n, t) => n + (t.marks ?? 0), 0);
      if (m !== s.totalMarks) errors.push(`${s.name}: topics add up to ${m} marks, header says ${s.totalMarks}`);
    }
    for (const t of s.topics)
      if (t.oneMark !== null && t.oneMark + (t.twoMark ?? 0) !== t.questionCount)
        errors.push(`${s.name} / ${t.name}: ${t.oneMark} + ${t.twoMark} ≠ ${t.questionCount} questions`);
  }
  if (roadmap.weeks.length !== 8) errors.push(`Expected 8 roadmap weeks, found ${roadmap.weeks.length}`);
  for (const w of roadmap.weeks)
    if (w.days.map((d) => d.day).join() !== "1,2,3,4,5,6,7") errors.push(`Week ${w.week} days are ${w.days.map((d) => d.day).join()}`);
  return errors;
}

if (import.meta.filename === process.argv[1]) {
  const root = join(dirname(import.meta.filename), "..");
  const { exam, roadmap, errors } = parseGateMd(readFileSync(join(root, "docs/GATE_CS_Analysis_and_Roadmap.md"), "utf8"));
  if (errors.length) {
    console.error(`✗ ${errors.length} check(s) failed, nothing written:\n- ${errors.join("\n- ")}`);
    process.exit(1);
  }
  const dir = join(root, "content/exams", EXAM_ID);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "exam.json"), JSON.stringify(ExamSchema.parse(exam), null, 2) + "\n");
  writeFileSync(join(dir, "roadmap.json"), JSON.stringify(RoadmapSchema.parse(roadmap), null, 2) + "\n");
  const topics = exam.subjects.flatMap((s) => s.topics);
  console.log(
    `✓ ${exam.subjects.length} sections, ${topics.reduce((n, t) => n + t.questionCount, 0)} questions, ` +
      `${topics.filter((t) => t.isTop20).length} top-20, ${topics.filter((t) => t.isFoundation).length} foundation, ` +
      `${roadmap.weeks.length} weeks → ${dir}`,
  );
}
