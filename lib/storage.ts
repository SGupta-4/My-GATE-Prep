// The only module that touches persistence. Swap these functions for API calls to move to a backend.
import { z } from "zod";
import { emptyProgress, ProgressSchema, type Progress } from "./progress";

const PREFIX = "prep-dashboard:v1:";

const BackupSchema = z.object({
  app: z.literal("prep-dashboard"),
  version: z.literal(1),
  exams: z.record(z.string().regex(/^[a-z0-9-]+$/), ProgressSchema),
});

export function loadProgress(examId: string): Progress {
  try {
    const raw = localStorage.getItem(PREFIX + examId);
    if (raw) {
      const parsed = ProgressSchema.safeParse(JSON.parse(raw));
      if (parsed.success) return parsed.data;
      // Keep the unreadable copy so the next save can't destroy it.
      localStorage.setItem(`prep-dashboard-invalid:${examId}:${Date.now()}`, raw);
      console.error(`Stored progress for ${examId} is invalid; starting empty. Raw copy kept.`, parsed.error);
    }
  } catch (e) {
    console.error("Could not read progress", e);
  }
  return emptyProgress();
}

/** Returns false when the browser refuses the write (private mode, quota, blocked storage). */
export function saveProgress(examId: string, progress: Progress): boolean {
  try {
    localStorage.setItem(PREFIX + examId, JSON.stringify(progress));
    return true;
  } catch (e) {
    console.error("Could not save progress", e);
    return false;
  }
}

/** All exams' progress as one JSON document. */
export function exportAll(): string {
  const exams: Record<string, Progress> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(PREFIX)) exams[key.slice(PREFIX.length)] = loadProgress(key.slice(PREFIX.length));
    }
  } catch (e) {
    console.error("Could not read progress for export", e);
  }
  return JSON.stringify({ app: "prep-dashboard", version: 1, exportedAt: new Date().toISOString(), exams }, null, 2);
}

/** Validates the whole file first, then replaces progress for each exam it contains. */
export function importAll(json: string): { ok: true; examIds: string[] } | { ok: false; error: string } {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { ok: false, error: "The file is not valid JSON." };
  }
  const parsed = BackupSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: `This is not a valid backup: ${z.prettifyError(parsed.error)}` };
  const examIds = Object.keys(parsed.data.exams);
  for (const id of examIds)
    if (!saveProgress(id, parsed.data.exams[id])) return { ok: false, error: `Could not save data for ${id}.` };
  return { ok: true, examIds };
}
