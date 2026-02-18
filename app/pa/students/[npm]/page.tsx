'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { STUDENTS_DATA, Student } from '../../data';

// Dummy Course Data
const COURSES_TAKEN = [
    { code: 'CSGE601001', name: 'Dasar Pemrograman', credits: 4, grade: 'A', term: 'Smt 1 2022/2023' },
    { code: 'CSGE601002', name: 'Matematika Diskrit 1', credits: 3, grade: 'A-', term: 'Smt 1 2022/2023' },
    { code: 'CSGE601003', name: 'Aljabar Linear', credits: 3, grade: 'B+', term: 'Smt 1 2022/2023' },
    { code: 'CSGE602004', name: 'Struktur Data & Algoritma', credits: 4, grade: 'A', term: 'Smt 2 2022/2023' },
    { code: 'CSGE602005', name: 'Arsitektur Komputer', credits: 3, grade: 'B', term: 'Smt 2 2022/2023' },
    { code: 'CSGE602006', name: 'Basis Data', credits: 4, grade: 'A-', term: 'Smt 2 2022/2023' },
    { code: 'CSGE603007', name: 'Sistem Operasi', credits: 4, grade: 'B+', term: 'Smt 1 2023/2024' },
    { code: 'CSGE603008', name: 'Jaringan Komputer', credits: 3, grade: 'A', term: 'Smt 1 2023/2024' },
];

const IRS_HISTORY = [
    { term: 'Smt 1 2023/2024', status: 'Disetujui', credits: 21, courses: 7 },
    { term: 'Smt 2 2022/2023', status: 'Disetujui', credits: 19, courses: 6 },
    { term: 'Smt 1 2022/2023', status: 'Disetujui', credits: 18, courses: 6 },
];

const REMAINING_REQUIRED = [
    { code: 'CSGE604010', name: 'Rekayasa Perangkat Lunak', credits: 4 },
    { code: 'CSGE604011', name: 'Teori Bahasa & Automata', credits: 3 },
    { code: 'CSGE605012', name: 'Desain Kompilator', credits: 3 },
    { code: 'CSGE606020', name: 'Interaksi Manusia Komputer', credits: 3 },
    { code: 'CSGE607090', name: 'Tugas Akhir / Skripsi', credits: 6 },
];

export default function StudentDetailPage({ params }: { params: Promise<{ npm: string }> }) {
    const { npm } = use(params);

    // Find student or use a generic fallback if testing with random IDs
    const student: Student = STUDENTS_DATA.find(s => s.npm === npm) || {
        name: 'Unknown Student',
        npm: npm,
        program: 'Computer Science',
        batch: 2022,
        status: 'Aktif',
        gpa: 3.00,
        ips: 3.00,
        credits: 60,
        semester: 4,
        totalLeave: 0,
        phone: '-',
        isAtRisk: false,
        maxSksNext: 21
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
                            Kembali ke Dasbor
                        </Link>

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
                                <p className="flex items-center">
                                    <span className="w-24 text-gray-400 text-xs uppercase tracking-wider font-bold">Semester</span>
                                    <span className="text-gray-900">{student.semester}</span>
                                </p>
                                <p className="flex items-center">
                                    <span className="w-24 text-gray-400 text-xs uppercase tracking-wider font-bold">Total Cuti</span>
                                    <span className="text-gray-900">{student.totalLeave} Semester</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
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

            {/* NEW: Academic Evaluation Section */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_2px_15px_rgb(0,0,0,0.05)] border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                            Evaluasi Akademik
                            {student.isAtRisk ? (
                                <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-red-200">
                                    Berisiko (Peringatan)
                                </span>
                            ) : (
                                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-emerald-200">
                                    Aman
                                </span>
                            )}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Evaluasi berdasarkan kinerja akademik dan kemajuan studi.
                        </p>
                    </div>
                    {student.maxSksNext && (
                        <div className="mt-4 md:mt-0 bg-blue-50 border border-blue-100 px-5 py-3 rounded-xl text-right">
                            <div className="text-xs text-blue-500 font-bold uppercase tracking-wider">Batas SKS Semester Depan</div>
                            <div className="text-2xl font-extrabold text-[#5AA0FF]">{student.maxSksNext} <span className="text-sm font-medium text-blue-400">SKS</span></div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-500 font-medium">IP Semester (IPS)</span>
                            <span className="font-mono font-bold text-gray-900">{student.ips ? student.ips.toFixed(2) : '-'}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-500 font-medium">IP Kumulatif (IPK)</span>
                            <span className="font-mono font-bold text-gray-900">{student.gpa.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-500 font-medium">Total SKS</span>
                            <span className="font-mono font-bold text-gray-900">{student.credits}</span>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        {student.isAtRisk ? (
                            <div className="bg-red-50 border border-red-100 rounded-xl p-5 h-full">
                                <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    Penyebab Peringatan
                                </h3>
                                <ul className="space-y-2">
                                    {student.riskReasons?.map((reason, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-red-700">
                                            <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                                            {reason}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 text-xs text-red-600 italic">
                                    Harap jadwalkan sesi konseling dengan mahasiswa ini untuk mendiskusikan rencana studi mereka.
                                </div>
                            </div>
                        ) : (
                            <div className="h-full bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 flex flex-col justify-center items-center text-center">
                                <svg className="w-12 h-12 text-emerald-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-emerald-800 font-medium">Kinerja Akademik Baik</p>
                                <p className="text-emerald-600 text-xs mt-1">Mahasiswa berada di jalur yang benar tanpa kendala utama terdeteksi.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: IRS History & Remaining Courses */}
                <div className="lg:col-span-1 space-y-8">

                    {/* 4. Remaining Required Courses (Most Important) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-red-50 overflow-hidden">
                        <div className="px-6 py-4 border-b border-red-50 bg-red-50/30 flex justify-between items-center">
                            <h2 className="font-bold text-gray-900">Wajib Belum Diambil</h2>
                            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                                {REMAINING_REQUIRED.length} Mata Kuliah
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
                            Mahasiswa wajib mengambil mata kuliah ini untuk lulus
                        </div>
                    </div>

                    {/* 3. IRS History */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-gray-900">Riwayat Registrasi</h2>
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
                                                <span className="text-gray-500">{irs.courses} mata kuliah diambil</span>
                                                <span className="font-bold text-gray-700">{irs.credits} SKS</span>
                                            </div>
                                            <div className="mt-1 inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] uppercase font-bold rounded">
                                                {irs.status === 'Approved' ? 'Disetujui' : irs.status}
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
                            <h2 className="font-bold text-lg text-gray-900">Mata Kuliah yang Diambil</h2>
                            <div className="flex space-x-2">
                                {/* Dummy Sort/Filter */}
                                <select className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none">
                                    <option>Terbaru</option>
                                    <option>Nilai Terbaik</option>
                                </select>
                            </div>
                        </div>

                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">Kode / Nama</th>
                                    <th className="px-6 py-3 font-semibold">Semester</th>
                                    <th className="px-6 py-3 font-semibold text-right">SKS</th>
                                    <th className="px-6 py-3 font-semibold text-right">Nilai</th>
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
