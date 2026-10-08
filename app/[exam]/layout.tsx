import Link from "next/link";
import { ExamProvider } from "@/components/ExamProvider";
import { ExamSwitcher, NavLinks } from "@/components/Header";
import { listExams, loadExam } from "@/lib/exams";

export const dynamicParams = false;
export const generateStaticParams = () => listExams().map((e) => ({ exam: e.id }));

export async function generateMetadata({ params }: { params: Promise<{ exam: string }> }) {
  return { title: `${loadExam((await params).exam).exam.name} · Prep Dashboard` };
}

export default async function ExamLayout({ children, params }: { children: React.ReactNode; params: Promise<{ exam: string }> }) {
  const { exam: id } = await params;
  const { exam, roadmap } = loadExam(id);
  return (
    <>
      <header className="top-nav">
        <nav className="container" aria-label="Main">
          <Link href={`/${id}`} className="brand">
            {exam.name}
          </Link>
          <NavLinks examId={id} />
          <ExamSwitcher exams={listExams()} current={id} />
        </nav>
      </header>
      <ExamProvider exam={exam} roadmap={roadmap}>
        <main className="container">{children}</main>
      </ExamProvider>
    </>
  );
}
