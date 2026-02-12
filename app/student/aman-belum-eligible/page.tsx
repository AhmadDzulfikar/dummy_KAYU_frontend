'use client';
import React, { useState } from 'react';
import {
    CheckCircle,
    XCircle,
    AlertCircle,
    Search,
    Filter,
    BookOpen,
    ArrowRightLeft,
    Map,
    Bell
} from '../components/Icons';

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState<'required' | 'taken'>('required');

    // Dummy Data
    const summaryData = [
        { label: 'Total SKS', value: '102', sub: 'Cumulative' },
        { label: 'GPA', value: '3.28', sub: 'Scale 4.0' },
        { label: 'Required Courses', value: '24/40', sub: 'Completed' },
        { label: 'Last Sem. GPA', value: '3.10', sub: '18 SKS' },
    ];

    const maxCreditsRules = [
        { gpa: '> 3.5', credit: 24 },
        { gpa: '> 3.0 - 3.5', credit: 21, active: true }, // 3.10 falls here
        { gpa: '> 2.5 - 3.0', credit: 18 },
        { gpa: '> 2.0 - 2.5', credit: 15 },
        { gpa: '≤ 2.0', credit: 12 },
    ];

    const requiredCourses = [
        { code: 'CSGE602022', name: 'Software Engineering', sks: 4 },
        { code: 'CSGE602055', name: 'Operating Systems', sks: 4 },
        { code: 'CSGE603331', name: 'Information Retrieval', sks: 3 },
        { code: 'CSGE604123', name: 'Machine Learning', sks: 3 },
        { code: 'CSGE602011', name: 'Computer Networks', sks: 4 },
    ];

    const takenCourses = [
        { code: 'CSGE601010', name: 'Programming Foundations 1', sks: 4, grade: 'A', semester: 'Term 1' },
        { code: 'CSGE601011', name: 'Programming Foundations 2', sks: 4, grade: 'A-', semester: 'Term 2' },
        { code: 'CSGE601020', name: 'Discrete Mathematics 1', sks: 3, grade: 'B+', semester: 'Term 1' },
        { code: 'CSGE602040', name: 'Data Structures & Algo', sks: 4, grade: 'B', semester: 'Term 3' },
    ];

    // Status: Safe
    // Yudisium: Not Eligible

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">

            {/* B) Academic Summary Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {summaryData.map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</span>
                        <span className="text-3xl font-bold text-gray-800 tracking-tight my-1">{item.value}</span>
                        <span className="text-xs text-gray-400 font-medium">{item.sub}</span>
                    </div>
                ))}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column (Main) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* C) Evaluation Status Panel: SAFE */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">Academic Evaluation Status</h2>
                                    <p className="text-sm text-gray-500">Based on your latest academic performance</p>
                                </div>
                                <div className="mt-2 md:mt-0 px-4 py-1.5 bg-green-100 text-green-700 font-bold rounded-full text-sm border border-green-200 flex items-center shadow-sm">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    SAFE
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-2">Key Indicators</h3>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between text-sm">
                                            <span className="text-gray-500">Current GPA</span>
                                            <span className="font-semibold text-gray-900">3.28</span>
                                        </li>
                                        <li className="flex justify-between text-sm">
                                            <span className="text-gray-500">Latest Semester GPA</span>
                                            <span className="font-semibold text-gray-900">3.10</span>
                                        </li>
                                        <li className="flex justify-between text-sm">
                                            <span className="text-gray-500">Passed Credits</span>
                                            <span className="font-semibold text-gray-900">102</span>
                                        </li>
                                        <li className="pt-2 border-t border-gray-200 flex justify-between items-center mt-auto">
                                            <span className="text-sm font-bold text-[#5AA0FF]">Max Credits Next Sem.</span>
                                            <span className="text-lg font-bold text-[#5AA0FF]">21 SKS</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Determination Rule</h3>
                                    <div className="overflow-hidden rounded-lg border border-gray-100 text-sm">
                                        <table className="min-w-full divide-y divide-gray-100">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">GPA Range</th>
                                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Max Credits</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-50 text-xs">
                                                {maxCreditsRules.map((rule, i) => (
                                                    <tr key={i} className={rule.active ? 'bg-blue-50/60' : ''}>
                                                        <td className={`px-3 py-1.5 ${rule.active ? 'font-bold text-blue-700' : 'text-gray-600'}`}>{rule.gpa}</td>
                                                        <td className={`px-3 py-1.5 text-right ${rule.active ? 'font-bold text-blue-700' : 'text-gray-600'}`}>{rule.credit}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-4 text-right">
                                        <button className="text-sm font-medium text-gray-500 hover:text-[#5AA0FF] transition-colors flex items-center justify-end ml-auto group">
                                            View Evaluation Details
                                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* D) Course Tracking */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[500px]">
                        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Course Tracking</h2>
                                <p className="text-sm text-gray-500">Track your progress towards graduation</p>
                            </div>
                            {/* Tabs */}
                            <div className="p-1 bg-gray-100 rounded-xl flex">
                                <button
                                    onClick={() => setActiveTab('required')}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'required' ? 'bg-white shadow-sm text-[#5AA0FF]' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Required Not Taken
                                    <span className="ml-2 bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px]">5</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('taken')}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'taken' ? 'bg-white shadow-sm text-[#5AA0FF]' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Already Taken
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden p-6 bg-gray-50/30">
                            {activeTab === 'required' ? (
                                <div className="h-full flex flex-col">
                                    <div className="flex gap-2 mb-4">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search course..."
                                                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5AA0FF]/20 focus:border-[#5AA0FF]"
                                            />
                                        </div>
                                        <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500">
                                            <Filter className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                        {requiredCourses.map((course) => (
                                            <div key={course.code} className="group bg-white p-4 rounded-xl border border-red-100/50 hover:border-[#5AA0FF]/30 shadow-sm transition-all flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded border-2 border-gray-300 group-hover:border-[#5AA0FF] flex items-center justify-center transition-colors cursor-pointer">
                                                        {/* Checkbox visual */}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 text-sm group-hover:text-[#5AA0FF] transition-colors">{course.name}</h4>
                                                        <p className="text-xs text-gray-400 font-mono mt-0.5">{course.code} • {course.sks} SKS</p>
                                                    </div>
                                                </div>
                                                <button className="text-xs font-medium text-[#5AA0FF] opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-blue-50 rounded-lg">
                                                    Details
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col">
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                                            <span>Progress</span>
                                            <span>24/40 Required SKS</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#5AA0FF] w-[60%] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                        {takenCourses.map((course) => (
                                            <div key={course.code} className="bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-100 shadow-sm transition-all flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-sm">{course.name}</h4>
                                                    <p className="text-xs text-gray-400 font-mono mt-0.5">{course.code} • {course.sks} SKS • {course.semester}</p>
                                                </div>
                                                <div className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100">
                                                    {course.grade}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="space-y-6">

                    {/* E) Graduation Calculator */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Graduation Calculator</h2>
                            <div className="p-2 bg-blue-50 rounded-lg text-[#5AA0FF]">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-100 text-xs font-bold mb-4">
                                <AlertCircle className="w-3 h-3 mr-1.5" />
                                Not eligible yet
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                                        <span>Total Credits</span>
                                        <span className="text-gray-900">102 / 144</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 w-[70%] rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                                        <span>Required Courses</span>
                                        <span className="text-gray-900">24 / 40</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 w-[60%] rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm py-2 border-t border-gray-50 mt-2">
                                    <span className="text-gray-500">Min GPA Status</span>
                                    <span className="font-bold text-green-600 flex items-center text-xs">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        PASSED (3.28)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            disabled
                            className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-400 font-bold text-sm cursor-not-allowed mb-3 relative group"
                        >
                            Submit Yudisium
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Complete requirements to unlock
                            </div>
                        </button>

                        <button className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">
                            View Requirements
                        </button>
                    </section>

                    {/* F) Credit Transfer & External */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:border-blue-200 transition-colors group cursor-pointer">
                            <div className="mb-2">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg w-fit mb-2 group-hover:scale-110 transition-transform">
                                    <ArrowRightLeft className="w-4 h-4" />
                                </div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Transferred</h3>
                                <div className="text-xl font-bold text-gray-900">6 SKS</div>
                            </div>
                            <span className="text-[10px] text-gray-400 leading-tight">Separated from regular credits</span>
                        </div>

                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:border-blue-200 transition-colors group cursor-pointer">
                            <div className="mb-2">
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg w-fit mb-2 group-hover:scale-110 transition-transform">
                                    <Map className="w-4 h-4" />
                                </div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">External</h3>
                                <div className="text-xl font-bold text-gray-900">2 Courses</div>
                            </div>
                            <span className="text-[10px] text-gray-400 leading-tight">Taken outside curriculum</span>
                        </div>
                    </div>

                    {/* G) Notifications Preview (Optional but nice to fill space) */}
                    <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
                        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                            <Bell className="w-4 h-4 mr-2 text-[#5AA0FF]" />
                            Recent Updates
                        </h3>
                        <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                                <div>
                                    <p className="text-xs text-gray-700 leading-relaxed">
                                        <span className="font-semibold">Academic Schedule:</span> IRS filling period starts on Feb 20th.
                                    </p>
                                    <span className="text-[10px] text-gray-400 mt-1 block">2 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
