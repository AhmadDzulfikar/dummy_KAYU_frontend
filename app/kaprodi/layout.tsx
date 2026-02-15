'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function KaprodiLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const [activeProdi, setActiveProdi] = useState<string | null>(null);
    const [role, setRole] = useState<'single' | 'multi'>('multi'); // Default mock role

    // Check auth/role on mount
    useEffect(() => {
        // Mock: Retrieve role and active prodi from storage
        const storedRole = localStorage.getItem('kaprodiRole') as 'single' | 'multi';
        const storedProdi = localStorage.getItem('kaprodiActiveProdi');

        if (storedRole) setRole(storedRole);

        // If single role, force set prodi
        if (storedRole === 'single') {
            const forcedProdi = 'Ilmu Komputer';
            localStorage.setItem('kaprodiActiveProdi', forcedProdi);
            setActiveProdi(forcedProdi);
        } else {
            // Multi role
            if (storedProdi) {
                setActiveProdi(storedProdi);
            } else {
                // If no prodi selected and not on selection page, redirect
                if (pathname !== '/kaprodi/pilih-prodi') {
                    router.push('/kaprodi/pilih-prodi');
                }
            }
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem('kaprodiActiveProdi');
        // In real app, clear auth tokens
        router.push('/');
    };

    // If on selection page or root, render simplified layout or children
    if (pathname === '/kaprodi/pilih-prodi') {
        return <>{children}</>;
    }

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <span className="text-xl font-bold text-[#5AA0FF]">KAYU KAPRODI</span>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    <Link
                        href="/kaprodi/dasbor"
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive('/kaprodi/dasbor')
                            ? 'bg-blue-50 text-[#5AA0FF]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Dasbor
                    </Link>

                    <Link
                        href="/kaprodi/mahasiswa"
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive('/kaprodi/mahasiswa')
                            ? 'bg-blue-50 text-[#5AA0FF]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Daftar Mahasiswa
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
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors mt-auto"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Keluar
                    </button>

                    {/* DEBUG: Toggle Role */}
                    <div className="px-3 mt-8 pt-4 border-t border-gray-100">
                        <p className="text-[10px] uppercase text-gray-400 font-bold mb-2">Debug Mode</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    localStorage.setItem('kaprodiRole', 'single');
                                    window.location.reload();
                                }}
                                className={`text-[10px] px-2 py-1 rounded border ${role === 'single' ? 'bg-gray-200 font-bold' : 'text-gray-500'}`}
                            >
                                Single
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.setItem('kaprodiRole', 'multi');
                                    localStorage.removeItem('kaprodiActiveProdi');
                                    window.location.href = '/kaprodi/pilih-prodi';
                                }}
                                className={`text-[10px] px-2 py-1 rounded border ${role === 'multi' ? 'bg-gray-200 font-bold' : 'text-gray-500'}`}
                            >
                                Multi
                            </button>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-64 min-w-0">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-20 px-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Program Indicator / Switcher */}
                        {role === 'multi' ? (
                            activeProdi ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Prodi Aktif:</span>
                                    <button
                                        onClick={() => router.push('/kaprodi/pilih-prodi')}
                                        className="flex items-center bg-blue-50 text-[#5AA0FF] px-3 py-1.5 rounded-lg text-sm font-bold border border-blue-100 hover:bg-blue-100 transition-colors"
                                    >
                                        {activeProdi}
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <span className="text-gray-400 italic text-sm">Belum memilih prodi...</span>
                            )
                        ) : (
                            <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-gray-200 cursor-default">
                                <span className="mr-2 text-gray-500 font-normal">Prodi:</span>
                                {activeProdi}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-gray-900 leading-none">Kaprodi Fasilkom</div>
                                <div className="text-xs text-gray-500 mt-1">Kepala Program Studi</div>
                            </div>
                            <div className="h-9 w-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                KP
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
