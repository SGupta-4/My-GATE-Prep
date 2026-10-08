"use client";

import Link from "next/link";
import { useExam } from "./ExamProvider";
import { topicProgress } from "@/lib/progress";

export function SubjectLinks({ subjectId }: { subjectId: string }) {
  const { exam, progress } = useExam();
  const subject = exam.subjects.find((s) => s.id === subjectId)!;
  const withLinks = subject.topics
    .map((t) => ({ t, links: topicProgress(progress, t.id).links }))
    .filter((x) => x.links.length > 0);

  return (
    <div className="stack">
      <p className="eyebrow">
        <Link href={`/${exam.id}/topics#${subject.id}`}>← {subject.name} topics</Link>
      </p>
      <h1>{subject.name} · Links</h1>
      {withLinks.length === 0 ? (
        <p className="muted">No links yet. Add them from a topic&apos;s “Notes, confidence &amp; links” panel.</p>
      ) : (
        withLinks.map(({ t, links }) => (
          <section key={t.id} className="card stack-sm" aria-labelledby={`${t.id}-h`}>
            <h2 id={`${t.id}-h`} style={{ fontSize: 20 }}>{t.name}</h2>
            <ul className="rows">
              {links.map((l) => (
                <li key={l.id} className="row" style={{ padding: "8px 0" }}>
                  <span className="badge">{l.type}</span>
                  <a href={l.url} target="_blank" rel="noopener noreferrer">{l.title}</a>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
