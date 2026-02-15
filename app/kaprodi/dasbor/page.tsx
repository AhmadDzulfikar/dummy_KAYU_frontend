'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { KAPRODI_STUDENTS_DATA } from '../data';

export default function KaprodiDashboard() {
    const [activeProdi, setActiveProdi] = useState<string>('');
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        cuti: 0,
        safe: 0,
        warning: 0,
        yudisiumPending: 0,
        yudisiumSubmitted: 0,
        yudisiumApproved: 0,
        yudisiumRejected: 0
    });

    useEffect(() => {
        const storedProdi = localStorage.getItem('kaprodiActiveProdi');
        if (storedProdi) {
            setActiveProdi(storedProdi);
            const filtered = KAPRODI_STUDENTS_DATA.filter(s => s.program === storedProdi);

            setStats({
                total: filtered.length,
                active: filtered.filter(s => s.status === 'Aktif').length,
                cuti: filtered.filter(s => s.status === 'Cuti').length,
                safe: filtered.filter(s => s.evaluationStatus === 'Aman').length,
                warning: filtered.filter(s => s.evaluationStatus === 'Peringatan').length,
                yudisiumPending: filtered.filter(s => s.yudisiumStatus === 'Belum mengajukan').length,
                yudisiumSubmitted: filtered.filter(s => s.yudisiumStatus === 'Diajukan').length,
                yudisiumApproved: filtered.filter(s => s.yudisiumStatus === 'Disetujui').length,
                yudisiumRejected: filtered.filter(s => s.yudisiumStatus === 'Ditolak').length,
            });
        }
    }, []);

    if (!activeProdi) return null; // Wait for layout to redirect if missing

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dasbor Kaprodi</h1>
                <p className="text-gray-500 mt-1">Ringkasan statistik untuk Program Studi <span className="font-bold text-gray-800">{activeProdi}</span>.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* 1. Student Summary */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg text-[#5AA0FF]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <h2 className="font-bold text-gray-900">Ringkasan Mahasiswa</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                            <span className="text-sm text-gray-600">Total Mahasiswa</span>
                            <span className="font-bold text-gray-900 text-lg">{stats.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Aktif</span>
                            <span className="font-semibold text-emerald-600">{stats.active}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Cuti</span>
                            <span className="font-semibold text-amber-600">{stats.cuti}</span>
                        </div>
                    </div>
                </div>

                {/* 2. Academic Evaluation */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <h2 className="font-bold text-gray-900">Evaluasi Akademik</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Aman</span>
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">{stats.safe}</span>
                        </div>
                        <div className="flex justify-between items-center bg-red-50 p-3 rounded-xl">
                            <span className="text-sm font-bold text-red-700">Peringatan (Berisiko)</span>
                            <span className="px-2 py-1 bg-white text-red-600 text-xs font-bold rounded-full shadow-sm">{stats.warning}</span>
                        </div>
                        {stats.warning > 0 && (
                            <p className="text-xs text-gray-400 mt-2 italic">
                                * {stats.warning} mahasiswa memerlukan perhatian khusus.
                            </p>
                        )}
                    </div>
                </div>

                {/* 3. Yudisium Summary */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <h2 className="font-bold text-gray-900">Ringkasan Yudisium</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <div className="text-xs text-gray-500 mb-1">Diajukan</div>
                            <div className="text-xl font-bold text-blue-600">{stats.yudisiumSubmitted}</div>
                        </div>
                        <div className="bg-emerald-50 rounded-xl p-3 text-center">
                            <div className="text-xs text-emerald-600 mb-1">Disetujui</div>
                            <div className="text-xl font-bold text-emerald-700">{stats.yudisiumApproved}</div>
                        </div>
                        <div className="bg-red-50 rounded-xl p-3 text-center">
                            <div className="text-xs text-red-600 mb-1">Ditolak</div>
                            <div className="text-xl font-bold text-red-700">{stats.yudisiumRejected}</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <div className="text-xs text-gray-400 mb-1">Belum</div>
                            <div className="text-xl font-bold text-gray-400">{stats.yudisiumPending}</div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Action Section */}
            <div className="flex justify-end pt-4">
                <Link
                    href="/kaprodi/mahasiswa"
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-[#5AA0FF] text-white font-bold text-sm shadow-lg hover:bg-blue-600 transition-all hover:translate-y-[-1px]"
                >
                    Lihat Daftar Mahasiswa Lengkap
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
            </div>
        </div>
    );
}
