'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [activeProdi, setActiveProdi] = useState<string | null>(null);

    // Context Check
    useEffect(() => {
        // Skip check if on selection page
        if (pathname === '/manajer-akademik/pilih-prodi') return;

        const stored = localStorage.getItem('manajerActiveProdi');
        if (!stored) {
            router.push('/manajer-akademik/pilih-prodi');
        } else {
            setActiveProdi(stored);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem('manajerActiveProdi');
        localStorage.removeItem('userRoles');
        router.push('/login');
    };

    if (pathname === '/manajer-akademik/pilih-prodi') {
        return <>{children}</>;
    }

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <span className="text-xl font-extrabold text-[#5AA0FF] tracking-tight">KAYU ADMIN</span>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    <Link
                        href="/manajer-akademik/mahasiswa"
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive('/manajer-akademik/mahasiswa')
                                ? 'bg-blue-50 text-[#5AA0FF]'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        Daftar Mahasiswa
                    </Link>

                    <Link
                        href="/manajer-akademik/transfer-kredit"
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive('/manajer-akademik/transfer-kredit')
                                ? 'bg-blue-50 text-[#5AA0FF]'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                        Transfer Kredit
                    </Link>

                    <Link
                        href="/manajer-akademik/calon-lulusan"
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive('/manajer-akademik/calon-lulusan')
                                ? 'bg-blue-50 text-[#5AA0FF]'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Calon Lulusan
                    </Link>

                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6">
                        Akun
                    </div>

                    <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        Profil
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors mt-auto"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Keluar
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-64 min-w-0">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-10 px-8 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {activeProdi && (
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 text-sm">Konteks Prodi:</span>
                                <div className="relative group">
                                    <button
                                        className="flex items-center bg-gray-50 hover:bg-gray-100 text-gray-900 px-3 py-1.5 rounded-lg text-sm font-bold border border-gray-200 transition-colors"
                                        onClick={() => router.push('/manajer-akademik/pilih-prodi')}
                                    >
                                        {activeProdi}
                                        <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                                        <div className="py-1">
                                            {['Ilmu Komputer', 'Sistem Informasi', 'Kecerdasan Artifisial'].map(p => (
                                                <button
                                                    key={p}
                                                    onClick={() => {
                                                        localStorage.setItem('manajerActiveProdi', p);
                                                        window.location.reload();
                                                    }}
                                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${activeProdi === p ? 'text-[#5AA0FF] font-bold' : 'text-gray-700'}`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-gray-900 leading-none">Manajer Akademik</div>
                            <div className="text-xs text-gray-500 mt-1">Staf Akademik</div>
                        </div>
                        <div className="h-9 w-9 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            MA
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
