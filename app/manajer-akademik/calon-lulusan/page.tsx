'use client';

import { useEffect, useState } from 'react';
import { MANAGER_STUDENTS, Student } from '../data';

export default function CalonLulusanManager() {
    const [activeProdi, setActiveProdi] = useState<string>('');
    const [candidates, setCandidates] = useState<Student[]>([]);

    // Filters
    const [period, setPeriod] = useState('Genap 2025/2026');
    const [statusFilter, setStatusFilter] = useState('Layak'); // Default show eligible

    // Toast State
    const [toast, setToast] = useState<{ show: boolean, msg: string, type: 'success' | 'warning' }>({ show: false, msg: '', type: 'success' });

    useEffect(() => {
        const stored = localStorage.getItem('manajerActiveProdi');
        if (stored) {
            setActiveProdi(stored);
            const data = MANAGER_STUDENTS.filter(s => s.program === stored);
            setCandidates(data);
        }
    }, []);

    const filtered = candidates.filter(s => {
        if (statusFilter === 'Layak') return s.isEligibleForGraduation;
        if (statusFilter === 'Belum Layak') return !s.isEligibleForGraduation;
        return true;
    });

    const handleExport = () => {
        if (filtered.length === 0) {
            setToast({ show: true, msg: 'Tidak ada data untuk diunduh.', type: 'warning' });
            setTimeout(() => setToast({ ...toast, show: false }), 3000);
            return;
        }

        // Dummy Download
        setToast({ show: true, msg: 'Mengunduh data CSV...', type: 'success' });
        setTimeout(() => setToast({ ...toast, show: false }), 3000);
    };

    return (
        <div className="space-y-6 relative">
            {/* Toast */}
            {toast.show && (
                <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl border text-sm font-bold animate-in slide-in-from-bottom-5 z-50 flex items-center
                    ${toast.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}
                `}>
                    {toast.type === 'warning' ? (
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    ) : (
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    )}
                    {toast.msg}
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Calon Lulusan</h1>
                    <p className="text-gray-500 mt-1">Ekspor data mahasiswa yang memenuhi syarat kelulusan.</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all hover:translate-y-[-1px] active:scale-95"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Ekspor ke CSV
                </button>
            </div>

            {/* Filter Card */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Program Studi</label>
                    <div className="bg-gray-100 p-2.5 rounded-lg text-sm text-gray-700 font-medium cursor-not-allowed border border-gray-200">
                        {activeProdi}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Periode Yudisium</label>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium outline-none focus:border-[#5AA0FF]"
                    >
                        <option>Genap 2025/2026</option>
                        <option>Ganjil 2025/2026</option>
                        <option>Genap 2024/2025</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Status Kelayakan</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium outline-none focus:border-[#5AA0FF]"
                    >
                        <option>Layak</option>
                        <option>Belum Layak</option>
                        <option>Semua</option>
                    </select>
                </div>
            </div>

            {/* Preview Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h2 className="font-bold text-gray-900">Pratinjau Data</h2>
                    <span className="text-xs font-medium text-gray-500">{filtered.length} record(s)</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-xs text-gray-400 uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Nama</th>
                                <th className="px-6 py-4">NPM</th>
                                <th className="px-6 py-4 text-right">IPK</th>
                                <th className="px-6 py-4 text-right">Total SKS</th>
                                <th className="px-6 py-4">Status Kelayakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.length > 0 ? (
                                filtered.map(s => (
                                    <tr key={s.npm} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-bold text-gray-900">{s.name}</td>
                                        <td className="px-6 py-4 font-mono text-gray-600">{s.npm}</td>
                                        <td className="px-6 py-4 text-right font-mono font-medium">{s.gpa.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-mono text-gray-600">{s.credits}</td>
                                        <td className="px-6 py-4">
                                            {s.isEligibleForGraduation ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                    Layak
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500">
                                                    Belum Layak
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center text-gray-400 italic">
                                        Tidak ada data yang sesuai filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
