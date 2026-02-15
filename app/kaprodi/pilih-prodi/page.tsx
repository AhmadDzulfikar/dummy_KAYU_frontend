'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const PROGRAMS = ['Ilmu Komputer', 'Sistem Informasi', 'Kecerdasan Artifisial'];

export default function PilihProdiPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);

    // Only allow access if role is multi
    useEffect(() => {
        const role = localStorage.getItem('kaprodiRole');
        if (role === 'single') {
            router.push('/kaprodi/dasbor');
        }
    }, [router]);

    const handleContinue = () => {
        if (selected) {
            localStorage.setItem('kaprodiActiveProdi', selected);
            // Force reload/navigation to update layout context
            window.location.href = '/kaprodi/dasbor';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-4xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pilih Program Studi</h1>
                    <p className="text-gray-500 text-lg">Pilih prodi untuk melihat ringkasan dan data mahasiswa.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
                    {PROGRAMS.map((prog) => (
                        <button
                            key={prog}
                            onClick={() => setSelected(prog)}
                            className={`relative group p-6 rounded-2xl border-2 text-left transition-all duration-200 ease-in-out h-full flex flex-col justify-between
                ${selected === prog
                                    ? 'border-[#5AA0FF] bg-blue-50/50 shadow-lg ring-2 ring-[#5AA0FF]/20 translate-y-[-4px]'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:translate-y-[-2px]'
                                }
              `}
                        >
                            <div>
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-colors
                  ${selected === prog ? 'bg-[#5AA0FF] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}
                `}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>

                                <h3 className={`text-lg font-bold mb-2 ${selected === prog ? 'text-[#5AA0FF]' : 'text-gray-900'}`}>
                                    {prog}
                                </h3>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Akses data akademik, evaluasi, dan yudisium untuk mahasiswa {prog}.
                                </p>
                            </div>

                            {selected === prog && (
                                <div className="mt-4 flex justify-end">
                                    <svg className="w-6 h-6 text-[#5AA0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="pt-8 flex justify-center">
                    <button
                        onClick={handleContinue}
                        disabled={!selected}
                        className={`px-10 py-4 rounded-xl font-bold text-white shadow-xl transition-all duration-200
              ${selected
                                ? 'bg-[#5AA0FF] hover:bg-blue-600 hover:translate-y-[-2px] hover:shadow-blue-500/30'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }
            `}
                    >
                        Lanjutkan
                    </button>
                </div>
            </div>
        </div>
    );
}
