"use client";

import { useExam } from "./ExamProvider";
import { Bar } from "./bits";
import type { RoadmapDay } from "@/lib/schema";
import { roadmapToday, todayISO } from "@/lib/progress";

export function RoadmapView() {
  const { roadmap, progress, update } = useExam();
  const start = progress.startDate;
  const today = start ? roadmapToday(roadmap, start, todayISO()) : null;
  const days = roadmap.weeks.flatMap((w) => w.days);
  const done = new Set(progress.doneDays);
  const pct = days.length ? Math.round((days.filter((d) => done.has(d.id)).length / days.length) * 100) : 0;

  const toggle = (id: string) =>
    update((p) => ({ ...p, doneDays: p.doneDays.includes(id) ? p.doneDays.filter((d) => d !== id) : [...p.doneDays, id] }));

  return (
    <div className="stack">
      <div className="row spread">
        <h1>Roadmap</h1>
        <label className="inline">
          Start date
          <input
            type="date"
            value={start ?? ""}
            onChange={(e) => update((p) => ({ ...p, startDate: e.target.value || null }))}
          />
        </label>
      </div>

      <section className="card stack-sm" aria-labelledby="today-h" style={{ background: "var(--surface-2)" }}>
        <h2 id="today-h">Today</h2>
        {!today && <p className="muted">Set your start date to see today&apos;s plan.</p>}
        {today?.kind === "before" && <p className="muted">Your plan starts in {today.daysLeft} day(s).</p>}
        {today?.kind === "after" && <p className="muted">You have finished all {roadmap.weeks.length} weeks.</p>}
        {today?.kind === "on" && (
          <>
            <p className="eyebrow">
              Week {today.week.week}, Day {today.day.day} · {today.week.title}
            </p>
            <DayDetails day={today.day} />
            <label className="inline">
              <input type="checkbox" checked={done.has(today.day.id)} onChange={() => toggle(today.day.id)} />
              Mark today done
            </label>
          </>
        )}
      </section>

      <Bar pct={pct} label={`${done.size} of ${days.length} days ticked off`} />

      {roadmap.weeks.map((w) => (
        <section key={w.week} className="card stack-sm" aria-labelledby={`week-${w.week}`}>
          <h2 id={`week-${w.week}`} style={{ fontSize: 22 }}>
            Week {w.week} <span className="muted" style={{ fontWeight: 400 }}>· {w.title}</span>
          </h2>
          <ul className="rows">
            {w.days.map((d) => {
              const isToday = today?.kind === "on" && today.day.id === d.id;
              return (
                <li key={d.id} className="row" style={{ alignItems: "flex-start", flexWrap: "nowrap" }} aria-current={isToday ? "date" : undefined}>
                  <input
                    type="checkbox"
                    id={d.id}
                    checked={done.has(d.id)}
                    onChange={() => toggle(d.id)}
                    style={{ marginTop: 2 }}
                  />
                  <div className="stack-sm" style={{ gap: 4 }}>
                    <label htmlFor={d.id} style={{ color: "var(--ink)", fontSize: 16 }}>
                      Day {d.day}: {d.topics.join(" · ")} {isToday && <span className="badge">Today</span>}
                    </label>
                    <DayDetails day={d} hideTopics />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

function DayDetails({ day, hideTopics }: { day: RoadmapDay; hideTopics?: boolean }) {
  return (
    <div className="stack-sm" style={{ gap: 4 }}>
      {!hideTopics && <p>{day.topics.join(" · ")}</p>}
      <p className="small muted">{day.tasks}</p>
      <p className="caption">
        PYQ target: {day.pyqTarget} · Revision: {day.revision}
      </p>
    </div>
  );
}
