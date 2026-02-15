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
        grade: '',
        category: 'MBKM'
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (formData.credits <= 0) {
            setError("SKS harus lebih besar dari 0.");
            return;
        }
        if (!['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'E'].includes(formData.grade.toUpperCase())) { // Broaden validation
            setError("Nilai Huruf tidak valid. Gunakan A/B/C/D/E.");
            return;
        }
        if (!formData.npm || !formData.activityName) {
            setError("Mohon lengkapi semua field.");
            return;
        }

        const newTransfer: CreditTransfer = {
            id: Date.now(),
            npm: formData.npm,
            studentName: 'Mahasiswa (Dummy)', // In real app, fetch name
            activityName: formData.activityName,
            credits: Number(formData.credits),
            grade: formData.grade.toUpperCase(),
            category: formData.category as any,
            date: new Date().toISOString().split('T')[0]
        };

        setTransfers([newTransfer, ...transfers]);

        // Reset
        setFormData({
            npm: '',
            activityName: '',
            credits: 0,
            grade: '',
            category: 'MBKM'
        });
        alert("Berhasil menambahkan transfer kredit ke draft.");
    };

    const handleDelete = (id: number) => {
        if (confirm('Hapus item ini?')) {
            setTransfers(transfers.filter(t => t.id !== id));
        }
    };

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
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nilai Huruf</label>
                                    <input
                                        name="grade"
                                        type="text"
                                        placeholder="A/B/C..."
                                        className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#5AA0FF] outline-none text-sm transition-all text-center uppercase"
                                        maxLength={2}
                                        value={formData.grade}
                                        onChange={handleInputChange}
                                    />
                                </div>
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
                                    <option value="Pertukaran">Pertukaran Pelajar</option>
                                    <option value="Kompetisi">Kompetisi</option>
                                    <option value="Sertifikasi">Sertifikasi</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
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
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <h2 className="font-bold text-gray-900">Draft Transfer Kredit</h2>
                            <span className="text-xs bg-white border px-2 py-1 rounded text-gray-500">{transfers.length} item</span>
                        </div>

                        <div className="overflow-x-auto min-h-[300px]">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-semibold border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4">Tanggal</th>
                                        <th className="px-6 py-4">Mahasiswa</th>
                                        <th className="px-6 py-4">Kegiatan</th>
                                        <th className="px-6 py-4">Nilai</th>
                                        <th className="px-6 py-4 text-right">SKS</th>
                                        <th className="px-6 py-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {transfers.length > 0 ? (
                                        transfers.map(t => (
                                            <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-gray-500 text-xs font-mono">{t.date}</td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-gray-900">{t.studentName}</div>
                                                    <div className="text-xs font-mono text-gray-400">{t.npm}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-900">{t.activityName}</div>
                                                    <span className="inline-block mt-1 text-[10px] uppercase font-bold text-gray-400 border px-1.5 rounded">{t.category}</span>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-gray-800">{t.grade}</td>
                                                <td className="px-6 py-4 text-right font-mono text-gray-600">{t.credits}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => handleDelete(t.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                                                Belum ada data transfer kredit.
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
