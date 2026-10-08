import { SubjectLinks } from "@/components/SubjectLinks";
import { listExams, loadExam } from "@/lib/exams";

export const dynamicParams = false;
export const generateStaticParams = () =>
  listExams().flatMap((e) => loadExam(e.id).exam.subjects.map((s) => ({ exam: e.id, subject: s.id })));

export default async function Page({ params }: { params: Promise<{ subject: string }> }) {
  return <SubjectLinks subjectId={(await params).subject} />;
}
