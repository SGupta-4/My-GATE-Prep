import type { Topic } from "@/lib/schema";

export function Bar({ pct, label }: { pct: number; label?: string }) {
  return (
    <div className="stack-sm" style={{ gap: 4 }}>
      {label && (
        <div className="row spread small">
          <span className="muted">{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="bar" aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function TopicBadges({ topic }: { topic: Topic }) {
  return (
    <>
      {topic.isTop20 && <span className="badge" title="One of the 20 most-asked technical topics">★ Top 20</span>}
      {topic.isFoundation && <span className="badge" title="Foundation topic that many other questions build on">◆ Foundation</span>}
    </>
  );
}
