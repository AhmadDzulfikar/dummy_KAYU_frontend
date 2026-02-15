'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MANAGER_STUDENTS } from '../../data';

export default function DetailMahasiswaManager({ params }: { params: { npm: string } }) {
    const { npm } = params;
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    const student = MANAGER_STUDENTS.find(s => s.npm === npm);

    useEffect(() => {
        const activeProdi = localStorage.getItem('manajerActiveProdi');

        if (!student) return;

        // Context check
        if (activeProdi && student.program === activeProdi) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
            router.push('/403');
        }
    }, [student, router]);

    if (!student) return <div className="p-8 text-center text-gray-500">Mahasiswa tidak ditemukan.</div>;
    if (isAuthorized !== true) return null;

    return (
        <div className="space-y-6 pb-10">
            {/* Back Link */}
            <Link href="/manajer-akademik/mahasiswa" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-[#5AA0FF] transition-colors group">
                <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Kembali ke Daftar Mahasiswa
            </Link>

            {/* Header Identity */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold border ${student.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                            {student.status}
                        </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <span><strong className="text-gray-400">NPM:</strong> {student.npm}</span>
                        <span><strong className="text-gray-400">Prodi:</strong> {student.program}</span>
                        <span><strong className="text-gray-400">Angkatan:</strong> {student.batch}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="bg-gray-50 px-5 py-3 rounded-xl border border-gray-100 text-center min-w-[100px]">
                        <div className="text-xs text-gray-500 font-bold uppercase">IPK</div>
                        <div className="text-2xl font-black text-[#5AA0FF]">{student.gpa.toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 rounded-xl border border-gray-100 text-center min-w-[100px]">
                        <div className="text-xs text-gray-500 font-bold uppercase">SKS Reg</div>
                        <div className="text-2xl font-black text-gray-800">{student.credits}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Transkrip Ringkas */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Transkrip Ringkas (Dummy)</h3>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-gray-500 mb-4">Menampilkan ringkasan mata kuliah.</p>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs uppercase text-gray-400 border-b border-gray-100">
                                    <th className="pb-2">Mata Kuliah</th>
                                    <th className="pb-2 text-right">SKS</th>
                                    <th className="pb-2 text-right">Nilai</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {['Dasar Pemrograman', 'Matematika Diskrit', 'Struktur Data', 'Basis Data'].map((m, i) => (
                                    <tr key={i}>
                                        <td className="py-2 text-gray-700 font-medium">{m}</td>
                                        <td className="py-2 text-right text-gray-500">3</td>
                                        <td className="py-2 text-right font-bold text-emerald-600">A</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 2. Status Evaluasi & Yudisium */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Status Evaluasi Akademik</h3>
                        {student.evaluationStatus === 'Peringatan' ? (
                            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    <span className="font-bold text-red-700">PERINGATAN (BERISIKO)</span>
                                </div>
                                <ul className="list-disc list-inside text-sm text-red-600 pl-1">
                                    {student.riskReasons?.map((r, i) => <li key={i}>{r}</li>)}
                                </ul>
                            </div>
                        ) : (
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="font-bold text-emerald-700">AMAN (SAFE)</span>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Status Yudisium</h3>
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="text-sm text-gray-600 font-medium">Status Pengajuan</span>
                            <span className={`text-sm font-bold ${student.yudisiumStatus === 'Disetujui' ? 'text-emerald-600' :
                                    student.yudisiumStatus === 'Ditolak' ? 'text-red-600' : 'text-gray-500'
                                }`}>
                                {student.yudisiumStatus}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
