"use client";

import { useState } from "react";
import { reloadAll } from "./ExamProvider";
import { todayISO } from "@/lib/progress";
import { exportAll, importAll } from "@/lib/storage";

export function Backup() {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const download = () => {
    const url = URL.createObjectURL(new Blob([exportAll()], { type: "application/json" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `prep-dashboard-${todayISO()}.json` });
    a.click();
    URL.revokeObjectURL(url);
  };

  const upload = async (file: File | undefined) => {
    if (!file) return;
    if (!confirm("Importing replaces your saved data for every exam in this file. Continue?")) return;
    const res = importAll(await file.text());
    if (res.ok) {
      reloadAll();
      setMsg({ ok: true, text: `Imported data for: ${res.examIds.join(", ") || "no exams"}.` });
    } else setMsg({ ok: false, text: res.error });
  };

  return (
    <div className="stack">
      <h1>Backup</h1>
      <p className="muted">
        Your progress is saved only in this browser. Export it regularly, and import it to restore or move to another device.
      </p>
      <section className="card stack-sm" aria-labelledby="export-h">
        <h2 id="export-h">Export</h2>
        <p className="small muted">Downloads one JSON file with your data for every exam.</p>
        <div>
          <button className="btn btn-primary" onClick={download}>Export JSON</button>
        </div>
      </section>
      <section className="card stack-sm" aria-labelledby="import-h">
        <h2 id="import-h">Import</h2>
        <label>
          Choose a backup file
          <input
            type="file"
            accept="application/json,.json"
            onChange={(e) => {
              upload(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>
        <p role="status" className={msg?.ok ? "ok" : "error"}>{msg?.text}</p>
      </section>
    </div>
  );
}
