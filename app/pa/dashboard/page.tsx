'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { STUDENTS_DATA } from '../data';

export default function PADashboard() {
    const router = useRouter();
    const [activeProgram, setActiveProgram] = useState<string>('Computer Science');
    const [userPrograms, setUserPrograms] = useState<string[]>([]);

    // Filters
    const [batchFilter, setBatchFilter] = useState<string>('All');
    const [statusFilter, setStatusFilter] = useState<string>('All');
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
            // Fallback if accessed directly without login (for dev)
            setUserPrograms(['Computer Science', 'Information Systems']);
        }
    }, []);

    const handleProgramChange = (prog: string) => {
        setActiveProgram(prog);
        localStorage.setItem('activeProgram', prog);
    };

    // Filter Logic
    const filteredStudents = STUDENTS_DATA.filter(student => {
        // 1. Program Filter (Strict)
        if (student.program !== activeProgram) return false;

        // 2. Batch Filter
        if (batchFilter !== 'All' && student.batch.toString() !== batchFilter) return false;

        // 3. Status Filter
        if (statusFilter !== 'All' && student.status !== statusFilter) return false;

        // 4. Search Filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return student.name.toLowerCase().includes(q) || student.npm.includes(q);
        }

        return true;
    });

    return (
        <div className="space-y-6">

            {/* Header Section with Program Switcher */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Advisees Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Overview of student academic progress</p>
                </div>

                {/* Program Switcher (Only visible if user has multiple programs) */}
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

            {/* Stats Cards (Optional but good for Dashboard) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.04)]">
                    <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Students</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{filteredStudents.length}</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.04)]">
                    <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Avg. GPA</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">
                        {filteredStudents.length > 0
                            ? (filteredStudents.reduce((acc, curr) => acc + curr.gpa, 0) / filteredStudents.length).toFixed(2)
                            : '0.00'
                        }
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.04)]">
                    <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Active Status</div>
                    <div className="text-2xl font-bold text-emerald-600 mt-1">
                        {filteredStudents.filter(s => s.status === 'Aktif').length}
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.04)]">
                    <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">On Leave</div>
                    <div className="text-2xl font-bold text-amber-600 mt-1">
                        {filteredStudents.filter(s => s.status === 'Cuti').length}
                    </div>
                </div>
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

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#5AA0FF] focus:border-[#5AA0FF] block p-2.5 outline-none"
                    >
                        <option value="All">All Status</option>
                        <option value="Aktif">Active</option>
                        <option value="Cuti">On Leave</option>
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

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold">Student Name</th>
                                <th scope="col" className="px-6 py-4 font-semibold">NPM</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Batch</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-right">GPA</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-right">Credits (SKS)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr
                                        key={student.npm}
                                        onClick={() => router.push(`/pa/students/${student.npm}`)}
                                        className="bg-white hover:bg-blue-50 cursor-pointer transition-colors border-l-4 border-transparent hover:border-[#5AA0FF]"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-[#5AA0FF]">
                                            {student.name}
                                        </td>
                                        <td className="px-6 py-4">{student.npm}</td>
                                        <td className="px-6 py-4">{student.batch}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${student.status === 'Aktif'
                                                    ? 'bg-emerald-100 text-emerald-800'
                                                    : 'bg-amber-100 text-amber-800'
                                                }
                      `}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono font-medium text-gray-900">{student.gpa.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-mono text-gray-900">{student.credits}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
                                        No students found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center">
                    <span>Showing {filteredStudents.length} students</span>
                    {/* Pagination Dummy */}
                    <div className="flex space-x-1">
                        <button className="px-2 py-1 rounded border border-gray-200 disabled:opacity-50" disabled>&lt;</button>
                        <button className="px-2 py-1 rounded bg-[#5AA0FF] text-white font-bold">1</button>
                        <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">2</button>
                        <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
