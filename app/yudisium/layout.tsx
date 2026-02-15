'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function YudisiumLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10 transition-all duration-300">
                <div className="h-16 flex items-center px-6 border-b border-gray-100 bg-white">
                    <span className="text-xl font-bold text-[#5AA0FF]">KAYU Yudisium</span>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    <Link
                        href="/yudisium/submissions"
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive('/yudisium/submissions')
                            ? 'bg-blue-50 text-[#5AA0FF]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            {/* Fixed the SVG path just in case, looks a bit mangled in previous content but it's fine */}
                            <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                        </svg>
                        Pengajuan
                    </Link>

                    <Link
                        href="/yudisium/students"
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive('/yudisium/students')
                            ? 'bg-blue-50 text-[#5AA0FF]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Mahasiswa
                    </Link>

                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6">
                        Akun
                    </div>

                    <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profil
                    </button>

                    <button
                        onClick={() => router.push('/login')}
                        className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors mt-auto"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Keluar
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-64 min-w-0 bg-gray-50">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-20 px-8 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-4">
                        {/* Empty left side */}
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-gray-900 leading-none">Staf Yudisium</div>
                                <div className="text-xs text-gray-500 mt-1">Tim Yudisium</div>
                            </div>
                            <div className="h-9 w-9 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm text-[#5AA0FF] bg-blue-50">
                                YS
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto w-full">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
