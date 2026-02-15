'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    User,
    LogOut,
    ChevronRight,
    Users,
    BookOpen,
    ClipboardCheck,
    Briefcase,
    Award
} from '../student/components/Icons'; // Reusing icons from student components

// Define Role Interface
interface Role {
    id: string;
    name: string;
    description: string;
    path: string;
    icon: React.ElementType;
}

// All available roles configuration
const ALL_ROLES: Record<string, Role> = {
    'Academic Advisor': {
        id: 'academic-advisor',
        name: 'Dosen Pembimbing Akademik',
        description: 'Pantau mahasiswa bimbingan, status evaluasi akademik, dan peringatan.',
        path: '/pa/dashboard',
        icon: Users
    },
    'Yudisium Team': {
        id: 'yudisium-team',
        name: 'Tim Yudisium',
        description: 'Tinjau pengajuan yudisium dan kelola verifikasi kelulusan.',
        path: '/yudisium/dashboard',
        icon: Award
    },
    'Academic Manager': {
        id: 'academic-manager',
        name: 'Manajer Akademik',
        description: 'Awasi aturan evaluasi akademik dan pantau status tingkat fakultas.',
        path: '/manajer-akademik/pilih-prodi',
        icon: BookOpen
    },
    'Secretariat': {
        id: 'secretariat',
        name: 'Sekretariat',
        description: 'Kelola data administrasi dan dukung proses operasional.',
        path: '/secretariat/dashboard',
        icon: Briefcase
    },
    'Head of Program': {
        id: 'head-of-program',
        name: 'Ketua Program Studi (Kaprodi)',
        description: 'Lihat wawasan tingkat program studi dan dasbor pengawasan.',
        path: '/kaprodi/dasbor',
        icon: ClipboardCheck
    }
};

export default function SelectRolePage() {
    const router = useRouter();
    const [userRoles, setUserRoles] = useState<string[]>([]);
    const [selectedDefault, setSelectedDefault] = useState(false);
    const [lastUsedRole, setLastUsedRole] = useState<string | null>(null);

    // Load user roles from dummy session (localStorage) on mount
    useEffect(() => {
        // In a real app, this would come from a secure session or API
        const storedRoles = localStorage.getItem('userRoles');
        const storedLastRole = localStorage.getItem('lastUsedRole');

        if (storedRoles) {
            try {
                setUserRoles(JSON.parse(storedRoles));
            } catch (e) {
                console.error("Failed to parse roles", e);
                router.push('/login');
            }
        } else {
            // No roles found, redirect to login
            router.push('/login');
        }

        if (storedLastRole) {
            setLastUsedRole(storedLastRole);
        }
    }, [router]);

    const handleRoleSelect = (roleName: string) => {
        const role = ALL_ROLES[roleName];
        if (!role) return;

        // Save last used
        localStorage.setItem('lastUsedRole', roleName);

        // Save default if checked (Dummy implementation)
        if (selectedDefault) {
            localStorage.setItem('defaultRole', roleName);
            // In real app, this would update user preferences via API
        }

        // Redirect
        router.push(role.path);
    };

    const handleLogout = () => {
        localStorage.removeItem('userRoles');
        localStorage.removeItem('defaultRole');
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">

            {/* Top Bar */}
            <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-12 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#5AA0FF] rounded-lg flex items-center justify-center text-white font-bold text-xs">KY</div>
                    <span className="font-bold text-gray-800 tracking-tight hidden sm:block">KALKULATOR YUDISIUM</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-900 leading-none">Pengguna Multi-Peran</p>
                        <p className="text-xs text-gray-500 mt-1">Masuk sebagai</p>
                    </div>
                    <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Keluar
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                <div className="max-w-4xl w-full space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Pilih Peran Anda</h1>
                        <p className="text-gray-500 text-lg">Akun Anda memiliki beberapa peran. Pilih salah satu untuk melanjutkan.</p>
                    </div>

                    {/* Role Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        {userRoles.map((roleName) => {
                            const role = ALL_ROLES[roleName];
                            if (!role) return null;
                            const isLastUsed = roleName === lastUsedRole;

                            return (
                                <button
                                    key={role.id}
                                    onClick={() => handleRoleSelect(roleName)}
                                    className="relative group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#5AA0FF]/30 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col h-full"
                                >
                                    {isLastUsed && (
                                        <span className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                            Terakhir Diakses
                                        </span>
                                    )}

                                    <div className="mb-4 w-12 h-12 rounded-xl bg-blue-50 text-[#5AA0FF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <role.icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#5AA0FF] transition-colors">
                                        {role.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                                        {role.description}
                                    </p>

                                    <div className="flex items-center text-[#5AA0FF] font-bold text-sm">
                                        <span className="group-hover:mr-2 transition-all">Masuk Dasbor</span>
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Option Checkbox */}
                    <div className="flex justify-center items-center mt-8">
                        <label className="flex items-center space-x-3 cursor-pointer group text-gray-500 hover:text-gray-700 transition-colors">
                            
                        </label>
                    </div>

                </div>
            </main>

            {/* Simple Footer */}
            <footer className="py-6 text-center text-xs text-gray-400">
                Versi Sistem 1.0.0 • Universitas Indonesia
            </footer>
        </div>
    );
}
