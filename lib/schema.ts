import { z } from "zod";

export const TopicSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  questionCount: z.number().int().min(0),
  // null when the source gives no 1-mark/2-mark split (e.g. General Aptitude).
  marks: z.number().int().min(0).nullable(),
  oneMark: z.number().int().min(0).nullable(),
  twoMark: z.number().int().min(0).nullable(),
  yearsAsked: z.array(z.string()),
  isTop20: z.boolean(),
  isFoundation: z.boolean(),
});

export const SubjectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  totalQuestions: z.number().int().min(0),
  totalMarks: z.number().int().min(0),
  topics: z.array(TopicSchema).min(1),
});

export const ExamSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    subjects: z.array(SubjectSchema).min(1),
  })
  .superRefine((exam, ctx) => {
    const ids = exam.subjects.flatMap((s) => [s.id, ...s.topics.map((t) => t.id)]);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length) ctx.addIssue({ code: "custom", message: `Duplicate ids: ${dupes.join(", ")}` });
  });

export const RoadmapDaySchema = z.object({
  id: z.string().min(1),
  day: z.number().int().min(1),
  topics: z.array(z.string()),
  tasks: z.string(),
  pyqTarget: z.string(),
  revision: z.string(),
});

export const RoadmapSchema = z.object({
  weeks: z
    .array(
      z.object({
        week: z.number().int().min(1),
        title: z.string(),
        days: z.array(RoadmapDaySchema).min(1),
      }),
    )
    .min(1),
});

export type Topic = z.infer<typeof TopicSchema>;
export type Subject = z.infer<typeof SubjectSchema>;
export type Exam = z.infer<typeof ExamSchema>;
export type Roadmap = z.infer<typeof RoadmapSchema>;
export type RoadmapDay = z.infer<typeof RoadmapDaySchema>;
