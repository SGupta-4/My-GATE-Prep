"use client";

import { useState } from "react";
import { useExam } from "./ExamProvider";
import { ScoreChart } from "./ScoreChart";

export function Mocks() {
  const { exam, progress, update } = useExam();
  const [error, setError] = useState("");
  const mocks = [...progress.mocks].sort((a, b) => a.date.localeCompare(b.date));
  const subjectName = (id: string) => exam.subjects.find((s) => s.id === id)?.name ?? id;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const total = Number(f.get("total"));
    const subjectMarks: Record<string, number> = {};
    for (const s of exam.subjects) {
      const v = String(f.get(`s-${s.id}`) ?? "").trim();
      if (v) subjectMarks[s.id] = Number(v);
    }
    if (!Number.isFinite(total) || Object.values(subjectMarks).some((n) => !Number.isFinite(n)))
      return setError("Scores must be numbers.");
    setError("");
    update((p) => ({
      ...p,
      mocks: [
        ...p.mocks,
        { id: crypto.randomUUID(), date: String(f.get("date")), paper: String(f.get("paper")).trim(), total, subjectMarks },
      ],
    }));
    e.currentTarget.reset();
  };

  return (
    <div className="stack">
      <h1>Mock tests</h1>

      <section className="card stack-sm" aria-labelledby="chart-h">
        <h2 id="chart-h">Total score over time</h2>
        {mocks.length === 0 ? <p className="muted">Log a mock test below to see your trend.</p> : <ScoreChart mocks={mocks} />}
      </section>

      <form className="card stack-sm" onSubmit={onSubmit} aria-labelledby="add-h">
        <h2 id="add-h">Log a mock test</h2>
        <div className="row" style={{ alignItems: "flex-end" }}>
          <label>
            Date
            <input name="date" type="date" required />
          </label>
          <label style={{ flex: "1 1 200px" }}>
            Paper name
            <input name="paper" required maxLength={120} placeholder="e.g. GATE 2025 Set 2" />
          </label>
          <label>
            Total score
            <input name="total" type="number" step="any" required inputMode="decimal" style={{ width: 120 }} />
          </label>
        </div>
        <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="eyebrow" style={{ marginBottom: 8 }}>Marks per subject (optional)</legend>
          <div className="grid grid-3" style={{ gap: 12 }}>
            {exam.subjects.map((s) => (
              <label key={s.id}>
                {s.name}
                <input name={`s-${s.id}`} type="number" step="any" inputMode="decimal" />
              </label>
            ))}
          </div>
        </fieldset>
        <p className="error" role="alert">{error}</p>
        <div>
          <button className="btn btn-primary" type="submit">Save mock test</button>
        </div>
      </form>

      {mocks.length > 0 && (
        <section className="card stack-sm" aria-labelledby="log-h">
          <h2 id="log-h">Log</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Paper</th>
                  <th scope="col" className="num">Total</th>
                  <th scope="col">Subject marks</th>
                  <th scope="col"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {[...mocks].reverse().map((m) => (
                  <tr key={m.id}>
                    <td style={{ whiteSpace: "nowrap" }}>{m.date}</td>
                    <td>{m.paper}</td>
                    <td className="num">{m.total}</td>
                    <td className="caption">
                      {Object.entries(m.subjectMarks).map(([id, v]) => `${subjectName(id)} ${v}`).join(" · ") || "–"}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm"
                        onClick={() =>
                          confirm(`Delete "${m.paper}" (${m.date})?`) &&
                          update((p) => ({ ...p, mocks: p.mocks.filter((x) => x.id !== m.id) }))
                        }
                      >
                        Delete<span className="sr-only"> {m.paper} {m.date}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
