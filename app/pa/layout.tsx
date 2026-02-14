'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function PALayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const [activeProgram, setActiveProgram] = useState<string | null>(null);

    // Load active program from storage for context display
    useEffect(() => {
        // Client-side check for login status logic could be here
        const prog = localStorage.getItem('activeProgram');
        setActiveProgram(prog);
    }, [pathname]);

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <span className="text-xl font-bold text-[#5AA0FF]">KAYU PA</span>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    <Link
                        href="/pa/dashboard"
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive('/pa/dashboard')
                            ? 'bg-blue-50 text-[#5AA0FF]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Dashboard
                    </Link>

                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6">
                        Account
                    </div>

                    <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Notifications
                    </button>

                    <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                    </button>

                    <button
                        onClick={() => router.push('/login')}
                        className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors mt-auto"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-64 min-w-0">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-20 px-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Program Indicator if active */}
                        {activeProgram ? (
                            <div className="flex items-center bg-blue-50 text-[#5AA0FF] px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">
                                <span className="mr-1.5 opacity-70">Program:</span>
                                {activeProgram}
                            </div>
                        ) : (
                            <div className="text-gray-400 text-sm italic">No Program Selected</div>
                        )}
                    </div>

                    <div className="flex items-center space-x-6">
                        {/* Notification Bell */}
                        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {/* Badge */}
                            <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-400 ring-2 ring-white" />
                        </button>

                        <div className="h-6 w-px bg-gray-200" />

                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-gray-900 leading-none">Dr. Ahmad</div>
                                <div className="text-xs text-gray-500 mt-1">Academic Advisor</div>
                            </div>
                            <div className="h-9 w-9 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
                                DA
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
