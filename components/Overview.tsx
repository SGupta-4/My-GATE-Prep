"use client";

import Link from "next/link";
import { useExam } from "./ExamProvider";
import { Bar } from "./bits";
import { dueRevisions, progressStats, todayISO, updateTopic, weakestTopics, topicProgress } from "@/lib/progress";

export function Overview() {
  const { exam, progress, update } = useExam();
  const overall = progressStats(exam.subjects, progress);
  const due = dueRevisions(exam, progress, todayISO());
  const weakest = weakestTopics(exam, progress);

  const markRevised = (topicId: string, index: number) =>
    update((p) =>
      updateTopic(p, topicId, {
        revisions: topicProgress(p, topicId).revisions.map((r, i) => (i === index ? { ...r, done: true } : r)),
      }),
    );

  return (
    <div className="stack">
      <h1>Overview</h1>

      <section className="grid grid-3" aria-label="Overall progress">
        <div className="card stack-sm">
          <p className="eyebrow">Topics done</p>
          <p className="stat">
            {overall.done}
            <span className="muted" style={{ fontSize: 20 }}> / {overall.total}</span>
          </p>
          <p className="muted small">{overall.remaining} remaining</p>
        </div>
        <div className="card stack-sm">
          <p className="eyebrow">Done by topic count</p>
          <p className="stat">{overall.pct}%</p>
          <Bar pct={overall.pct} />
        </div>
        <div className="card stack-sm">
          <p className="eyebrow">Done weighted by PYQ marks</p>
          <p className="stat">{overall.weightedPct}%</p>
          <Bar pct={overall.weightedPct} />
        </div>
      </section>

      <section className="card stack-sm" aria-labelledby="subjects-h">
        <h2 id="subjects-h">Subjects</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Subject</th>
                <th scope="col" className="num">Done</th>
                <th scope="col" className="num">Remaining</th>
                <th scope="col" className="num">% done</th>
                <th scope="col" className="num">% by marks</th>
                <th scope="col"><span className="sr-only">Links</span></th>
              </tr>
            </thead>
            <tbody>
              {exam.subjects.map((s) => {
                const st = progressStats([s], progress);
                return (
                  <tr key={s.id}>
                    <th scope="row" style={{ fontWeight: 400, color: "var(--ink)" }}>
                      <Link href={`/${exam.id}/topics#${s.id}`}>{s.name}</Link>
                    </th>
                    <td className="num">{st.done}/{st.total}</td>
                    <td className="num">{st.remaining}</td>
                    <td className="num">{st.pct}%</td>
                    <td className="num">{st.weightedPct}%</td>
                    <td>
                      <Link href={`/${exam.id}/links/${s.id}`} aria-label={`${s.name} links`}>Links</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid">
        <section className="card stack-sm" aria-labelledby="due-h">
          <h2 id="due-h">Due for revision</h2>
          {due.length === 0 ? (
            <p className="muted">Nothing due. Marking a topic Done schedules revisions at +3, +10 and +30 days.</p>
          ) : (
            <ul className="rows">
              {due.map((d) => (
                <li key={`${d.topic.id}-${d.index}`} className="row spread">
                  <div>
                    <p>{d.topic.name}</p>
                    <p className="caption">
                      {d.subject.name} · revision {d.index + 1} of 3 · due {d.due}
                    </p>
                  </div>
                  <button className="btn btn-sm" onClick={() => markRevised(d.topic.id, d.index)}>
                    Mark revised<span className="sr-only">: {d.topic.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card stack-sm" aria-labelledby="weak-h">
          <h2 id="weak-h">Weakest topics</h2>
          {weakest.length === 0 ? (
            <p className="muted">Rate your confidence (1–5) on a topic in Topics to see it here.</p>
          ) : (
            <ol className="rows">
              {weakest.map(({ subject, topic, tp }) => (
                <li key={topic.id}>
                  <div className="row spread">
                    <span>{topic.name}</span>
                    <span className="badge">Confidence {tp.confidence}/5</span>
                  </div>
                  <p className="caption">{subject.name}</p>
                  {tp.note && <p className="small muted" style={{ marginTop: 4 }}>{tp.note}</p>}
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}
