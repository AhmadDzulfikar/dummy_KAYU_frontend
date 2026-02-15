'use client';

import { useState } from 'react';
import { INITIAL_TRANSFERS, CreditTransfer } from '../data';

export default function TransferKreditManager() {
    const [transfers, setTransfers] = useState<CreditTransfer[]>(INITIAL_TRANSFERS);

    // Form State
    const [formData, setFormData] = useState({
        npm: '',
        activityName: '',
        credits: 0,
        category: 'MBKM'
    });
    const [error, setError] = useState<string | null>(null);

    // Filter UI
    const [filterSearch, setFilterSearch] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.credits || formData.credits <= 0) {
            setError("SKS wajib diisi dan harus lebih besar dari 0.");
            return;
        }
        if (!formData.npm.trim()) {
            setError("NPM Mahasiswa wajib diisi.");
            return;
        }
        if (!formData.activityName.trim()) {
            setError("Nama Kegiatan wajib diisi.");
            return;
        }

        const newTransfer: CreditTransfer = {
            id: Date.now(),
            npm: formData.npm,
            studentName: 'Mahasiswa (Dummy)',
            activityName: formData.activityName,
            credits: Number(formData.credits),
            category: formData.category as any,
            date: new Date().toISOString().split('T')[0]
        };

        setTransfers([newTransfer, ...transfers]);

        // Reset (removed grade)
        setFormData({
            npm: '',
            activityName: '',
            credits: 0,
            category: 'MBKM'
        });
        alert("Berhasil menambahkan transfer kredit ke draft.");
    };

    const handleDelete = (id: number) => {
        if (confirm('Hapus item ini?')) {
            setTransfers(transfers.filter(t => t.id !== id));
        }
    };

    // Client-side filtering for table
    const filteredTransfers = transfers.filter(t => {
        if (!filterSearch) return true;
        const q = filterSearch.toLowerCase();
        return t.studentName.toLowerCase().includes(q) || t.npm.includes(q);
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Kelola Transfer Kredit</h1>
                <p className="text-gray-500 mt-1">Kelola kredit kegiatan luar kampus agar diakui dalam SKS kelulusan.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
                        <h2 className="font-bold text-gray-900 mb-6 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-[#5AA0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Tambah Kredit Baru
                        </h2>

                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">NPM Mahasiswa</label>
                                <input
                                    name="npm"
                                    type="text"
                                    placeholder="Contoh: 2108100..."
                                    className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#5AA0FF] outline-none text-sm transition-all"
                                    value={formData.npm}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Kegiatan</label>
                                <input
                                    name="activityName"
                                    type="text"
                                    placeholder="Contoh: GEMASTIK 2025"
                                    className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#5AA0FF] outline-none text-sm transition-all"
                                    value={formData.activityName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">SKS</label>
                                    <input
                                        name="credits"
                                        type="number"
                                        placeholder="0"
                                        className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#5AA0FF] outline-none text-sm transition-all text-right font-mono"
                                        value={formData.credits}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kategori</label>
                                    <select
                                        name="category"
                                        className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#5AA0FF] outline-none text-sm transition-all"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="MBKM">MBKM</option>
                                        <option value="Pertukaran">Pertukaran</option>
                                        <option value="Kompetisi">Kompetisi</option>
                                        <option value="Sertifikasi">Sertifikasi</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 animate-pulse">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#5AA0FF] text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-[0.98] mt-2"
                            >
                                Tambah ke Draft
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                                <h2 className="font-bold text-gray-900">Draft Transfer Kredit</h2>
                                <p className="text-xs text-gray-500 mt-1">Daftar kredit yang akan diproses.</p>
                            </div>

                            {/* SEARCH ON DRAFT LIST */}
                            <div className="relative w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder="Cari nama atau NPM..."
                                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#5AA0FF] transition-all"
                                    value={filterSearch}
                                    onChange={(e) => setFilterSearch(e.target.value)}
                                />
                                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                        </div>

                        <div className="overflow-x-auto min-h-[300px]">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-semibold border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4">Tanggal</th>
                                        <th className="px-6 py-4">Mahasiswa</th>
                                        <th className="px-6 py-4">Kegiatan</th>
                                        {/* Removed Grade Column */}
                                        <th className="px-6 py-4 text-right">SKS</th>
                                        <th className="px-6 py-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredTransfers.length > 0 ? (
                                        filteredTransfers.map(t => (
                                            <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-gray-500 text-xs font-mono">{t.date}</td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-gray-900">{t.studentName}</div>
                                                    <div className="text-xs font-mono text-gray-400">{t.npm}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-900 font-medium">{t.activityName}</div>
                                                    <span className="inline-block mt-1 text-[10px] uppercase font-bold text-gray-500 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">{t.category}</span>
                                                </td>
                                                {/* Removed Grade Cell */}
                                                <td className="px-6 py-4 text-right font-mono font-bold text-gray-800">{t.credits}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => handleDelete(t.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors bg-white hover:bg-red-50 p-2 rounded-lg"
                                                        title="Hapus"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                                                {transfers.length === 0 ? "Belum ada data transfer kredit." : "Data tidak ditemukan."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
