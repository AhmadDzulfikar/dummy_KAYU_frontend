'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
    CheckCircle,
    XCircle,
    AlertCircle,
    Search,
    Filter,
    BookOpen,
    ArrowRightLeft,
    Map
} from '../components/Icons';

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState<'required' | 'taken'>('required');

    // Dummy Data
    const summaryData = [
        { label: 'Total Credits', value: '102', sub: 'Cumulative SKS' },
        { label: 'Completed', value: '24/40', sub: 'Required Courses' },
        { label: 'GPA (IPK)', value: '3.28', sub: 'Scale 4.0' },
        { label: 'Latest GPA (IPS)', value: '3.10', sub: '18 SKS' }, // Added to summary for thoroughness
    ];

    const maxCreditsRules = [
        { gpa: '> 3.5', credit: 24, label: 'Excellent' },
        { gpa: '> 3.0 - 3.5', credit: 21, active: true, label: 'Very Good' }, // 3.10 falls here
        { gpa: '> 2.5 - 3.0', credit: 18, label: 'Good' },
        { gpa: '> 2.0 - 2.5', credit: 15, label: 'Fair' },
        { gpa: '≤ 2.0', credit: 12, label: 'Poor' },
    ];

    const requiredCoursesNotTaken = [
        { code: 'CSGE602022', name: 'Software Engineering', sks: 4 },
        { code: 'CSGE602055', name: 'Operating Systems', sks: 4 },
        { code: 'CSGE603331', name: 'Information Retrieval', sks: 3 },
        { code: 'CSGE604123', name: 'Machine Learning', sks: 3 },
        { code: 'CSGE602011', name: 'Computer Networks', sks: 4 },
        { code: 'CSGE602005', name: 'Database Systems', sks: 4 },
    ];

    const requiredCoursesTaken = [
        { code: 'CSGE601010', name: 'Programming Foundations 1', sks: 4, grade: 'A', semester: 'Term 1' },
        { code: 'CSGE601011', name: 'Programming Foundations 2', sks: 4, grade: 'A-', semester: 'Term 2' },
        { code: 'CSGE601020', name: 'Discrete Mathematics 1', sks: 3, grade: 'B+', semester: 'Term 1' },
        { code: 'CSGE602040', name: 'Data Structures & Algo', sks: 4, grade: 'B', semester: 'Term 3' },
        { code: 'CSGE602012', name: 'Web Development', sks: 3, grade: 'A', semester: 'Term 3' },
    ];

    // Status: SAFE
    // Yudisium: Not Eligible

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">

            {/* 1. Quick Academic Summary */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryData.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow group">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{item.label}</span>
                        <span className="text-3xl font-extrabold text-gray-900 tracking-tight my-1 group-hover:text-[#5AA0FF] transition-colors">{item.value}</span>
                        <span className="text-xs text-gray-500 font-medium">{item.sub}</span>
                    </div>
                ))}
            </section>

            {/* 2. Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT COLUMN (Academic Status & Graduation) - lg:col-span-5 */}
                <div className="lg:col-span-5 space-y-8">

                    {/* A) Academic Evaluation Status (SAFE) - REFINED */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                        {/* Status Header */}
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Academic Evaluation</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Monitoring your academic safety</p>
                            </div>
                            <div className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full text-xs border border-green-200 flex items-center shadow-sm">
                                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                SAFE
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Key Indicators Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="block text-xs text-gray-500 font-semibold mb-1">Current GPA</span>
                                    <span className="text-xl font-bold text-gray-900">3.28</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="block text-xs text-gray-500 font-semibold mb-1">Latest Sem GPA</span>
                                    <span className="text-xl font-bold text-gray-900">3.10</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="block text-xs text-gray-500 font-semibold mb-1">Passed Credits</span>
                                    <span className="text-xl font-bold text-gray-900">102</span>
                                </div>
                                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                    <span className="block text-xs text-[#5AA0FF] font-bold mb-1">Max Next SKS</span>
                                    <span className="text-xl font-bold text-[#5AA0FF]">21</span>
                                </div>
                            </div>

                            {/* Rule / Explanation */}
                            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-600 uppercase tracking-wide">
                                    Max Credits Determination
                                </div>
                                <table className="w-full text-xs text-left">
                                    <tbody className="divide-y divide-gray-50">
                                        {maxCreditsRules.map((rule, i) => (
                                            <tr key={i} className={rule.active ? 'bg-blue-50/60' : ''}>
                                                <td className={`px-4 py-2 ${rule.active ? 'font-bold text-blue-700' : 'text-gray-500'}`}>{rule.gpa}</td>
                                                <td className={`px-4 py-2 text-right ${rule.active ? 'font-bold text-blue-700' : 'text-gray-500'}`}>{rule.credit} SKS</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-4 text-xs text-gray-500 leading-relaxed bg-yellow-50 p-3 rounded-lg border border-yellow-100 flex gap-2">
                                <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0" />
                                <span>
                                    <span className="font-semibold text-yellow-800">Rule Context:</span> Even semesters use a 24-credit milestone check. Falling below thresholds may trigger evaluation.
                                </span>
                            </p>
                        </div>
                    </section>

                    {/* B) Graduation Calculator - REFINED */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Graduation Calculator</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Eligibility Check</p>
                            </div>
                            <div className="px-3 py-1 bg-yellow-100 text-yellow-700 font-bold rounded-full text-xs border border-yellow-200 flex items-center shadow-sm">
                                <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                                NOT ELIGIBLE
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="space-y-5">
                                {/* Progress 1: Total Credits */}
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-gray-600 mb-1.5">
                                        <span>Total Credits (144 min)</span>
                                        <span className="text-gray-900">102 / 144</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 w-[70%] rounded-full shadow-[0_0_10px_rgba(250,204,21,0.3)]"></div>
                                    </div>
                                </div>

                                {/* Progress 2: Required Courses */}
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-gray-600 mb-1.5">
                                        <span>Required Courses</span>
                                        <span className="text-gray-900">24 / 40</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 w-[60%] rounded-full shadow-[0_0_10px_rgba(250,204,21,0.3)]"></div>
                                    </div>
                                </div>

                                {/* GPA Status */}
                                <div className="flex items-center justify-between text-sm py-3 border-t border-gray-50 mt-2">
                                    <span className="text-gray-500 font-medium">Min GPA Requirement</span>
                                    <span className="font-bold text-green-600 flex items-center text-xs bg-green-50 px-2 py-1 rounded-md border border-green-100">
                                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                        PASSED (3.28)
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="relative group">
                                    <button
                                        disabled
                                        className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 font-bold text-sm cursor-not-allowed flex items-center justify-center transition-colors"
                                    >
                                        Submit Yudisium
                                    </button>
                                    <div className="mt-2 text-center text-xs text-red-500 font-medium">
                                        Complete requirements to enable submission.
                                    </div>
                                </div>
                                <button className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center">
                                    View Requirements
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN (Course Tracking - DOMINANT) - lg:col-span-7 */}
                <div className="lg:col-span-7 h-full">
                    {/* C) Course Tracking - HIGHEST EMPHASIS */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full min-h-[600px] overflow-hidden">

                        <div className="p-6 border-b border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Course Tracking</h2>
                                    <p className="text-sm text-gray-500 mt-1">Manage your study plan efficiently.</p>
                                </div>
                                <div className="bg-gray-100 p-1 rounded-xl inline-flex shadow-inner">
                                    <button
                                        onClick={() => setActiveTab('required')}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'required' ? 'bg-white shadow-sm text-[#5AA0FF] ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Required Not Taken
                                        <span className="ml-2 bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold">6</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('taken')}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'taken' ? 'bg-white shadow-sm text-[#5AA0FF] ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Already Taken
                                    </button>
                                </div>
                            </div>

                            {/* Search Bar - Independent of tab content for layout stability */}
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search course name or code..."
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5AA0FF]/20 focus:border-[#5AA0FF] transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 bg-gray-50/30 p-2 overflow-y-auto custom-scrollbar">
                            {activeTab === 'required' ? (
                                <div className="space-y-3 p-4">
                                    {requiredCoursesNotTaken.map((course, idx) => (
                                        <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-[#5AA0FF]/40 hover:shadow-md transition-all group flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 font-bold text-xs mt-0.5">
                                                    {course.sks}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-base group-hover:text-[#5AA0FF] transition-colors">{course.name}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{course.code}</span>
                                                        <span className="text-xs text-red-500 font-medium px-2 py-0.5 bg-red-50 rounded-full">Not Taken</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="text-sm font-bold text-[#5AA0FF] opacity-0 group-hover:opacity-100 transition-opacity bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg">
                                                Plan course
                                            </button>
                                        </div>
                                    ))}

                                    <div className="mt-8 pt-8 border-t border-dashed border-gray-200 text-center">
                                        <p className="text-sm text-gray-500">Need to check External Credits?</p>
                                        <Link href="/student/credit-transfer" className="text-sm font-bold text-[#5AA0FF] hover:underline mt-1 inline-block">
                                            Go to Credit Transfer List
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3 p-4">
                                    <div className="mb-4 bg-green-50 border border-green-100 rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">You're doing great!</p>
                                                <p className="text-xs text-gray-500">24 Required credits completed.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {requiredCoursesTaken.map((course, idx) => (
                                        <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-green-200 transition-all flex items-center justify-between opacity-80 hover:opacity-100">
                                            <div>
                                                <h4 className="font-bold text-gray-800 text-sm">{course.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-mono text-gray-500">{course.code}</span>
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <span className="text-xs text-gray-500">{course.semester}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-lg border border-green-100">
                                                    <span className="text-xs text-green-600 font-semibold">Grade</span>
                                                    <span className="text-sm font-extrabold text-green-700">{course.grade}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
