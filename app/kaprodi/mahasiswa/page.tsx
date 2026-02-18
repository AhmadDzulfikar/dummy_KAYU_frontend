'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KAPRODI_STUDENTS_DATA, Student } from "../data";

export default function DaftarMahasiswaPage() {
    const router = useRouter();
    const [activeProdi, setActiveProdi] = useState<string>('');
    const [students, setStudents] = useState<Student[]>([]);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [tabFilter, setTabFilter] = useState<'All' | 'Peringatan'>('All');
    const [batchFilter, setBatchFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [evalStatusFilter, setEvalStatusFilter] = useState('All');
    const [yudisiumFilter, setYudisiumFilter] = useState('All');

    useEffect(() => {
        const storedProdi = localStorage.getItem('kaprodiActiveProdi');
        if (storedProdi) {
            setActiveProdi(storedProdi);
            const filtered = KAPRODI_STUDENTS_DATA.filter(s => s.program === storedProdi);
            setStudents(filtered);
        }
    }, []);

    // Derived filtered list
    const filteredList = students.filter(student => {
        // Tab Filter
        if (tabFilter === 'Peringatan' && student.evaluationStatus !== 'Peringatan') return false;

        // Dropdown Filters
        if (batchFilter !== 'All' && student.batch.toString() !== batchFilter) return false;
        if (statusFilter !== 'All' && student.status !== statusFilter) return false;
        if (evalStatusFilter !== 'All' && student.evaluationStatus !== evalStatusFilter) return false;
        if (yudisiumFilter !== 'All' && student.yudisiumStatus !== yudisiumFilter) return false;

        // Search
        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            return student.name.toLowerCase().includes(q) || student.npm.includes(q);
        }

        return true;
    });

    if (!activeProdi) return null;

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Daftar Mahasiswa</h1>
                <p className="text-gray-500 mt-1">Data mahasiswa Program Studi {activeProdi}.</p>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                {/* 1. Top Controls: Tabs & Search */}
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4 items-center bg-gray-50/50">
                    {/* Tabs */}
                    <div className="flex bg-gray-200/50 p-1 rounded-xl self-start md:self-auto">
                        <button
                            onClick={() => setTabFilter('All')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${tabFilter === 'All' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => setTabFilter('Peringatan')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${tabFilter === 'Peringatan' ? 'bg-red-50 text-red-600 shadow-sm ring-1 ring-red-100' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Peringatan
                            <span className="bg-red-200 text-red-800 px-1.5 py-0.5 rounded-full text-[10px]">{students.filter(s => s.evaluationStatus === 'Peringatan').length}</span>
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Cari nama atau NPM..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5AA0FF]/50 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* 2. Filter Bar */}
                <div className="p-4 border-b border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white">
                    <select value={batchFilter} onChange={(e) => setBatchFilter(e.target.value)} className="p-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:border-[#5AA0FF] outline-none">
                        <option value="All">Semua Angkatan</option>
                        {[2020, 2021, 2022, 2023, 2024].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>

                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:border-[#5AA0FF] outline-none">
                        <option value="All">Semua Status Akademik</option>
                        <option value="Aktif">Aktif</option>
                        <option value="Cuti">Cuti</option>
                    </select>

                    <select value={evalStatusFilter} onChange={(e) => setEvalStatusFilter(e.target.value)} className="p-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:border-[#5AA0FF] outline-none">
                        <option value="All">Semua Evaluasi</option>
                        <option value="Aman">Aman</option>
                        <option value="Peringatan">Peringatan</option>
                    </select>

                    <select value={yudisiumFilter} onChange={(e) => setYudisiumFilter(e.target.value)} className="p-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:border-[#5AA0FF] outline-none">
                        <option value="All">Semua Status Yudisium</option>
                        <option value="Belum mengajukan">Belum mengajukan</option>
                        <option value="Diajukan">Diajukan</option>
                        <option value="Disetujui">Disetujui</option>
                        <option value="Ditolak">Ditolak</option>
                    </select>
                </div>

                {/* 3. Table */}
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-medium">
                            <tr>
                                <th className="px-6 py-4">Nama</th>
                                <th className="px-6 py-4">NPM</th>
                                <th className="px-6 py-4">Angkatan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">IPK</th>
                                <th className="px-6 py-4 text-right">SKS</th>
                                <th className="px-6 py-4">Evaluasi</th>
                                <th className="px-6 py-4">Yudisium</th>
                                {tabFilter === 'Peringatan' && <th className="px-6 py-4">Alasan</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredList.length > 0 ? (
                                filteredList.map(student => (
                                    <tr
                                        key={student.npm}
                                        onClick={() => router.push(`/kaprodi/mahasiswa/${student.npm}`)}
                                        className="bg-white hover:bg-blue-50 cursor-pointer transition-colors group"
                                    >
                                        <td className="px-6 py-4 max-w-[200px]">
                                            <div className="font-bold text-gray-900 group-hover:text-[#5AA0FF] truncate" title={student.name}>{student.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-mono text-xs text-gray-400">{student.npm}</div>
                                        </td>
                                        <td className="px-6 py-4">{student.batch}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium border
                                                ${student.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}
                                            `}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-gray-800">{student.gpa.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-mono text-gray-600">{student.credits}</td>
                                        <td className="px-6 py-4">
                                            {student.evaluationStatus === 'Aman' ? (
                                                <span className="text-emerald-600 font-bold text-xs flex items-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></div>
                                                    Aman
                                                </span>
                                            ) : (
                                                <span className="text-red-600 font-bold text-xs flex items-center bg-red-50 px-2 py-1 rounded w-fit">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                    Peringatan
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-semibold
                                                ${student.yudisiumStatus === 'Disetujui' ? 'text-emerald-600' :
                                                    student.yudisiumStatus === 'Ditolak' ? 'text-red-600' :
                                                        student.yudisiumStatus === 'Diajukan' ? 'text-blue-600' : 'text-gray-400'}
                                            `}>
                                                {student.yudisiumStatus}
                                            </span>
                                        </td>
                                        {tabFilter === 'Peringatan' && (
                                            <td className="px-6 py-4 text-xs text-red-700 max-w-xs truncate">
                                                {student.riskReasons?.join(', ')}
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={tabFilter === 'Peringatan' ? 9 : 8} className="px-6 py-12 text-center text-gray-400 italic">
                                        Data tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Dummy) */}
                <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30 text-xs text-gray-500">
                    <span>Menampilkan {filteredList.length} mahasiswa</span>
                    <div className="flex gap-1">
                        <button className="px-2 py-1 border rounded disabled:opacity-50" disabled>Previous</button>
                        <button className="px-2 py-1 bg-[#5AA0FF] text-white rounded font-bold">1</button>
                        <button className="px-2 py-1 border rounded hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
