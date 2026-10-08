"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";
import type { Exam, Roadmap } from "@/lib/schema";
import { emptyProgress, type Progress } from "@/lib/progress";
import { loadProgress, saveProgress } from "@/lib/storage";

// In-memory copy of each exam's progress so every component sees the same snapshot.
const cache = new Map<string, Progress>();
const listeners = new Set<() => void>();
const SERVER_SNAPSHOT = emptyProgress();

function read(examId: string) {
  if (!cache.has(examId)) cache.set(examId, loadProgress(examId));
  return cache.get(examId)!;
}

/** Drops cached data, e.g. after an import wrote new data to storage. */
export function reloadAll() {
  cache.clear();
  listeners.forEach((l) => l());
}

type Ctx = { exam: Exam; roadmap: Roadmap; progress: Progress; update: (fn: (p: Progress) => Progress) => void };
const ExamContext = createContext<Ctx | null>(null);

export function ExamProvider({ exam, roadmap, children }: { exam: Exam; roadmap: Roadmap; children: React.ReactNode }) {
  const progress = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => read(exam.id),
    () => SERVER_SNAPSHOT,
  );
  const [saveFailed, setSaveFailed] = useState(false);

  const update = (fn: (p: Progress) => Progress) => {
    const next = fn(read(exam.id));
    cache.set(exam.id, next);
    setSaveFailed(!saveProgress(exam.id, next));
    listeners.forEach((l) => l());
  };

  return (
    <ExamContext.Provider value={{ exam, roadmap, progress, update }}>
      {saveFailed && (
        <div role="alert" className="container" style={{ paddingTop: 16 }}>
          <p className="error">
            Your browser blocked saving. Changes are kept only until you close this tab. Export a backup now.
          </p>
        </div>
      )}
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error("useExam must be used inside ExamProvider");
  return ctx;
}
