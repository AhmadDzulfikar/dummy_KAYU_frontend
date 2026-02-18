'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MANAGER_STUDENTS, Student } from '../data';

export default function DaftarMahasiswaManager() {
    const router = useRouter();
    const [activeProdi, setActiveProdi] = useState<string>('');
    const [students, setStudents] = useState<Student[]>([]);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBatch, setFilterBatch] = useState('Semua'); // New Batch Filter
    const [sortBatch, setSortBatch] = useState<'asc' | 'desc'>('desc'); // Sort Batch
    const [page, setPage] = useState(1);

    useEffect(() => {
        const stored = localStorage.getItem('manajerActiveProdi');
        if (stored) {
            setActiveProdi(stored);
            setStudents(MANAGER_STUDENTS.filter(s => s.program === stored));
        }
    }, []);

    const filteredList = students.filter(s => {
        // Search Filter
        const matchesSearch = !searchTerm || (
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.npm.includes(searchTerm)
        );

        // Batch Filter
        const matchesBatch = filterBatch === 'Semua' || s.batch === parseInt(filterBatch);

        return matchesSearch && matchesBatch;
    }).sort((a, b) => {
        if (sortBatch === 'asc') return a.batch - b.batch;
        return b.batch - a.batch;
    });

    // Pagination Standard
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const paginated = filteredList.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);

    // Get unique batches for filter dropdown
    const availableBatches = Array.from(new Set(students.map(s => s.batch))).sort((a, b) => b - a);

    if (!activeProdi) return null;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Daftar Mahasiswa</h1>
                    <p className="text-gray-500 mt-1">Mengelola data mahasiswa untuk program studi <span className="font-bold text-gray-800">{activeProdi}</span>.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-72">
                            <input
                                type="text"
                                placeholder="Cari nama atau NPM..."
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5AA0FF] transition-all"
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                            />
                            <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>

                        <div className="relative w-full sm:w-48">
                            <select
                                value={filterBatch}
                                onChange={(e) => { setFilterBatch(e.target.value); setPage(1); }}
                                className="w-full pl-4 pr-8 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5AA0FF] appearance-none cursor-pointer"
                            >
                                <option value="Semua">Semua Angkatan</option>
                                {availableBatches.map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                            <svg className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    <div className="text-xs text-gray-500 font-medium whitespace-nowrap">
                        Total: {filteredList.length} Mahasiswa
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Nama</th>
                                <th className="px-6 py-4">NPM</th>
                                <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setSortBatch(current => current === 'asc' ? 'desc' : 'asc')}>
                                    <div className="flex items-center gap-2">
                                        Angkatan
                                        <svg className={`w-3 h-3 text-gray-400 transition-transform ${sortBatch === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">IPK</th>
                                <th className="px-6 py-4 text-right">IPS</th>
                                <th className="px-6 py-4 text-right">SKS</th>
                                <th className="px-6 py-4">Evaluasi</th>
                                <th className="px-6 py-4">Yudisium</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginated.length > 0 ? (
                                paginated.map(student => (
                                    <tr
                                        key={student.npm}
                                        onClick={() => router.push(`/manajer-akademik/mahasiswa/${student.npm}`)}
                                        className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                                    >
                                        <td className="px-6 py-4 max-w-[200px]">
                                            <div className="font-bold text-gray-900 group-hover:text-[#5AA0FF] transition-colors truncate" title={student.name}>{student.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-mono text-xs text-gray-500">{student.npm}</div>
                                        </td>
                                        <td className="px-6 py-4">{student.batch}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${student.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-gray-800">{student.gpa.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-mono text-gray-600">{student.ips.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-mono text-gray-600">{student.credits}</td>
                                        <td className="px-6 py-4">
                                            {student.evaluationStatus === 'Aman' ? (
                                                <span className="text-emerald-600 font-bold text-xs flex items-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></div>
                                                    Aman
                                                </span>
                                            ) : (
                                                <span className="text-red-600 font-bold text-xs flex items-center px-2 py-1 bg-red-50 rounded w-fit">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></div>
                                                    Peringatan
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-medium 
                                                ${student.yudisiumStatus === 'Disetujui' ? 'text-emerald-600' :
                                                    student.yudisiumStatus === 'Ditolak' ? 'text-red-600' :
                                                        student.yudisiumStatus === 'Diajukan' ? 'text-blue-600' : 'text-gray-400'}
                                            `}>
                                                {student.yudisiumStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="px-6 py-12 text-center text-gray-400 italic">
                                        Data tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination */}
                {paginated.length > 0 && (
                    <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                            <span>Menampilkan {paginated.length} dari {filteredList.length} mahasiswa</span>
                            <div className="flex items-center gap-2">
                                <span>Baris per halaman:</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
                                    className="bg-white border border-gray-200 rounded px-2 py-1 cursor-pointer focus:outline-none focus:border-[#5AA0FF]"
                                >
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span>Halaman {page} dari {totalPages}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Sebelumnya
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Berikutnya
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
