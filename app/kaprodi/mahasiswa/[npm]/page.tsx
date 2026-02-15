'use client';

import { useRouter } from 'next/navigation';
import { KAPRODI_STUDENTS_DATA } from '../../data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Access Control Wrapper
export default function DetailMahasiswaPage({ params }: { params: { npm: string } }) {
    const { npm } = params;
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [activeProdi, setActiveProdi] = useState<string | null>(null);

    const student = KAPRODI_STUDENTS_DATA.find(s => s.npm === npm);

    useEffect(() => {
        const storedProdi = localStorage.getItem('kaprodiActiveProdi');
        setActiveProdi(storedProdi);

        if (!student) {
            return;
        }

        if (storedProdi && student.program === storedProdi) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
            // Redirect to 403
            router.push('/403');
        }
    }, [student, router, npm]);

    if (!student) {
        return <div className="p-8 text-center text-gray-500">Mahasiswa tidak ditemukan.</div>;
    }

    if (isAuthorized === false) return null; // Wait for redirect
    if (isAuthorized === null) return null; // Loading check

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-2 fade-in duration-300 pb-10">
            {/* Back Link */}
            <Link href="/kaprodi/mahasiswa" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-[#5AA0FF] transition-colors group">
                <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Kembali ke Daftar Mahasiswa
            </Link>

            {/* 1. Identity Header */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.05)] relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{student.name}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${student.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                {student.status}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">NPM</span>
                                <span className="font-mono font-medium">{student.npm}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Prodi</span>
                                <span className="font-medium">{student.program}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Angkatan</span>
                                <span className="font-medium">{student.batch}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative BG */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                    <svg className="w-64 h-64 text-[#5AA0FF]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                </div>
            </div>

            {/* 2. Academic Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">IPK Saat Ini</div>
                    <div className="text-4xl font-extrabold text-[#5AA0FF] tracking-tight">{student.gpa.toFixed(2)}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">IPS Terakhir</div>
                    <div className="text-4xl font-extrabold text-gray-900 tracking-tight">{student.ips.toFixed(2)}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Total SKS Reguler</div>
                    <div className="text-4xl font-extrabold text-gray-900 tracking-tight">{student.credits}</div>
                </div>
                <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 shadow-sm">
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">SKS Transfer</div>
                    <div className="text-4xl font-extrabold text-indigo-600 tracking-tight">{student.transferCredits}</div>
                    <div className="text-[10px] text-indigo-400 mt-1 font-medium">*Dihitung terpisah</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Evaluation & Yudisium */}
                <div className="lg:col-span-1 space-y-8">
                    {/* 5. Evaluasi Akademik */}
                    <div className={`rounded-2xl border p-6 flex flex-col relative overflow-hidden
                        ${student.evaluationStatus === 'Peringatan' ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}
                    `}>
                        <h3 className={`font-bold uppercase tracking-wider text-xs mb-4 flex items-center
                             ${student.evaluationStatus === 'Peringatan' ? 'text-red-800' : 'text-emerald-800'}
                        `}>
                            {student.evaluationStatus === 'Peringatan' ? (
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            ) : (
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            )}
                            Evaluasi Akademik: {student.evaluationStatus}
                        </h3>

                        {student.evaluationStatus === 'Peringatan' ? (
                            <div className="flex-1 bg-white/60 rounded-xl p-4 border border-red-100/50">
                                <p className="text-xs text-red-800 mb-2 font-bold uppercase tracking-wide">Penyebab Peringatan</p>
                                <ul className="space-y-2">
                                    {student.riskReasons?.map((r, i) => (
                                        <li key={i} className="flex items-start text-sm text-red-700">
                                            <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-sm text-emerald-700 leading-relaxed">
                                Mahasiswa saat ini berada dalam kondisi akademik yang baik (Safe). Tidak ada kendala signifikan yang terdeteksi oleh sistem.
                            </p>
                        )}
                    </div>

                    {/* 6. Status Yudisium */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-fit">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-900">Status Yudisium</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.yudisiumStatus === 'Disetujui' ? 'bg-emerald-100 text-emerald-700' :
                                    student.yudisiumStatus === 'Ditolak' ? 'bg-red-100 text-red-700' :
                                        student.yudisiumStatus === 'Diajukan' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-500'
                                }`}>
                                {student.yudisiumStatus}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex justify-between items-center text-xs mb-2">
                                    <span className="text-gray-500 font-bold uppercase tracking-wider">Total SKS</span>
                                    <span className="text-gray-400 font-mono">Min. 144</span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                                    {student.credits >= 144 ? (
                                        <div className="h-full bg-emerald-500 w-full rounded-full"></div>
                                    ) : (
                                        <div className="h-full bg-[#5AA0FF] rounded-full" style={{ width: `${(student.credits / 144) * 100}%` }}></div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 leading-snug">
                                    {student.credits >= 144
                                        ? "✅ Memenuhi syarat SKS minimal."
                                        : `⚠️ Masih kurang ${144 - student.credits} SKS.`}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex justify-between items-center text-xs mb-2">
                                    <span className="text-gray-500 font-bold uppercase tracking-wider">IPK Minimal</span>
                                    <span className="text-gray-400 font-mono">Min. 2.00</span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                                    {student.gpa >= 2.00 ? (
                                        <div className="h-full bg-emerald-500 w-full rounded-full"></div>
                                    ) : (
                                        <div className="h-full bg-red-400 rounded-full" style={{ width: `${(student.gpa / 4.00) * 100}%` }}></div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 leading-snug">
                                    {student.gpa >= 2.00
                                        ? "✅ Memenuhi syarat IPK minimal."
                                        : "⚠️ IPK belum mencukupi."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Course Progress & Histories */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 3. Mata Kuliah Wajib */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[300px]">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                            <div>
                                <h3 className="font-bold text-gray-900">Mata Kuliah Wajib</h3>
                                <p className="text-xs text-gray-500 mt-1">Pemantauan penyelesaian mata kuliah wajib prodi.</p>
                            </div>
                            <div className="text-right">
                                <span className="block text-xl font-bold text-gray-900">80%</span>
                                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Progress</span>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-red-50/50 rounded-xl p-5 border border-red-50">
                                <h4 className="flex items-center text-xs font-bold text-red-400 uppercase tracking-wider mb-4">
                                    <span className="w-2 h-2 rounded-full bg-red-400 mr-2"></span>
                                    Belum Diambil (Prioritas)
                                </h4>
                                <ul className="space-y-3">
                                    {['Skripsi', 'Kerja Praktik', 'Proyek Perangkat Lunak'].map((mk, i) => (
                                        <li key={i} className="bg-white px-4 py-3 rounded-xl shadow-sm border border-red-100 flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-700">{mk}</span>
                                            <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded">WAJIB</span>
                                        </li>
                                    ))}
                                    <li className="text-xs text-center text-gray-400 italic pt-2">+ 2 mata kuliah lainnya...</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="flex items-center text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                                    Sudah Lulus (Sampel)
                                </h4>
                                <ul className="space-y-3">
                                    {['Dasar Pemrograman', 'Matematika Diskrit 1', 'Struktur Data & Algoritma', 'Basis Data', 'Jaringan Komputer'].map((mk, i) => (
                                        <li key={i} className="flex justify-between items-center px-2">
                                            <span className="text-sm text-gray-500">{mk}</span>
                                            <span className="text-emerald-600 font-bold text-xs flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                Lulus
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 4. Riwayat KRS */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
                            <h3 className="font-bold text-gray-900">Riwayat Akademik Ringkas</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-gray-50 text-gray-500 tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Semester</th>
                                        <th className="px-6 py-4 font-semibold text-right">SKS Diambil</th>
                                        <th className="px-6 py-4 font-semibold text-right">IPS</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {[
                                        { sem: 'Ganjil 2023/2024', sks: 21, ips: 3.45, status: 'Lulus' },
                                        { sem: 'Genap 2022/2023', sks: 20, ips: 3.20, status: 'Lulus' },
                                        { sem: 'Ganjil 2022/2023', sks: 19, ips: 3.00, status: 'Lulus' },
                                        { sem: 'Genap 2021/2022', sks: 21, ips: 3.80, status: 'Lulus' },
                                        { sem: 'Ganjil 2021/2022', sks: 20, ips: 3.65, status: 'Lulus' },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{row.sem}</td>
                                            <td className="px-6 py-4 text-right font-mono text-gray-600">{row.sks}</td>
                                            <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">{row.ips.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-xs">
                                                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">Lulus</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
