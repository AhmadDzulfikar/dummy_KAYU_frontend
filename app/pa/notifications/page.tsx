'use client';

import { useState, useEffect } from "react";
import Link from 'next/link';

// Dummy Notifications Data
const NOTIFICATIONS = [
    {
        id: 1,
        type: 'warning',
        title: 'Academic Warning Triggered',
        message: 'Rizky Pratama is now At Risk: IPS < 2.30.',
        time: '2 hours ago',
        read: false,
        studentId: '2306089999',
        emailSent: true
    },
    {
        id: 2,
        type: 'info',
        title: 'IRS Approval Reminder',
        message: 'Please review pending IRS for 5 students.',
        time: '5 hours ago',
        read: false,
        link: '/pa/dashboard'
    },
    {
        id: 3,
        type: 'warning',
        title: 'Credits Below Milestone',
        message: 'Andi Wijaya has fallen behind the credit target for Semester 4.',
        time: '1 day ago',
        read: true,
        studentId: '2206097777',
        emailSent: true
    },
    {
        id: 4,
        type: 'success',
        title: 'Student Status Updated',
        message: 'Wayan Adi has successfully requested "Cuti".',
        time: '2 days ago',
        read: true,
        studentId: '2306083456'
    }
];

export default function PANotifications() {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notifications (jujur masih ngasal wok)</h1>
                    <p className="text-gray-500 text-sm mt-1">Updates on advisees and academic alerts.</p>
                </div>
                <button
                    onClick={markAllRead}
                    className="text-sm font-semibold text-[#5AA0FF] hover:text-blue-600 transition-colors"
                >
                    Mark all as read
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`p-5 transition-colors hover:bg-gray-50 flex gap-4 ${!notif.read ? 'bg-blue-50/30' : ''}`}
                        onClick={() => markAsRead(notif.id)}
                    >
                        {/* Icon based on type */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                            ${notif.type === 'warning' ? 'bg-red-100 text-red-600' :
                                notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                    'bg-blue-100 text-[#5AA0FF]'
                            }
                        `}>
                            {notif.type === 'warning' && (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            )}
                            {notif.type === 'info' && (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            {notif.type === 'success' && (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className={`text-sm font-bold ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                    {notif.title}
                                    {notif.emailSent && (
                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500 border border-gray-200">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Email Sent
                                        </span>
                                    )}
                                </h3>
                                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notif.message}</p>

                            {notif.studentId && (
                                <Link
                                    href={`/pa/students/${notif.studentId}`}
                                    className="inline-block mt-2 text-xs font-bold text-[#5AA0FF] hover:underline"
                                >
                                    View Student Details
                                </Link>
                            )}
                            {notif.link && (
                                <Link
                                    href={notif.link}
                                    className="inline-block mt-2 text-xs font-bold text-[#5AA0FF] hover:underline"
                                >
                                    Go to Dashboard
                                </Link>
                            )}
                        </div>

                        {!notif.read && (
                            <div className="flex-shrink-0 self-center">
                                <span className="block w-2.5 h-2.5 bg-[#5AA0FF] rounded-full"></span>
                            </div>
                        )}
                    </div>
                ))}

                {notifications.length === 0 && (
                    <div className="p-10 text-center text-gray-500 italic">
                        No notifications.
                    </div>
                )}
            </div>
        </div>
    );
}
