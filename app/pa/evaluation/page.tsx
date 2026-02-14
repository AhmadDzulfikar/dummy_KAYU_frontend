'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { STUDENTS_DATA } from '../data';

export default function PAEvaluation() {
    const router = useRouter();
    const [activeProgram, setActiveProgram] = useState<string>('Computer Science');
    const [userPrograms, setUserPrograms] = useState<string[]>([]);

    // Filters & Tabs
    const [activeTab, setActiveTab] = useState<'AtRisk' | 'All'>('AtRisk');
    const [batchFilter, setBatchFilter] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const storedProg = localStorage.getItem('activeProgram');
        const storedUserProgs = localStorage.getItem('userPrograms');

        if (storedProg) setActiveProgram(storedProg);
        if (storedUserProgs) {
            try {
                const parsed = JSON.parse(storedUserProgs);
                setUserPrograms(parsed);
            } catch (e) {
                setUserPrograms(['Computer Science']); // Default fallback
            }
        } else {
            // Fallback
            setUserPrograms(['Computer Science', 'Information Systems']);
        }
    }, []);

    const handleProgramChange = (prog: string) => {
        setActiveProgram(prog);
        localStorage.setItem('activeProgram', prog);
    };

    // Filter Logic
    const filteredStudents = STUDENTS_DATA.filter(student => {
        // 1. Program Filter
        if (student.program !== activeProgram) return false;

        // 2. Tab Filter (At Risk vs All)
        if (activeTab === 'AtRisk' && !student.isAtRisk) return false;

        // 3. Batch Filter
        if (batchFilter !== 'All' && student.batch.toString() !== batchFilter) return false;

        // 4. Search Filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return student.name.toLowerCase().includes(q) || student.npm.includes(q);
        }

        return true;
    });

    return (
        <div className="space-y-6">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Academic Evaluation</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Monitor advisees flagged as <span className="font-bold text-red-500">At Risk</span> based on academic performance.
                    </p>
                </div>

                {/* Program Switcher */}
                {userPrograms.length > 1 && (
                    <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                        {userPrograms.map((prog) => (
                            <button
                                key={prog}
                                onClick={() => handleProgramChange(prog)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all
                  ${activeProgram === prog
                                        ? 'bg-[#5AA0FF] text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }
                `}
                            >
                                {prog}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Tabs & Filters Container */}
            <div className="flex flex-col gap-4">

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('AtRisk')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                                ${activeTab === 'AtRisk'
                                    ? 'border-red-500 text-red-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            At Risk (Warning)
                            <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium ${activeTab === 'AtRisk' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-900'}`}>
                                {STUDENTS_DATA.filter(s => s.program === activeProgram && s.isAtRisk).length}
                            </span>
                        </button>

                        <button
                            onClick={() => setActiveTab('All')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                                ${activeTab === 'All'
                                    ? 'border-[#5AA0FF] text-[#5AA0FF]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            All Advisees
                        </button>
                    </nav>
                </div>

                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {/* Batch Filter */}
                        <select
                            value={batchFilter}
                            onChange={(e) => setBatchFilter(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#5AA0FF] focus:border-[#5AA0FF] block p-2.5 outline-none"
                        >
                            <option value="All">All Batches</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-[#5AA0FF] focus:border-[#5AA0FF] outline-none"
                            placeholder="Search by Name or NPM..."
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold">Student Name</th>
                                <th scope="col" className="px-6 py-4 font-semibold">NPM</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">Batch</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-right">IPS</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-right">IPK</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-right">SKS Total</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-right text-blue-600">Max SKS Next</th>
                                {activeTab === 'AtRisk' && (
                                    <th scope="col" className="px-6 py-4 font-semibold w-1/4">Warning Reasons</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr
                                        key={student.npm}
                                        onClick={() => router.push(`/pa/students/${student.npm}`)}
                                        className="bg-white hover:bg-blue-50 cursor-pointer transition-colors border-l-4 border-transparent hover:border-[#5AA0FF] group"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-[#5AA0FF]">
                                            {student.name}
                                        </td>
                                        <td className="px-6 py-4">{student.npm}</td>
                                        <td className="px-6 py-4 text-center">{student.batch}</td>
                                        <td className="px-6 py-4 text-right font-mono font-medium text-gray-900">
                                            {student.ips ? student.ips.toFixed(2) : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-gray-900">{student.gpa.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-mono text-gray-900">{student.credits}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-[#5AA0FF]">{student.maxSksNext}</td>

                                        {activeTab === 'AtRisk' && (
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1.5">
                                                    {student.riskReasons?.slice(0, 2).map((reason, idx) => (
                                                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-100 truncate max-w-xs" title={reason}>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5 flex-shrink-0"></span>
                                                            {reason}
                                                        </span>
                                                    ))}
                                                    {student.riskReasons && student.riskReasons.length > 2 && (
                                                        <span className="text-xs text-gray-400 italic pl-1">
                                                            +{student.riskReasons.length - 2} more...
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={activeTab === 'AtRisk' ? 8 : 7} className="px-6 py-16 text-center">
                                        {activeTab === 'AtRisk' ? (
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-500">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900">All Students are Safe</h3>
                                                <p className="text-gray-500 text-sm mt-1 max-w-sm">
                                                    No advisees are currently flagged as At Risk. Great job!
                                                </p>
                                                <button
                                                    onClick={() => setActiveTab('All')}
                                                    className="mt-4 text-[#5AA0FF] text-sm font-semibold hover:underline"
                                                >
                                                    View All Advisees
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-gray-500 italic">No students found matching your filters.</div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
