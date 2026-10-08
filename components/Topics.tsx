"use client";

import Link from "next/link";
import { useState } from "react";
import { useExam } from "./ExamProvider";
import { Bar, TopicBadges } from "./bits";
import { LinkEditor } from "./LinkEditor";
import type { Subject, Topic } from "@/lib/schema";
import { progressStats, setStatus, STATUSES, todayISO, topicProgress, updateTopic, type Status } from "@/lib/progress";

export function Topics() {
  const { exam, progress } = useExam();
  const [sort, setSort] = useState<"subject" | "count">("subject");
  const overall = progressStats(exam.subjects, progress);

  return (
    <div className="stack">
      <div className="row spread">
        <h1>Topics</h1>
        <label className="inline">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as "subject" | "count")}>
            <option value="subject">By subject</option>
            <option value="count">By question count (most first)</option>
          </select>
        </label>
      </div>
      <p className="muted">
        {overall.done} of {overall.total} topics done · {overall.remaining} remaining
      </p>

      {sort === "subject" ? (
        exam.subjects.map((s) => {
          const st = progressStats([s], progress);
          return (
            <section key={s.id} id={s.id} className="card stack-sm" aria-labelledby={`${s.id}-h`}>
              <div className="row spread">
                <h2 id={`${s.id}-h`}>{s.name}</h2>
                <Link href={`/${exam.id}/links/${s.id}`}>
                  Links page<span className="sr-only"> for {s.name}</span>
                </Link>
              </div>
              <p className="muted small">
                {st.done} done · {st.remaining} remaining · {s.totalQuestions} PYQs
              </p>
              <Bar pct={st.pct} />
              <ul className="rows">
                {s.topics.map((t) => (
                  <TopicRow key={t.id} topic={t} subject={s} />
                ))}
              </ul>
            </section>
          );
        })
      ) : (
        <section className="card" aria-label="All topics by question count">
          <ul className="rows">
            {exam.subjects
              .flatMap((s) => s.topics.map((t) => ({ t, s })))
              .sort((a, b) => b.t.questionCount - a.t.questionCount)
              .map(({ t, s }) => (
                <TopicRow key={t.id} topic={t} subject={s} showSubject />
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function TopicRow({ topic, subject, showSubject }: { topic: Topic; subject: Subject; showSubject?: boolean }) {
  const { progress, update } = useExam();
  const tp = topicProgress(progress, topic.id);
  const marks =
    topic.marks === null ? "" : ` · ${topic.marks} marks (${topic.oneMark} × 1-mark, ${topic.twoMark} × 2-mark)`;

  return (
    <li id={topic.id} className="stack-sm">
      <div className="row spread" style={{ alignItems: "flex-start" }}>
        <div className="stack-sm" style={{ gap: 4, flex: "1 1 260px" }}>
          <div className="row">
            <h3 style={{ fontSize: 16 }}>{topic.name}</h3>
            <TopicBadges topic={topic} />
            {tp.status === "done" && <span className="badge badge-done">✓ Done</span>}
          </div>
          <p className="caption">
            {showSubject && `${subject.name} · `}
            {topic.questionCount} questions{marks}
          </p>
        </div>
        <label>
          <span>
            Status<span className="sr-only"> of {topic.name}</span>
          </span>
          <select
            value={tp.status}
            onChange={(e) => update((p) => setStatus(p, topic.id, e.target.value as Status, todayISO()))}
          >
            {Object.entries(STATUSES).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <details>
        <summary>
          Notes, confidence &amp; links ({tp.links.length})<span className="sr-only"> for {topic.name}</span>
        </summary>
        <div className="stack-sm">
          {topic.yearsAsked.length > 0 && <p className="caption">Asked in: {topic.yearsAsked.join(", ")}</p>}
          {tp.revisions.length > 0 && (
            <p className="caption">
              Revisions: {tp.revisions.map((r) => `${r.due}${r.done ? " ✓" : ""}`).join(" · ")}
            </p>
          )}
          <div className="row" style={{ alignItems: "flex-start" }}>
            <label style={{ flex: "1 1 260px" }}>
              Weak-topic note
              <textarea
                maxLength={500}
                value={tp.note}
                onChange={(e) => update((p) => updateTopic(p, topic.id, { note: e.target.value }))}
              />
            </label>
            <label>
              Confidence
              <select
                value={tp.confidence ?? ""}
                onChange={(e) =>
                  update((p) => updateTopic(p, topic.id, { confidence: e.target.value ? Number(e.target.value) : null }))
                }
              >
                <option value="">Not rated</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "(weakest)" : n === 5 ? "(strongest)" : ""}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <LinkEditor topic={topic} />
        </div>
      </details>
    </li>
  );
}
