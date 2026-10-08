import Link from "next/link";
import { listExams } from "@/lib/exams";

export default function Home() {
  const exams = listExams();
  return (
    <main className="container stack">
      <h1>Prep Dashboard</h1>
      <p className="muted">Choose an exam.</p>
      <ul className="rows">
        {exams.map((e) => (
          <li key={e.id}>
            <Link href={`/${e.id}`}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
