'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PROGRAMS = ['Ilmu Komputer', 'Sistem Informasi', 'Kecerdasan Artifisial'];

export default function PilihProdiManager() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);

    const handleContinue = () => {
        if (selected) {
            localStorage.setItem('manajerActiveProdi', selected);
            // Default landing page
            window.location.href = '/manajer-akademik/mahasiswa';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
            <div className="w-full max-w-4xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pilih Program Studi</h1>
                    <p className="text-gray-500 text-lg">Silakan pilih konteks program studi untuk dikelola.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
                    {PROGRAMS.map((prog) => (
                        <button
                            key={prog}
                            onClick={() => setSelected(prog)}
                            className={`relative group p-6 rounded-2xl border-2 text-left transition-all duration-200 ease-in-out h-full flex flex-col justify-between bg-white
                                ${selected === prog
                                    ? 'border-[#5AA0FF] shadow-lg ring-2 ring-[#5AA0FF]/20 translate-y-[-4px]'
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:translate-y-[-2px]'
                                }
                            `}
                        >
                            <div>
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-colors
                                    ${selected === prog ? 'bg-[#5AA0FF] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}
                                `}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                </div>
                                <h3 className={`text-lg font-bold mb-2 ${selected === prog ? 'text-[#5AA0FF]' : 'text-gray-900'}`}>{prog}</h3>
                            </div>

                            {selected === prog && (
                                <div className="mt-4 flex justify-end">
                                    <svg className="w-6 h-6 text-[#5AA0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="pt-8 flex justify-center">
                    <button
                        onClick={handleContinue}
                        disabled={!selected}
                        className={`px-12 py-4 rounded-xl font-bold text-white shadow-xl transition-all duration-200
                            ${selected
                                ? 'bg-[#5AA0FF] hover:bg-blue-600 hover:translate-y-[-2px] hover:shadow-blue-500/30'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }
                        `}
                    >
                        Masuk ke Dasbor
                    </button>
                </div>
            </div>
        </div>
    );
}
