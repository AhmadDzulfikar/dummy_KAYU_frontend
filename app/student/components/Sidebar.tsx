'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    BookOpen,
    ClipboardCheck,
    Calculator,
    ArrowRightLeft,
    Bell,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Map
} from './Icons';

interface SidebarProps {
    isOpen: boolean; // Mobile toggle state
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    // Toggle collapse on desktop
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/student/dashboard' },
        { name: 'Course Tracking', icon: BookOpen, href: '/student/course-tracking' },
        { name: 'Academic Evaluation', icon: ClipboardCheck, href: '/student/aman-belum-eligible' }, // Active for this demo
        { name: 'Graduation Calculator', icon: Calculator, href: '/student/graduation-calculator' },
        { name: 'Credit Transfer', icon: ArrowRightLeft, href: '/student/credit-transfer' },
        { name: 'External Courses', icon: Map, href: '/student/external-courses' },
    ];

    const secondaryItems = [
        { name: 'Notifications', icon: Bell, href: '/student/notifications' },
        { name: 'Profile', icon: User, href: '/student/profile' },
        { name: 'Logout', icon: LogOut, href: '/login' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300
                    md:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    ${collapsed ? 'w-20' : 'w-64'}
                `}
            >
                {/* Logo Area */}
                <div className={`flex items-center h-16 px-6 border-b border-gray-100 ${collapsed ? 'justify-center' : 'justify-start'}`}>
                    {!collapsed ? (
                        <span className="font-bold text-sm text-gray-800 tracking-tight leading-tight">
                            KALKULATOR<br />YUDISIUM
                        </span>
                    ) : (
                        <div className="w-8 h-8 bg-[#5AA0FF] rounded-lg flex items-center justify-center text-white font-bold text-xs">KY</div>
                    )}

                    {/* Desktop Collapse Button */}
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:flex absolute right-4 p-1 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                    >
                        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </button>
                    {/* Mobile Close Button (Implicit via overlay, but could add X here) */}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 flex flex-col justify-between">
                    <ul className="space-y-1 px-3">
                        {[
                            { name: 'Dashboard', icon: LayoutDashboard, href: '/student/aman-belum-eligible' },
                            { name: 'Graduation Calculator', icon: Calculator, href: '/student/graduation-calculator' },
                            { name: 'Credit Transfer List', icon: ArrowRightLeft, href: '/student/credit-transfer' },
                        ].map((item) => {
                            // Active logic: 
                            // If plain Dashboard, active on /dashboard or /aman-belum-eligible
                            // Otherwise strict match
                            const isActive = item.name === 'Dashboard'
                                ? (pathname === '/student/dashboard' || pathname.includes('aman-belum-eligible'))
                                : pathname === item.href;

                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`
                                            flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group
                                            ${isActive
                                                ? 'bg-blue-50 text-[#5AA0FF]'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                            ${collapsed ? 'justify-center' : ''}
                                        `}
                                        title={collapsed ? item.name : ''}
                                    >
                                        <item.icon className={`w-5 h-5 ${isActive ? 'text-[#5AA0FF]' : 'text-gray-500 group-hover:text-gray-700'} ${collapsed ? '' : 'mr-3'}`} />

                                        {!collapsed && (
                                            <span className="font-medium text-sm">{item.name}</span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Secondary Navigation */}
                    <ul className="space-y-1 px-3 pt-4 border-t border-gray-100 mt-2">
                        {secondaryItems.filter(item => item.name !== 'Notifications').map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`
                                        flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group
                                        text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:text-red-600/80
                                        ${collapsed ? 'justify-center' : ''}
                                    `}
                                    title={collapsed ? item.name : ''}
                                >
                                    <item.icon className={`w-5 h-5 text-gray-500 group-hover:text-gray-700 ${item.name === 'Logout' ? 'group-hover:text-red-500' : ''} ${collapsed ? '' : 'mr-3'}`} />
                                    {!collapsed && (
                                        <span className={`font-medium text-sm ${item.name === 'Logout' ? 'group-hover:text-red-600' : ''}`}>{item.name}</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
