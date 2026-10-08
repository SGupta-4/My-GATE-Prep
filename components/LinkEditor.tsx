"use client";

import { useId, useState } from "react";
import { useExam } from "./ExamProvider";
import type { Topic } from "@/lib/schema";
import { isHttpUrl, LINK_TYPES, topicProgress, updateTopic, type Link } from "@/lib/progress";

export function LinkEditor({ topic }: { topic: Topic }) {
  const { progress, update } = useExam();
  const links = topicProgress(progress, topic.id).links;
  const [editing, setEditing] = useState<string | null>(null);
  const save = (next: Link[]) => update((p) => updateTopic(p, topic.id, { links: next }));

  return (
    <div className="stack-sm">
      <h4 className="eyebrow" style={{ margin: 0 }}>Resources</h4>
      {links.length > 0 && (
        <ul className="rows">
          {links.map((l) =>
            editing === l.id ? (
              <li key={l.id}>
                <LinkForm
                  initial={l}
                  onCancel={() => setEditing(null)}
                  onSave={(v) => {
                    save(links.map((x) => (x.id === l.id ? { ...v, id: l.id } : x)));
                    setEditing(null);
                  }}
                />
              </li>
            ) : (
              <li key={l.id} className="row spread" style={{ padding: "8px 0" }}>
                <span className="row">
                  <span className="badge">{l.type}</span>
                  <a href={l.url} target="_blank" rel="noopener noreferrer">
                    {l.title}
                  </a>
                </span>
                <span className="row">
                  <button className="btn btn-sm" onClick={() => setEditing(l.id)}>
                    Edit<span className="sr-only"> {l.title}</span>
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => confirm(`Delete link "${l.title}"?`) && save(links.filter((x) => x.id !== l.id))}
                  >
                    Delete<span className="sr-only"> {l.title}</span>
                  </button>
                </span>
              </li>
            ),
          )}
        </ul>
      )}
      <LinkForm onSave={(v) => save([...links, { ...v, id: crypto.randomUUID() }])} />
    </div>
  );
}

function LinkForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Omit<Link, "id">;
  onSave: (l: Omit<Link, "id">) => void;
  onCancel?: () => void;
}) {
  const id = useId();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [type, setType] = useState<Link["type"]>(initial?.type ?? "video");
  const [error, setError] = useState("");

  return (
    <form
      className="row"
      style={{ alignItems: "flex-end" }}
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return setError("Enter a title.");
        if (!isHttpUrl(url.trim())) return setError("Enter a full link starting with http:// or https://");
        onSave({ title: title.trim(), url: url.trim(), type });
        setError("");
        if (!initial) [setTitle, setUrl].forEach((f) => f(""));
      }}
    >
      <label htmlFor={`${id}-t`} style={{ flex: "1 1 160px" }}>
        Link title
        <input id={`${id}-t`} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
      </label>
      <label htmlFor={`${id}-u`} style={{ flex: "2 1 220px" }}>
        URL
        <input id={`${id}-u`} type="url" inputMode="url" placeholder="https://" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <label htmlFor={`${id}-k`}>
        Type
        <select id={`${id}-k`} value={type} onChange={(e) => setType(e.target.value as Link["type"])}>
          {LINK_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <button className={initial ? "btn btn-primary" : "btn"} type="submit">
        {initial ? "Save" : "Add link"}
      </button>
      {onCancel && (
        <button className="btn btn-tertiary" type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
      <p className="error" role="alert" style={{ flexBasis: "100%" }}>
        {error}
      </p>
    </form>
  );
}
