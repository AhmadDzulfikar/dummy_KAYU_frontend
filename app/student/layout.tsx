'use client';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { Bell, Menu, User } from './components/Icons';

import { usePathname } from 'next/navigation';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const pathname = usePathname();

    // Determine Status based on path
    const isWarning = pathname.includes('warning');
    const isEligible = pathname.includes('aman-eligible') || (pathname.includes('dashboard') && !pathname.includes('aman-belum') && !isWarning);
    // Note: 'dashboard' is the default for eligible, so we check exclusions.

    // Config
    const evaluationStatus = isWarning ? 'WARNING' : 'SAFE';
    const evaluationColor = isWarning ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700';

    const yudisiumStatus = isEligible ? 'Eligible' : 'Not eligible';
    const yudisiumColor = isEligible ? 'text-green-600 font-medium' : 'text-gray-500';

    // Notifications
    const notifications = isWarning ? [
        { title: 'Academic Warning Status', desc: 'You are in Academic Warning status. Please meet your advisor.', time: '1 hour ago', unread: true },
        { title: 'IPS Below Threshold', desc: 'IPS below threshold detected (2.10).', time: '2 hours ago', unread: true },
        { title: 'Credit Deficiency', desc: 'Odd semester passed credits below 11 SKS.', time: '5 hours ago', unread: false },
    ] : [
        { title: 'Academic Schedule Update', desc: 'IRS filling period for Even Semester 2025/2026 has been extended.', time: '2 hours ago', unread: true },
        { title: 'System Maintenance', desc: 'Scheduled maintenance on Sunday 02:00 AM.', time: '1 day ago', unread: false },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Sidebar Component */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 md:ml-64`}>

                {/* Content Wrapper */}
                <div className="flex-1 flex flex-col min-h-screen">
                    {/* Header */}
                    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 md:px-8 flex items-center justify-between">

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Student Dashboard</h1>
                                <div className="flex items-center text-xs md:text-sm text-gray-500 mt-0.5 space-x-2">
                                    <span className="font-medium text-gray-600">Term {isWarning ? '4' : '3'}</span>
                                    <span className="hidden sm:inline text-gray-300">•</span>
                                    <span className="flex items-center">
                                        Evaluation: <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${evaluationColor}`}>{evaluationStatus}</span>
                                    </span>
                                    <span className="hidden sm:inline text-gray-300">•</span>
                                    <span className={`hidden sm:inline ${yudisiumColor}`}>Yudisium: {yudisiumStatus}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 md:gap-5">
                            <div className="relative">
                                <button
                                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                                    className={`relative p-2 rounded-full transition-colors ${notificationsOpen ? 'bg-blue-50 text-[#5AA0FF]' : 'text-gray-500 hover:bg-gray-100/80'}`}
                                >
                                    <Bell className="w-5 h-5" />
                                    {notifications.some(n => n.unread) && (
                                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                                    )}
                                </button>

                                {notificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                        <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
                                            <h3 className="font-bold text-sm text-gray-800">Notifications</h3>
                                            <span className="text-[10px] text-[#5AA0FF] font-medium cursor-pointer hover:underline">Mark read</span>
                                        </div>
                                        <div className="max-h-[300px] overflow-y-auto">
                                            {notifications.map((n, i) => (
                                                <div key={i} className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0 relative">
                                                    {n.unread && <div className="absolute left-2 top-4 w-1.5 h-1.5 bg-[#5AA0FF] rounded-full"></div>}
                                                    <p className="text-xs font-semibold text-gray-800 mb-1">{n.title}</p>
                                                    <p className="text-[10px] text-gray-500 leading-snug">{n.desc}</p>
                                                    <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-4 py-2 border-t border-gray-50 text-center">
                                            <button className="text-xs text-gray-500 hover:text-[#5AA0FF] font-medium transition-colors">View all</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pl-3 border-l border-gray-100">
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="text-sm font-semibold text-gray-800">Rizky Pratama</span>
                                    <span className="text-[10px] text-gray-500 font-mono">2006123456</span>
                                </div>
                                <div className="w-9 h-9 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-full flex items-center justify-center border border-white shadow-sm ring-1 ring-gray-50">
                                    <User className="w-5 h-5 text-[#5AA0FF]" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
