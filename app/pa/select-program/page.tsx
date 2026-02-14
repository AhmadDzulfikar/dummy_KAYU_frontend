'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SelectProgramPage() {
    const router = useRouter();
    const [programs, setPrograms] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        // Load programs from localStorage
        const stored = localStorage.getItem('userPrograms');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setPrograms(parsed);
                } else {
                    // Fallback for direct access without login
                    setPrograms(['Computer Science', 'Information Systems']);
                }
            } catch (e) {
                setPrograms(['Computer Science', 'Information Systems']);
            }
        } else {
            // Fallback
            setPrograms(['Computer Science', 'Information Systems']);
        }
    }, []);

    const handleContinue = () => {
        if (selected) {
            localStorage.setItem('activeProgram', selected);
            // Trigger a storage event to update layout (optional, but router push will likely cause re-render of layout due to pathname change)
            router.push('/pa/dashboard');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
            <div className="w-full max-w-2xl text-center space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Select Program</h1>
                    <p className="text-gray-500 text-lg">Choose a program context to view your advisees.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {programs.map((prog) => (
                        <button
                            key={prog}
                            onClick={() => setSelected(prog)}
                            className={`relative group p-6 rounded-2xl border-2 text-left transition-all duration-200 ease-in-out
                ${selected === prog
                                    ? 'border-[#5AA0FF] bg-blue-50/50 shadow-md ring-2 ring-[#5AA0FF]/20'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                }
              `}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center 
                  ${selected === prog ? 'bg-[#5AA0FF] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}
                `}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                {selected === prog && (
                                    <svg className="w-6 h-6 text-[#5AA0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>

                            <h3 className={`text-lg font-bold ${selected === prog ? 'text-[#5AA0FF]' : 'text-gray-900'}`}>
                                {prog}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                View students and academic data for {prog}.
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
                        Continue to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
