"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  ["", "Overview"],
  ["/topics", "Topics"],
  ["/roadmap", "Roadmap"],
  ["/mocks", "Mock tests"],
  ["/backup", "Backup"],
];

export function NavLinks({ examId }: { examId: string }) {
  const path = usePathname();
  return (
    <ul className="nav-links">
      {LINKS.map(([href, label]) => {
        const full = `/${examId}${href}`;
        const current = href ? path.startsWith(full) : path === full;
        return (
          <li key={href}>
            <Link href={full} aria-current={current ? "page" : undefined}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ExamSwitcher({ exams, current }: { exams: { id: string; name: string }[]; current: string }) {
  const router = useRouter();
  return (
    <label className="inline">
      <span>Exam</span>
      <select value={current} onChange={(e) => router.push(`/${e.target.value}`)}>
        {exams.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
    </label>
  );
}
