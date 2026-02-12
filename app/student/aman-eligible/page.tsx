import React from 'react';
import Link from 'next/link';

export default function AmanEligiblePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans text-gray-800">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-2xl border border-gray-100 flex flex-col items-center">

                <div className="mb-6 p-4 rounded-full bg-green-100/50 text-green-600">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Status Akademik
                </h1>
                <div className="h-1.5 w-24 bg-green-500 rounded-full mt-2 mb-8"></div>

                <div className="bg-green-50/50 border border-green-100 rounded-xl p-8 mb-8 w-full">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-green-600 leading-tight text-center">
                        Aman + Eligible Yudisium
                    </h2>
                </div>

                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Selamat! Kondisi akademik Anda aman dan telah memenuhi semua persyaratan untuk yudisium.
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
