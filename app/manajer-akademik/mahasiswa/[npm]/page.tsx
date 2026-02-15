'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MANAGER_STUDENTS } from '../../data';

export default function DetailMahasiswaManager() {
    const params = useParams();
    // Safety check - force string. In some setups params can be unready initially.
    const npm = typeof params?.npm === 'string' ? params.npm : '';
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    // State for "Show More" functionality in Mata Kuliah Wajib
    const [showAllFinished, setShowAllFinished] = useState(false);

    // Filter using the deterministic data
    const student = MANAGER_STUDENTS.find(s => s.npm === npm);

    useEffect(() => {
        const activeProdi = localStorage.getItem('manajerActiveProdi');

        if (!student) return;

        // Context check - ensure manager is viewing student from their prodi
        if (activeProdi && student.program === activeProdi) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
            // In a real app, maybe redirect to 403 or show unauthorized message
            // router.push('/403'); 
        }
    }, [student, router]);

    if (!student) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="text-xl font-semibold text-gray-700 mb-2">Mahasiswa tidak ditemukan</div>
                <div className="text-sm mb-6">Pastikan NPM yang Anda cari benar.</div>
                <Link href="/manajer-akademik/mahasiswa" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Kembali ke Daftar
                </Link>
                <div className="text-xs text-red-400 mt-8 break-all max-w-md text-center bg-gray-50 p-2 rounded">
                    Debug Info:<br />
                    Requested NPM: "{npm}"<br />
                    First 5 Available: {JSON.stringify(MANAGER_STUDENTS.slice(0, 5).map(s => s.npm))}
                </div>
            </div>
        );
    }

    if (isAuthorized === false) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                <div className="text-xl font-semibold text-red-600 mb-2">Akses Ditolak</div>
                <div className="text-sm mb-6">Anda tidak memiliki akses untuk melihat data mahasiswa dari program studi ini.</div>
                <Link href="/manajer-akademik/mahasiswa" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Kembali ke Daftar
                </Link>
            </div>
        );
    }

    // Authorization check in progress or authorized
    if (isAuthorized === null) return null;

    // --- DUMMY DATA FOR UI ---

    // 1. Transcript Data (Expanded with External Courses)
    const transcriptData = [
        { code: 'CSGE601001', name: 'Dasar Pemrograman', term: '1', credits: 4, grade: 'A' },
        { code: 'CSGE601002', name: 'Matematika Diskrit 1', term: '1', credits: 3, grade: 'A-' },
        { code: 'CSGE601003', name: 'Aljabar Linear', term: '1', credits: 3, grade: 'B+' },
        { code: 'UIGE600001', name: 'MPK Terintegrasi', term: '1', credits: 6, grade: 'A' },
        { code: 'CSGE601004', name: 'Pengantar Sistem Digital', term: '1', credits: 3, grade: 'B' },

        { code: 'CSGE602005', name: 'Struktur Data & Algoritma', term: '2', credits: 4, grade: 'A' },
        { code: 'CSGE602006', name: 'Arsitektur Komputer', term: '2', credits: 3, grade: 'B+' },
        { code: 'CSGE602007', name: 'Basis Data', term: '2', credits: 4, grade: 'B' },
        { code: 'CSGE602008', name: 'Matematika Diskrit 2', term: '2', credits: 3, grade: 'A-' },
        { code: 'UIGE600002', name: 'MPK Bahasa Inggris', term: '2', credits: 2, grade: 'A' },

        { code: 'CSGE603009', name: 'Perancangan & Pemrograman Web', term: '3', credits: 4, grade: 'A' },
        { code: 'CSGE603010', name: 'Sistem Operasi', term: '3', credits: 4, grade: 'B+' },
        { code: 'CSGE603011', name: 'Jaringan Komputer', term: '3', credits: 4, grade: 'B' },
        { code: 'CSGE603012', name: 'Probabilitas & Statistika', term: '3', credits: 3, grade: 'C+' },

        { code: 'CSGE604013', name: 'Kecerdasan Artifisial', term: '4', credits: 4, grade: 'B+' },
        { code: 'CSGE604014', name: 'Rekayasa Perangkat Lunak', term: '4', credits: 3, grade: 'A-' },

        // External Courses
        { code: 'EXT000101', name: 'Bahasa Portugis', term: 'Eksternal', credits: 3, grade: 'A' },
        { code: 'EXT000102', name: 'Bahasa Perancis', term: 'Eksternal', credits: 3, grade: 'A-' },
        { code: 'EXT000103', name: 'Bahasa Jepang', term: 'Eksternal', credits: 3, grade: 'B+' },
        { code: 'EXT000205', name: 'Produksi Media', term: 'Eksternal', credits: 3, grade: 'A' },
        { code: 'EXT000206', name: 'Fotografi Digital', term: 'Eksternal', credits: 2, grade: 'B' },
    ];

    // 2. Required Courses (Taken/Not Taken) - Expanded for Show More
    const requiredCourses = {
        taken: [
            { name: 'Dasar Pemrograman', credits: 4 },
            { name: 'Struktur Data & Algoritma', credits: 4 },
            { name: 'Basis Data', credits: 4 },
            { name: 'Sistem Operasi', credits: 4 },
            { name: 'Jaringan Komputer', credits: 4 },
            { name: 'Matematika Diskrit 1', credits: 3 },
            { name: 'Matematika Diskrit 2', credits: 3 },
            { name: 'Aljabar Linear', credits: 3 },
            { name: 'Pengantar Sistem Digital', credits: 3 },
            { name: 'Arsitektur Komputer', credits: 3 },
            { name: 'Probabilitas & Statistika', credits: 3 },
            { name: 'Perancangan & Pemrograman Web', credits: 4 },
            { name: 'Kecerdasan Artifisial', credits: 4 },
            { name: 'Rekayasa Perangkat Lunak', credits: 3 },
            { name: 'MPK Terintegrasi', credits: 6 },
            { name: 'MPK Bahasa Inggris', credits: 2 },
        ],
        notTaken: [
            { name: 'Proyek Perangkat Lunak', credits: 6 },
            { name: 'Metodologi Penelitian', credits: 3 },
            { name: 'Kerja Praktik', credits: 2 },
            { name: 'Tugas Akhir', credits: 6 },
            { name: 'Etika Profesi', credits: 2 },
            { name: 'Kewirausahaan', credits: 2 },
        ]
    };

    const requiredTotal = requiredCourses.taken.length + requiredCourses.notTaken.length;
    const requiredProgress = requiredCourses.taken.length;
    const progressPercent = Math.round((requiredProgress / requiredTotal) * 100);

    // Filter finished courses for display
    const visibleFinishedCourses = showAllFinished ? requiredCourses.taken : requiredCourses.taken.slice(0, 5);

    // Calculate Semester (Approximate for Feb 2026)
    // Batch 2020 -> 2026 is Year 6 -> Sem 12
    const currentSemester = (2026 - student.batch) * 2;

    return (
        <div className="space-y-8 pb-10">
            {/* Back Link */}
            <Link href="/manajer-akademik/mahasiswa" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-[#5AA0FF] transition-colors group">
                <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Kembali ke Daftar Mahasiswa
            </Link>

            {/* A) Header Identitas */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h1>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-400">NPM</span>
                            <span className="font-mono bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{student.npm}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-400">Prodi</span>
                            <span>{student.program}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-400">Angkatan</span>
                            <span>{student.batch}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-400">Semester</span>
                            <span>{currentSemester}</span>
                        </div>
                    </div>
                    <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${student.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${student.status === 'Aktif' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            Status: {student.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* B) Ringkasan Akademik (Cards) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" opacity="0.6" /><path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">IPK Saat Ini</div>
                    <div className="text-4xl font-black text-[#5AA0FF]">{student.gpa.toFixed(2)}</div>
                    <div className="mt-2 text-[10px] text-gray-400 font-medium">Skala 4.00</div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">IPS Terakhir</div>
                    <div className="text-4xl font-black text-gray-800">{student.ips.toFixed(2)}</div>
                    <div className="mt-2 text-[10px] text-gray-400 font-medium">Semester sebelumnya</div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">SKS Reguler</div>
                    <div className="text-4xl font-black text-gray-800">{student.credits}</div>
                    <div className="mt-2 text-[10px] text-gray-400 font-medium">Total SKS Diambil</div>
                </div>

                <div className="bg-gray-50/80 p-5 rounded-xl border border-gray-200 dashed-border">
                    <div className="flex justify-between items-start">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">SKS Transfer</div>
                        <span className="text-[10px] bg-white border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded">Terpisah</span>
                    </div>
                    <div className="text-4xl font-black text-gray-600">{student.transferCredits}</div>
                    <div className="mt-2 text-[10px] text-gray-400 font-medium italic">Tidak masuk IPK</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN (2/3) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* F) Mata Kuliah Wajib (Moved UP) */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-gray-900 text-lg">Mata Kuliah Wajib</h3>
                                <span className="text-sm font-semibold text-gray-600">{requiredProgress} / {requiredTotal} Selesai</span>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#5AA0FF] transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Belum Diambil - Highlighted */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                    <h4 className="font-bold text-amber-900">Belum Diambil</h4>
                                </div>
                                <div className="space-y-2">
                                    {requiredCourses.notTaken.map((course, i) => (
                                        <div key={i} className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex justify-between items-center shadow-sm">
                                            <span className="text-sm font-medium text-amber-900">{course.name}</span>
                                            <span className="text-xs font-bold text-amber-600 bg-white/60 px-2 py-0.5 rounded">{course.credits} SKS</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sudah Diambil */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <h4 className="font-bold text-gray-700">Sudah Selesai</h4>
                                </div>
                                <div className="space-y-2">
                                    {visibleFinishedCourses.map((course, i) => (
                                        <div key={i} className="p-3 bg-gray-50 border border-gray-100 rounded-lg flex justify-between items-center opacity-70 hover:opacity-100 transition-opacity">
                                            <span className="text-sm text-gray-600 line-through decoration-gray-400">{course.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-gray-400">{course.credits} SKS</span>
                                                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {requiredCourses.taken.length > 5 && (
                                    <button
                                        onClick={() => setShowAllFinished(!showAllFinished)}
                                        className="w-full py-2 text-xs font-semibold text-[#5AA0FF] border border-[#5AA0FF]/20 rounded-lg hover:bg-[#5AA0FF]/5 transition-colors"
                                    >
                                        {showAllFinished ? 'Tampilkan Lebih Sedikit' : `Tampilkan ${requiredCourses.taken.length - 5} Lainnya`}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* E) Transkrip (Moved DOWN) */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-900 text-lg">Transkrip Akademik</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-left text-xs uppercase font-semibold text-gray-500">
                                        <th className="pl-6 pr-4 py-4 w-28">Kode MK</th>
                                        <th className="px-4 py-4">Nama Mata Kuliah</th>
                                        <th className="px-4 py-4 w-24">Semester</th>
                                        <th className="px-4 py-4 w-20 text-right">SKS</th>
                                        <th className="pl-4 pr-6 py-4 w-20 text-left">Nilai</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {transcriptData.map((course, i) => (
                                        <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="pl-6 pr-4 py-3 font-mono text-xs text-gray-500">{course.code}</td>
                                            <td className="px-4 py-3 font-medium text-gray-800">{course.name}</td>
                                            <td className="px-4 py-3 text-gray-500">{course.term === 'Eksternal' ? <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-1.5 py-0.5 rounded font-bold">EKSTERNAL</span> : `Sem. ${course.term}`}</td>
                                            <td className="px-4 py-3 text-right text-gray-600 font-mono">{course.credits}</td>
                                            <td className="pl-4 pr-6 py-3 text-left">
                                                <span className={`font-bold ${course.grade.startsWith('A') ? 'text-emerald-600' : 'text-gray-700'}`}>
                                                    {course.grade}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-xs text-center text-gray-400 italic">
                            Menampilkan {transcriptData.length} mata kuliah
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN (1/3) - Status Cards */}
                <div className="space-y-6">

                    {/* C) Status Evaluasi Akademik */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative overflow-hidden">
                        <h3 className="font-bold text-gray-900 mb-4 text-lg">Evaluasi Akademik</h3>

                        {student.evaluationStatus === 'Peringatan' ? (
                            <div className="bg-red-50 border border-red-100 rounded-xl p-5 animate-pulse-slow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-red-100 p-2 rounded-full">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-black text-red-700 text-lg tracking-tight">PERINGATAN</div>
                                        <div className="text-xs text-red-600 font-medium">Perlu perhatian khusus</div>
                                    </div>
                                </div>
                                <hr className="border-red-200 my-3" />
                                <div className="text-sm font-semibold text-red-800 mb-2">Alasan status peringatan:</div>
                                <ul className="space-y-1.5">
                                    {student.riskReasons?.map((r, i) => (
                                        <li key={i} className="flex items-start text-sm text-red-700">
                                            <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-emerald-100 p-2 rounded-full">
                                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-black text-emerald-700 text-lg tracking-tight">AMAN</div>
                                        <div className="text-xs text-emerald-600 font-medium">Akademik berjalan lancar</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-4 text-xs text-gray-400 text-center">
                            Terakhir dievaluasi: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                    </div>

                    {/* D) Status Yudisium */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4 text-lg">Status Yudisium</h3>

                        <div className={`
                            p-5 rounded-xl border-l-4 flex flex-col gap-2 shadow-sm
                            ${student.yudisiumStatus === 'Disetujui' ? 'bg-emerald-50 border-emerald-500' :
                                student.yudisiumStatus === 'Ditolak' ? 'bg-red-50 border-red-500' :
                                    student.yudisiumStatus === 'Diajukan' ? 'bg-blue-50 border-blue-500' :
                                        'bg-gray-50 border-gray-300'}
                        `}>
                            <div className="text-xs uppercase font-bold text-gray-500 tracking-wider">Status Saat Ini</div>
                            <div className={`text-2xl font-black 
                                ${student.yudisiumStatus === 'Disetujui' ? 'text-emerald-700' :
                                    student.yudisiumStatus === 'Ditolak' ? 'text-red-700' :
                                        student.yudisiumStatus === 'Diajukan' ? 'text-blue-700' :
                                            'text-gray-700'}
                            `}>
                                {student.yudisiumStatus}
                            </div>
                        </div>

                        {student.isEligibleForGraduation && student.yudisiumStatus === 'Belum mengajukan' && (
                            <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100 flex gap-3 items-start">
                                <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div className="text-sm text-emerald-800">
                                    <span className="font-bold">Mahasiswa Layak Yudisium.</span> <br />
                                    Syarat SKS dan IPK telah terpenuhi.
                                </div>
                            </div>
                        )}

                        <div className="mt-6">
                            <h4 className="font-bold text-gray-800 text-sm mb-2">Riwayat Kelulusan</h4>
                            <div className="relative pl-4 border-l-2 border-gray-100 space-y-4">
                                <div className="relative">
                                    <div className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-white ${student.isEligibleForGraduation ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                                    <div className="text-xs text-gray-500">Syarat Kelulusan</div>
                                    <div className={`text-sm font-semibold ${student.isEligibleForGraduation ? 'text-emerald-700' : 'text-gray-400'}`}>
                                        {student.isEligibleForGraduation ? 'Terpenuhi' : 'Belum Terpenuhi'}
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-white ${student.yudisiumStatus !== 'Belum mengajukan' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                    <div className="text-xs text-gray-500">Pengajuan Yudisium</div>
                                    <div className="text-sm font-semibold text-gray-700">
                                        {student.yudisiumStatus !== 'Belum mengajukan' ? 'Telah Diajukan' : '-'}
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
