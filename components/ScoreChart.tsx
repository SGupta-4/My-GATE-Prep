"use client";

import { useEffect, useRef, useState } from "react";
import type { Mock } from "@/lib/progress";
import { daysBetween } from "@/lib/progress";

// Single-series line chart in plain SVG; the log table below it is the table view.
// The viewBox tracks the real width so labels stay 12px on phones.
const H = 260, PAD = { l: 40, r: 24, t: 24, b: 32 };

export function ScoreChart({ mocks }: { mocks: Mock[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(640);
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setW(Math.max(240, Math.round(e.contentRect.width))));
    ro.observe(ref.current!);
    return () => ro.disconnect();
  }, []);
  const first = mocks[0].date, last = mocks[mocks.length - 1].date;
  const span = Math.max(daysBetween(first, last), 1);
  const scores = mocks.map((m) => m.total);
  const lo = Math.min(0, Math.floor(Math.min(...scores) / 20) * 20);
  const hi = Math.max(20, Math.ceil(Math.max(...scores) / 20) * 20);
  const x = (d: string) => (mocks.length === 1 ? (PAD.l + W - PAD.r) / 2 : PAD.l + (daysBetween(first, d) / span) * (W - PAD.l - PAD.r));
  const y = (v: number) => H - PAD.b - ((v - lo) / (hi - lo)) * (H - PAD.t - PAD.b);
  const ticks = Array.from({ length: 5 }, (_, i) => lo + ((hi - lo) * i) / 4);
  const lastMock = mocks[mocks.length - 1];

  return (
    <div ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`Total score across ${mocks.length} mock tests, from ${mocks[0].total} on ${first} to ${lastMock.total} on ${last}. Full data in the log table.`}
        height={H}
        style={{ display: "block", fontFamily: "inherit" }}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="var(--hairline)" strokeWidth={1} />
            <text x={PAD.l - 8} y={y(t) + 4} textAnchor="end" fontSize={12} fill="var(--ink-subtle)">
              {Math.round(t)}
            </text>
          </g>
        ))}
        <text x={PAD.l} y={H - 8} fontSize={12} fill="var(--ink-subtle)">{first}</text>
        {mocks.length > 1 && (
          <text x={W - PAD.r} y={H - 8} fontSize={12} fill="var(--ink-subtle)" textAnchor="end">{last}</text>
        )}
        <polyline
          points={mocks.map((m) => `${x(m.date)},${y(m.total)}`).join(" ")}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {mocks.map((m) => (
          <g key={m.id}>
            <circle cx={x(m.date)} cy={y(m.total)} r={4} fill="var(--primary)" stroke="var(--surface-1)" strokeWidth={2} />
            {/* Larger invisible hit area; the native tooltip shows on hover. */}
            <circle cx={x(m.date)} cy={y(m.total)} r={12} fill="transparent">
              <title>{`${m.paper} · ${m.date} · ${m.total}`}</title>
            </circle>
          </g>
        ))}
        <text x={x(lastMock.date)} y={y(lastMock.total) - 12} textAnchor="middle" fontSize={12} fill="var(--ink)">
          {lastMock.total}
        </text>
      </svg>
    </div>
  );
}
