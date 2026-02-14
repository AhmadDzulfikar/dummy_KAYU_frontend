'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';

// Dummy Data (Mirrors Dashboard Data for consistency)
const STUDENTS_DB: Record<string, any> = {
    '2206081234': { name: 'Gede Bagus', program: 'Computer Science', batch: 2022, status: 'Aktif', gpa: 3.85, credits: 88, phone: '081234567890' },
    '2206082345': { name: 'Ni Putu Sari', program: 'Computer Science', batch: 2022, status: 'Aktif', gpa: 3.92, credits: 90, phone: '081234567891' },
    '2306083456': { name: 'Wayan Adi', program: 'Computer Science', batch: 2023, status: 'Cuti', gpa: 3.50, credits: 45, phone: '081234567892' },
    // ... fallback for others if accessed directly
};

// Dummy Course Data
const COURSES_TAKEN = [
    { code: 'CSGE601001', name: 'Programming Foundations', credits: 4, grade: 'A', term: 'Term 1 2022/2023' },
    { code: 'CSGE601002', name: 'Discrete Mathematics 1', credits: 3, grade: 'A-', term: 'Term 1 2022/2023' },
    { code: 'CSGE601003', name: 'Linear Algebra', credits: 3, grade: 'B+', term: 'Term 1 2022/2023' },
    { code: 'CSGE602004', name: 'Data Structures & Algo', credits: 4, grade: 'A', term: 'Term 2 2022/2023' },
    { code: 'CSGE602005', name: 'Computer Architecture', credits: 3, grade: 'B', term: 'Term 2 2022/2023' },
    { code: 'CSGE602006', name: 'Databases', credits: 4, grade: 'A-', term: 'Term 2 2022/2023' },
    { code: 'CSGE603007', name: 'Operating Systems', credits: 4, grade: 'B+', term: 'Term 1 2023/2024' },
    { code: 'CSGE603008', name: 'Computer Networks', credits: 3, grade: 'A', term: 'Term 1 2023/2024' },
];

const IRS_HISTORY = [
    { term: 'Term 1 2023/2024', status: 'Approved', credits: 21, courses: 7 },
    { term: 'Term 2 2022/2023', status: 'Approved', credits: 19, courses: 6 },
    { term: 'Term 1 2022/2023', status: 'Approved', credits: 18, courses: 6 },
];

const REMAINING_REQUIRED = [
    { code: 'CSGE604010', name: 'Software Engineering', credits: 4 },
    { code: 'CSGE604011', name: 'Automata Theory', credits: 3 },
    { code: 'CSGE605012', name: 'Compiler Design', credits: 3 },
    { code: 'CSGE606020', name: 'Human Computer Interaction', credits: 3 },
    { code: 'CSGE607090', name: 'Final Project / Thesis', credits: 6 },
];

