'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getStudentByNpm, getSubmissionByNpm, Student } from '@/app/yudisium/data';
import Link from 'next/link';

export default function StudentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedSubmissionId, setRelatedSubmissionId] = useState<string | null>(null);

    useEffect(() => {
        if (params.npm) {
            const s = getStudentByNpm(params.npm as string);
            if (s) {
                setStudent(s);
                const sub = getSubmissionByNpm(s.npm);
                if (sub) setRelatedSubmissionId(sub.id);
            } else {
                router.push('/403');
            }
            setLoading(false);
        }
    }, [params.npm, router]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
    if (!student) return null;

    // Dummy Transcript Data
    const TRANSCRIPT = [
        { term: 'Gasal 2020/2021', code: 'CS101', name: 'Foundations of Programming', credits: 4, grade: 'A' },
        { term: 'Gasal 2020/2021', code: 'CS102', name: 'Discrete Structure 1', credits: 3, grade: 'A-' },
        { term: 'Genap 2020/2021', code: 'CS103', name: 'Data Structures & Algo', credits: 4, grade: 'B+' },
        { term: 'Genap 2020/2021', code: 'CS104', name: 'Computer Architecture', credits: 3, grade: 'A' },
        { term: 'Gasal 2021/2022', code: 'CS201', name: 'Database Systems', credits: 4, grade: 'A' },
        { term: 'Gasal 2021/2022', code: 'CS202', name: 'Operating Systems', credits: 4, grade: 'B' },
        { term: 'Genap 2021/2022', code: 'CS204', name: 'Software Engineering', credits: 3, grade: 'A-' },
        { term: 'Genap 2021/2022', code: 'CS205', name: 'Computer Networks', credits: 3, grade: 'B+' },
    ];

    return (
        <div className="space-y-6">
            {/* Back */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/yudisium/students" className="hover:text-[#5AA0FF]">Students</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{student.npm}</span>
            </div>

            {/* Header */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                    <div className="mt-1 text-gray-500 space-x-3 text-sm">
                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">{student.npm}</span>
                        <span>•</span>
                        <span>{student.prodi}</span>
                        <span>•</span>
                        <span>Batch {student.batch}</span>
                        <span>•</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${student.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{student.status}</span>
                    </div>
                </div>
                {relatedSubmissionId && (
                    <Link
                        href={`/yudisium/submissions/${relatedSubmissionId}`}
                        className="flex items-center text-sm font-medium text-[#5AA0FF] bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        View Related Submission
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Transcript */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h2 className="font-bold text-gray-900">Academic Transcript (Partial)</h2>
                        <span className="text-xs text-gray-500">Read-only view</span>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Term</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Code</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Course Name</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Credits</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Grade</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {TRANSCRIPT.map((row, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                    <td className="px-6 py-3 text-sm text-gray-500">{row.term}</td>
                                    <td className="px-6 py-3 text-sm text-gray-500 font-mono">{row.code}</td>
                                    <td className="px-6 py-3 text-sm text-gray-900 font-medium">{row.name}</td>
                                    <td className="px-6 py-3 text-sm text-gray-900 text-right">{row.credits}</td>
                                    <td className="px-6 py-3 text-sm text-gray-900 text-center font-bold">{row.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-500 italic">
                        ... {student.totalCredits - 28} more credits ...
                    </div>
                </div>

                {/* Requirements Summary */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Graduation Summary</h2>
                        <div className="space-y-6">
                            {/* GPA */}
                            <div>
                                <span className="text-sm font-medium text-gray-700 block mb-1">Current GPA</span>
                                <div className="text-3xl font-bold text-gray-900">{student.gpa.toFixed(2)}</div>
                            </div>

                            {/* Regular Credits */}
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">Total Credits</span>
                                    <span className="text-sm font-medium text-gray-900">{student.totalCredits} / 144</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-[#5AA0FF] h-2 rounded-full" style={{ width: `${Math.min((student.totalCredits / 144) * 100, 100)}%` }}></div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Checklist</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm">
                                        <svg className={`w-5 h-5 mr-2 ${student.gpa >= 2.0 ? 'text-green-500' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={student.gpa >= 2.0 ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} /></svg>
                                        <span className={student.gpa >= 2.0 ? 'text-gray-700' : 'text-gray-400'}>Min GPA 2.00</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <svg className={`w-5 h-5 mr-2 ${student.totalCredits >= 144 ? 'text-green-500' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={student.totalCredits >= 144 ? "M5 13l4 4L19 7" : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"} /></svg>
                                        <span className={student.totalCredits >= 144 ? 'text-gray-700' : 'text-gray-400'}>Min Credits 144</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-gray-700">Tuition Paid</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
