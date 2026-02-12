import React from 'react';
import Link from 'next/link';

export default function WarningBelumEligiblePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans text-gray-800">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-2xl border border-gray-100 flex flex-col items-center">

                <div className="mb-6 p-4 rounded-full bg-amber-100/50 text-amber-600">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Status Akademik
                </h1>
                <div className="h-1.5 w-24 bg-amber-500 rounded-full mt-2 mb-8"></div>

                <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-8 mb-8 w-full">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-amber-600 leading-tight text-center">
                        Warning + Belum Eligible Yudisium
                    </h2>
                </div>

                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Perhatian! Terdapat masalah pada kondisi akademik Anda dan belum memenuhi syarat yudisium. Segera hubungi pembimbing akademik.
                </p>

                <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-bold rounded-xl text-white bg-slate-800 hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
                >
                    &larr; Back to Login
                </Link>
            </div>
        </div>
    );
}
