// Server-only: reads content/exams/<id>/ at build time. Any folder there becomes an exam.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { ExamSchema, RoadmapSchema } from "./schema";

const DIR = join(process.cwd(), "content/exams");

function readJson<T>(file: string, schema: z.ZodType<T>): T {
  const parsed = schema.safeParse(JSON.parse(readFileSync(file, "utf8")));
  if (!parsed.success) throw new Error(`Invalid ${file}:\n${z.prettifyError(parsed.error)}`);
  return parsed.data;
}

export function loadExam(id: string) {
  const exam = readJson(join(DIR, id, "exam.json"), ExamSchema);
  if (exam.id !== id) throw new Error(`content/exams/${id}/exam.json has id "${exam.id}"; it must match the folder name.`);
  return { exam, roadmap: readJson(join(DIR, id, "roadmap.json"), RoadmapSchema) };
}

export function listExams() {
  return readdirSync(DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => ({ id: d.name, name: loadExam(d.name).exam.name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
