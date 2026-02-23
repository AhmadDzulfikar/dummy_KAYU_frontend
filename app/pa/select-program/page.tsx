'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// All program studi yang harus ditampilkan
const ALL_PROGRAMS = [
    { id: 'S1-IK', name: 'Ilmu Komputer', jenjang: 'Sarjana', key: 'Computer Science' },
    { id: 'S1-SI', name: 'Sistem Informasi', jenjang: 'Sarjana', key: 'Information Systems' },
    { id: 'S1-KA', name: 'Kecerdasan Artifisial', jenjang: 'Sarjana', key: 'Artificial Intelligence' },
    { id: 'S1-IK-KI', name: 'Ilmu Komputer KI', jenjang: 'Sarjana', key: 'Computer Science KI' },
    { id: 'S1-SI-KI', name: 'Sistem Informasi KI', jenjang: 'Sarjana', key: 'Information Systems KI' },
    { id: 'S2-IK', name: 'Ilmu Komputer', jenjang: 'Magister', key: 'Master Computer Science' },
    { id: 'S2-TI', name: 'Teknologi Informasi', jenjang: 'Magister', key: 'Master Information Technology' },
    { id: 'S3-IK', name: 'Ilmu Komputer', jenjang: 'Doktor', key: 'Doctor Computer Science' },
];

// Jenjang badge color mapping
const jenjangColors: Record<string, string> = {
    'Sarjana': 'bg-blue-100 text-blue-700',
    'Magister': 'bg-purple-100 text-purple-700',
    'Doktor': 'bg-amber-100 text-amber-700',
};

export default function SelectProgramPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);

    const handleContinue = () => {
        if (selected) {
            localStorage.setItem('activeProgram', selected);
            router.push('/pa/dashboard');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
            <div className="w-full max-w-3xl text-center space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pilih Program Studi</h1>
                    <p className="text-gray-500 text-lg">Pilih konteks program studi untuk melihat data mahasiswa bimbingan Anda.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {ALL_PROGRAMS.map((prog) => (
                        <button
                            key={prog.id}
                            onClick={() => setSelected(prog.key)}
                            className={`relative group p-5 rounded-2xl border-2 text-left transition-all duration-200 ease-in-out
                ${selected === prog.key
                                    ? 'border-[#5AA0FF] bg-blue-50/50 shadow-md ring-2 ring-[#5AA0FF]/20'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                }
              `}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center 
                      ${selected === prog.key ? 'bg-[#5AA0FF] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}
                    `}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${jenjangColors[prog.jenjang] || 'bg-gray-100 text-gray-600'}`}>
                                        {prog.jenjang}
                                    </span>
                                </div>
                                {selected === prog.key && (
                                    <svg className="w-6 h-6 text-[#5AA0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>

                            <h3 className={`text-lg font-bold ${selected === prog.key ? 'text-[#5AA0FF]' : 'text-gray-900'}`}>
                                {prog.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {prog.jenjang} {prog.name}
                            </p>
                        </button>
                    ))}
                </div>

                <div className="pt-8">
                    <button
                        onClick={handleContinue}
                        disabled={!selected}
                        className={`px-8 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-200
              ${selected
                                ? 'bg-[#5AA0FF] hover:bg-blue-600 hover:translate-y-[-2px] hover:shadow-blue-500/30'
                                : 'bg-gray-300 cursor-not-allowed'
                            }
            `}
                    >
                        Lanjut ke Dasbor
                    </button>
                </div>
            </div>
        </div>
    );
}
