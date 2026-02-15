'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
    AlertCircle,
    CheckCircle,
    Search,
    BookOpen,
    ArrowRightLeft,
    Check
} from '../components/Icons';

export default function StudentDashboardWarning() {
    const [activeTab, setActiveTab] = useState<'required' | 'taken'>('required');

    // Dummy Data (WARNING + Not Eligible)
    const summaryData = [
        { label: 'SKS Reguler', value: '42', sub: 'Hanya SKS Mata Kuliah' },
        { label: 'Selesai', value: '16/40', sub: 'Mata Kuliah Wajib' },
        { label: 'IPK', value: '2.85', sub: 'Skala 4.0' },
        { label: 'SKS Transfer', value: '6', sub: 'Dihitung terpisah', highlight: true },
    ];

    const maxCreditsRules = [
        { gpa: '> 3.5', credit: 24, label: 'Sangat Baik' },
        { gpa: '> 3.0 - 3.5', credit: 21, label: 'Sangat Baik' },
        { gpa: '> 2.5 - 3.0', credit: 18, active: true, label: 'Baik' }, // 2.85 falls here
        { gpa: '> 2.0 - 2.5', credit: 15, label: 'Cukup' },
        { gpa: '≤ 2.0', credit: 12, label: 'Kurang' },
    ];

    const triggeredReasons = [
        "SKS lulus semester ganjil: 9 SKS (di bawah 11 SKS)",
        "IPS: 2.10 (di bawah 2.30)",
        "IPK turun signifikan dari 3.00 menjadi 2.10",
        "Total SKS di bawah target semester genap"
    ];

    const requiredCoursesNotTaken = [
        { code: 'CSGE602022', name: 'Software Engineering', sks: 4 },
        { code: 'CSGE602055', name: 'Operating Systems', sks: 4 },
        { code: 'CSGE603331', name: 'Information Retrieval', sks: 3 },
        { code: 'CSGE604123', name: 'Machine Learning', sks: 3 },
        { code: 'CSGE602011', name: 'Computer Networks', sks: 4 },
        { code: 'CSGE602005', name: 'Database Systems', sks: 4 },
        { code: 'CSGE602010', name: 'Algorithm Strategies', sks: 4 },
        { code: 'CSGE602088', name: 'Advanced Programming', sks: 4 },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">

            {/* 1. Header & Status (Normally in Layout, but emphasized here if needed) */}
            {/* Assuming layout provides "Student Dashboard", ensuring specific status text is visible */}

            {/* 2. Quick Academic Summary */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryData.map((item, idx) => (
                    <div key={idx} className={`bg-white p-6 rounded-2xl shadow-sm border ${item.highlight ? 'border-blue-100 bg-blue-50/30' : 'border-gray-100'} flex flex-col items-center text-center hover:shadow-md transition-shadow group relative overflow-hidden`}>
                        {item.highlight && <div className="absolute top-0 right-0 w-8 h-8 bg-blue-100 rounded-bl-2xl"></div>}
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{item.label}</span>
                        <span className={`text-3xl font-extrabold tracking-tight my-1 group-hover:text-[#5AA0FF] transition-colors ${item.highlight ? 'text-blue-900' : 'text-gray-900'}`}>{item.value}</span>
                        <span className="text-xs text-gray-500 font-medium">{item.sub}</span>
                    </div>
                ))}
            </section>

            {/* 3. WARNING Alert Banner */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0 border border-amber-200">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-amber-900">Peringatan Akademik: Perlu Tindakan</h3>
                        <p className="text-amber-800/80 text-sm mt-1 max-w-xl">
                            Beberapa kriteria evaluasi telah terpicu. Mohon tinjau status Anda dan konsultasikan dengan Dosen PA segera.
                        </p>
                        <p className="text-xs text-amber-600 mt-2 font-medium">Anda mungkin akan menerima notifikasi pengingat.</p>
                    </div>
                </div>
                <button
                    onClick={() => document.getElementById('academic-evaluation')?.scrollIntoView({ behavior: 'smooth' })}
                    className="whitespace-nowrap bg-white text-amber-700 px-6 py-3 rounded-xl font-bold text-sm shadow-sm border border-amber-200 hover:bg-amber-50 active:scale-95 transition-all"
                >
                    Lihat Detail
                </button>
            </div>


            {/* 4. Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT COLUMN: Evaluation - lg:col-span-5 */}
                <div id="academic-evaluation" className="lg:col-span-5 space-y-8">
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Evaluasi Akademik</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Penilaian kinerja</p>
                            </div>
                            <div className="px-3 py-1 bg-amber-100 text-amber-700 font-bold rounded-full text-xs border border-amber-200 flex items-center shadow-sm">
                                <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                                PERINGATAN
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Key Indicators */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="block text-xs text-gray-500 font-semibold mb-1">IPK Saat Ini</span>
                                    <span className="text-xl font-bold text-gray-900">2.85</span>
                                </div>
                                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                                    <span className="block text-xs text-amber-700 font-semibold mb-1">IPS Terakhir</span>
                                    <span className="text-xl font-bold text-amber-700">2.10</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="block text-xs text-gray-500 font-semibold mb-1">Total SKS Reguler</span>
                                    <span className="text-xl font-bold text-gray-900">42</span>
                                </div>
                                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                    <span className="block text-xs text-[#5AA0FF] font-bold mb-1">Maksimal SKS</span>
                                    <span className="text-xl font-bold text-[#5AA0FF]">18</span>
                                </div>
                            </div>

                            {/* Triggered Reasons List */}
                            <div className="mb-6">
                                <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">Alasan Peringatan</h3>
                                <ul className="space-y-2">
                                    {triggeredReasons.map((reason, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm bg-amber-50 p-3 rounded-lg border border-amber-100 text-amber-900">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                                            <span className="text-xs font-medium leading-relaxed">{reason}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Rules Table */}
                            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden mt-6">
                                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-600 uppercase tracking-wide">
                                    Penentuan Batas SKS
                                </div>
                                <table className="w-full text-xs text-left">
                                    <tbody className="divide-y divide-gray-50">
                                        {maxCreditsRules.map((rule, i) => (
                                            <tr key={i} className={rule.active ? 'bg-blue-50/60' : ''}>
                                                <td className={`px-4 py-2 ${rule.active ? 'font-bold text-blue-700' : 'text-gray-500'}`}>{rule.gpa}</td>
                                                <td className={`px-4 py-2 text-right ${rule.active ? 'font-bold text-blue-700' : 'text-gray-500'}`}>{rule.credit} SKS</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* 6. CTA to Calc */}
                    <Link
                        href="/student/graduation-calculator/warning"
                        className="block w-full py-4 bg-white border border-gray-200 rounded-2xl shadow-sm text-center font-bold text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all"
                    >
                        Buka Kalkulator Yudisium
                    </Link>

                </div>

                {/* RIGHT COLUMN: Course Tracking - lg:col-span-7 */}
                <div className="lg:col-span-7 h-full">
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full min-h-[600px] overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Pelacakan Mata Kuliah</h2>
                                    <p className="text-sm text-gray-500 mt-1">Kelola rencana studi Anda dengan efisien.</p>
                                </div>
                                <div className="bg-gray-100 p-1 rounded-xl inline-flex shadow-inner">
                                    <button
                                        onClick={() => setActiveTab('required')}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'required' ? 'bg-white shadow-sm text-[#5AA0FF] ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Wajib Belum Diambil
                                        <span className="ml-2 bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold">24</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('taken')}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'taken' ? 'bg-white shadow-sm text-[#5AA0FF] ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Sudah Diambil
                                    </button>
                                </div>
                            </div>



                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari nama atau kode mata kuliah..."
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5AA0FF]/20 focus:border-[#5AA0FF] transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 bg-gray-50/30 p-2 overflow-y-auto custom-scrollbar">
                            {activeTab === 'required' ? (
                                <div className="space-y-3 p-4">
                                    {requiredCoursesNotTaken.map((course, idx) => (
                                        <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-[#5AA0FF]/40 hover:shadow-md transition-all group flex items-start justify-between cursor-pointer">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 font-bold text-xs mt-0.5">
                                                    {course.sks}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-base group-hover:text-[#5AA0FF] transition-colors">{course.name}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{course.code}</span>
                                                        <span className="text-xs text-red-500 font-medium px-2 py-0.5 bg-red-50 rounded-full">Belum Diambil</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* No Plan Course Button */}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-400 text-sm">
                                    Data dummy mata kuliah yang diambil tidak ditampilkan.
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>

        </div>
    );
}