export default function StudentDetailPage({ params }: { params: { npm: string } }) {
    const { npm } = params;

    // Find student or use a generic fallback if testing with random IDs
    const student = STUDENTS_DB[npm] || {
        name: 'Unknown Student',
        npm: npm,
        program: 'Computer Science',
        batch: 2022,
        status: 'Aktif',
        gpa: 3.00,
        credits: 60,
        phone: '-'
    };

    return (
        <div className="space-y-8 animate-fade-in">

            {/* 1. Student Overview Header */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_2px_15px_rgb(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <svg className="w-64 h-64 text-[#5AA0FF]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                </div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <Link href="/pa/dashboard" className="text-gray-400 hover:text-[#5AA0FF] flex items-center mb-4 md:mb-0 transition-colors text-sm font-semibold">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </Link>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                Contact Student
                            </button>
                            <button className="px-4 py-2 bg-[#5AA0FF] text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
                                Academic Evaluation
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                        ${student.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}
                    `}>
                                    {student.status}
                                </span>
                            </div>
                            <div className="text-gray-500 font-medium space-y-1">
                                <p className="flex items-center">
                                    <span className="w-24 text-gray-400 text-xs uppercase tracking-wider font-bold">NPM</span>
                                    <span className="text-gray-900">{student.npm}</span>
                                </p>
                                <p className="flex items-center">
                                    <span className="w-24 text-gray-400 text-xs uppercase tracking-wider font-bold">Program</span>
                                    <span className="text-gray-900">{student.program}</span>
                                </p>
                                <p className="flex items-center">
                                    <span className="w-24 text-gray-400 text-xs uppercase tracking-wider font-bold">Batch</span>
                                    <span className="text-gray-900">{student.batch}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 min-w-[140px] text-center">
                                <div className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">GPA (IPK)</div>
                                <div className="text-4xl font-extrabold text-[#5AA0FF]">{student.gpa.toFixed(2)}</div>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 min-w-[140px] text-center">
                                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Total SKS</div>
                                <div className="text-4xl font-extrabold text-gray-800">{student.credits}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: IRS History & Remaining Courses */}
                <div className="lg:col-span-1 space-y-8">

                    {/* 4. Remaining Required Courses (Most Important) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-red-50 overflow-hidden">
                        <div className="px-6 py-4 border-b border-red-50 bg-red-50/30 flex justify-between items-center">
                            <h2 className="font-bold text-gray-900">Required Not Taken</h2>
                            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                                {REMAINING_REQUIRED.length} Courses
                            </span>
                        </div>

                        <div className="p-2">
                            {REMAINING_REQUIRED.map((course, idx) => (
                                <div key={idx} className="p-3 hover:bg-gray-50 rounded-lg flex justify-between items-start transition-colors">
                                    <div>
                                        <div className="text-xs text-red-400 font-bold">{course.code}</div>
                                        <div className="text-sm font-medium text-gray-900 leading-tight">{course.name}</div>
                                    </div>
                                    <div className="font-mono text-gray-500 text-sm font-bold bg-gray-100 px-2 py-1 rounded ml-2">
                                        {course.credits}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 px-6 py-3 text-xs text-center text-gray-400 font-medium border-t border-gray-100">
                            Student must take these to graduate
                        </div>
                    </div>

                    {/* 3. IRS History */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-gray-900">Registration History</h2>
                        </div>
                        <div className="p-6 relative">
                            {/* Timeline Line */}
                            <div className="absolute left-9 top-6 bottom-6 w-0.5 bg-gray-100"></div>

                            <div className="space-y-6">
                                {IRS_HISTORY.map((irs, idx) => (
                                    <div key={idx} className="relative flex items-start group">
                                        <div className="absolute left-0 mt-1.5 h-6 w-6 rounded-full border-2 border-white bg-green-400 shadow-sm z-10"></div>
                                        <div className="ml-10 w-full">
                                            <h4 className="text-sm font-bold text-gray-900">{irs.term}</h4>
                                            <div className="flex justify-between items-center mt-1 text-xs">
                                                <span className="text-gray-500">{irs.courses} courses taken</span>
                                                <span className="font-bold text-gray-700">{irs.credits} SKS</span>
                                            </div>
                                            <div className="mt-1 inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] uppercase font-bold rounded">
                                                {irs.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Courses Taken List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="font-bold text-lg text-gray-900">Courses Taken</h2>
                            <div className="flex space-x-2">
                                {/* Dummy Sort/Filter */}
                                <select className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none">
                                    <option>Latest First</option>
                                    <option>Best Grades</option>
                                </select>
                            </div>
                        </div>

                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">Code / Name</th>
                                    <th className="px-6 py-3 font-semibold">Term</th>
                                    <th className="px-6 py-3 font-semibold text-right">Credit</th>
                                    <th className="px-6 py-3 font-semibold text-right">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {COURSES_TAKEN.map((course, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-mono text-xs text-gray-400">{course.code}</div>
                                            <div className="font-medium text-gray-900">{course.name}</div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            {course.term}
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono">
                                            {course.credits}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`font-bold ${course.grade.startsWith('A') ? 'text-emerald-500' :
                                                    course.grade.startsWith('B') ? 'text-[#5AA0FF]' : 'text-gray-500'
                                                }`}>
                                                {course.grade}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
