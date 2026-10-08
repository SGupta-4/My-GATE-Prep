import { z } from "zod";
import type { Exam, Roadmap, Subject, Topic } from "./schema";

export const STATUSES = {
  "not-started": "Not started",
  "in-progress": "In progress",
  done: "Done",
  "needs-revision": "Needs revision",
} as const;
export type Status = keyof typeof STATUSES;

export const LINK_TYPES = ["video", "notes", "PYQ", "article", "other"] as const;

export function isHttpUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const IsoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const LinkSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  url: z.string().refine(isHttpUrl, "Only http/https links are allowed"),
  type: z.enum(LINK_TYPES),
});

export const TopicProgressSchema = z.object({
  status: z.enum(Object.keys(STATUSES) as [Status, ...Status[]]).default("not-started"),
  note: z.string().default(""),
  confidence: z.number().int().min(1).max(5).nullable().default(null),
  links: z.array(LinkSchema).default([]),
  revisions: z.array(z.object({ due: IsoDate, done: z.boolean() })).default([]),
});

export const MockSchema = z.object({
  id: z.string(),
  date: IsoDate,
  paper: z.string().min(1),
  total: z.number(),
  subjectMarks: z.record(z.string(), z.number()).default({}),
});

export const ProgressSchema = z.object({
  topics: z.record(z.string(), TopicProgressSchema).default({}),
  startDate: IsoDate.nullable().default(null),
  doneDays: z.array(z.string()).default([]),
  mocks: z.array(MockSchema).default([]),
});

export type Link = z.infer<typeof LinkSchema>;
export type TopicProgress = z.infer<typeof TopicProgressSchema>;
export type Mock = z.infer<typeof MockSchema>;
export type Progress = z.infer<typeof ProgressSchema>;

export const emptyProgress = (): Progress => ProgressSchema.parse({});
const emptyTopic = (): TopicProgress => TopicProgressSchema.parse({});

export const topicProgress = (p: Progress, topicId: string): TopicProgress => p.topics[topicId] ?? emptyTopic();

export function updateTopic(p: Progress, topicId: string, change: Partial<TopicProgress>): Progress {
  return { ...p, topics: { ...p.topics, [topicId]: { ...topicProgress(p, topicId), ...change } } };
}

// ---- Dates (YYYY-MM-DD strings, so they survive JSON and compare as strings) ----

export function todayISO(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export const daysBetween = (from: string, to: string) =>
  Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);

// ---- Revisions ----

export const REVISION_OFFSETS = [3, 10, 30];

export const scheduleRevisions = (doneOn: string) => REVISION_OFFSETS.map((n) => ({ due: addDays(doneOn, n), done: false }));

/** Marking Done schedules revisions; leaving Done clears them. Re-saving Done keeps the existing schedule. */
export function setStatus(p: Progress, topicId: string, status: Status, today: string): Progress {
  const prev = topicProgress(p, topicId);
  const revisions = status !== "done" ? [] : prev.status === "done" ? prev.revisions : scheduleRevisions(today);
  return updateTopic(p, topicId, { status, revisions });
}

export function dueRevisions(exam: Exam, p: Progress, today: string) {
  return exam.subjects
    .flatMap((subject) =>
      subject.topics.flatMap((topic) =>
        topicProgress(p, topic.id).revisions.flatMap((r, index) =>
          !r.done && r.due <= today ? [{ subject, topic, due: r.due, index }] : [],
        ),
      ),
    )
    .sort((a, b) => a.due.localeCompare(b.due));
}

// ---- Progress ----

/** Weight of a topic = its PYQ marks. Topics without a 1-/2-mark split (General Aptitude)
 *  use questionCount × the subject's average marks per question. */
export const topicWeight = (t: Topic, s: Subject) =>
  t.marks ?? (s.totalQuestions ? (t.questionCount * s.totalMarks) / s.totalQuestions : 0);

export function progressStats(subjects: Subject[], p: Progress) {
  let total = 0, done = 0, weight = 0, doneWeight = 0;
  for (const s of subjects)
    for (const t of s.topics) {
      const w = topicWeight(t, s);
      const isDone = topicProgress(p, t.id).status === "done";
      total++;
      weight += w;
      if (isDone) {
        done++;
        doneWeight += w;
      }
    }
  return {
    total,
    done,
    remaining: total - done,
    pct: total ? Math.round((done / total) * 100) : 0,
    weightedPct: weight ? Math.round((doneWeight / weight) * 100) : 0,
  };
}

export function weakestTopics(exam: Exam, p: Progress, limit = 10) {
  return exam.subjects
    .flatMap((subject) => subject.topics.map((topic) => ({ subject, topic, tp: topicProgress(p, topic.id) })))
    .filter((x) => x.tp.confidence !== null)
    .sort((a, b) => a.tp.confidence! - b.tp.confidence! || b.topic.questionCount - a.topic.questionCount)
    .slice(0, limit);
}

// ---- Roadmap ----

export function roadmapToday(roadmap: Roadmap, startDate: string, today: string) {
  const offset = daysBetween(startDate, today);
  if (offset < 0) return { kind: "before" as const, daysLeft: -offset };
  const week = roadmap.weeks[Math.floor(offset / 7)];
  const day = week?.days.find((d) => d.day === (offset % 7) + 1);
  return week && day ? { kind: "on" as const, week, day } : { kind: "after" as const };
}
