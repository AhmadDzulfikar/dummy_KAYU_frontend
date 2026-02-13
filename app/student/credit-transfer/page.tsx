'use client';
import React, { useState } from 'react';
import {
    ArrowRightLeft,
    Plus,
    Edit2,
    Trash2,
    Search,
    Filter,
    XCircle,
    CheckCircle,
    AlertCircle
} from '../components/Icons';

interface TransferCredit {
    id: number;
    date: string;
    credits: number;
    category: string;
    description: string;
}

export default function CreditTransferPage() {
    // --- State ---
    const [transfers, setTransfers] = useState<TransferCredit[]>([
        { id: 1, date: '2025-01-15', credits: 3, category: 'MBKM', description: 'Studi Independen Dicoding' },
        { id: 2, date: '2024-11-20', credits: 3, category: 'Competition', description: 'GEMASTIK 2024' },
    ]);

    const [formData, setFormData] = useState({
        credits: '',
        category: 'MBKM',
        description: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const categories = ['MBKM', 'Student Exchange', 'Competition', 'Certification', 'Others'];

    // --- Handlers ---

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.credits || !formData.description) return;

        if (isEditMode && editId) {
            // Edit existing
            setTransfers(transfers.map(t => t.id === editId ? {
                ...t,
                credits: parseInt(formData.credits),
                category: formData.category,
                description: formData.description
            } : t));
            setIsEditMode(false);
            setEditId(null);
        } else {
            // Add new
            const newTransfer: TransferCredit = {
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                credits: parseInt(formData.credits),
                category: formData.category,
                description: formData.description
            };
            setTransfers([newTransfer, ...transfers]);
        }

        // Reset form
        setFormData({ credits: '', category: 'MBKM', description: '' });
    };

    const handleEditClick = (transfer: TransferCredit) => {
        setIsEditMode(true);
        setEditId(transfer.id);
        setFormData({
            credits: transfer.credits.toString(),
            category: transfer.category,
            description: transfer.description
        });
        // Scroll to form on mobile preferably, but for now simple state switch
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setEditId(null);
        setFormData({ credits: '', category: 'MBKM', description: '' });
    };

    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
    };

    const confirmDelete = () => {
        if (deleteId) {
            setTransfers(transfers.filter(t => t.id !== deleteId));
            setDeleteId(null);
            // If we deleted the item being edited, reset form
            if (isEditMode && editId === deleteId) {
                handleCancelEdit();
            }
        }
    };

    // --- Computed ---
    const totalCredits = transfers.reduce((sum, item) => sum + item.credits, 0);

    const filteredTransfers = transfers.filter(t =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12 font-sans text-gray-800">

            {/* 1) Header & Introduction */}
            <header className="text-center space-y-4 pt-4">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Credit Transfer List</h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
                    Manage your transferred credits (MBKM, Exchange, Competitions) here.
                    <br className="hidden sm:block" />
                    These are <span className="font-semibold text-gray-700">separate</span> from your regular course credits.
                </p>
            </header>

            {/* 2) Summary Block */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-blue-50 text-[#5AA0FF] flex items-center justify-center shadow-inner">
                        <ArrowRightLeft className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Total Transfer Credits</h2>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-gray-900">{totalCredits}</span>
                            <span className="text-lg font-medium text-gray-500">SKS</span>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50/50 px-5 py-4 rounded-xl border border-blue-100 max-w-md w-full md:w-auto">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-[#5AA0FF] shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-gray-800 font-semibold mb-1">Important Reminder</p>
                            <p className="text-sm text-gray-600 leading-snug">
                                Transfer credits allow you to fulfill external requirements but do not replace mandatory core courses unless specified.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3) Main Content Area: Form & List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT COLUMN: Add/Edit Form (lg:col-span-4 = ~33%) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className={`
                        bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 relative
                        ${isEditMode ? 'border-orange-200 ring-4 ring-orange-50/50' : 'border-gray-200'}
                    `}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className={`text-lg font-bold flex items-center ${isEditMode ? 'text-orange-600' : 'text-gray-900'}`}>
                                {isEditMode ? (
                                    <>
                                        <Edit2 className="w-5 h-5 mr-2" />
                                        Edit Transfer
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5 mr-2 text-[#5AA0FF]" />
                                        Add Transfer
                                    </>
                                )}
                            </h3>
                            {isEditMode && (
                                <button
                                    onClick={handleCancelEdit}
                                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 underline"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Readonly Field */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                    Student NPM
                                </label>
                                <input
                                    type="text"
                                    value="2006123456"
                                    readOnly
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-500 select-none cursor-not-allowed"
                                />
                            </div>

                            {/* Credits Input */}
                            <div>
                                <label htmlFor="credits" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Transfer Credits (SKS)
                                </label>
                                <input
                                    id="credits"
                                    type="number"
                                    name="credits"
                                    value={formData.credits}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 3"
                                    min="1"
                                    max="24"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5AA0FF]/30 focus:border-[#5AA0FF] transition-all"
                                    required
                                />
                            </div>

                            {/* Category Select */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5AA0FF]/30 focus:border-[#5AA0FF] transition-all"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Description Input */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Description / Event Name
                                </label>
                                <input
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="e.g. GEMASTIK 2025 Winner"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5AA0FF]/30 focus:border-[#5AA0FF] transition-all"
                                    required
                                />
                            </div>

                            {/* Action Button */}
                            <button
                                type="submit"
                                className={`
                                    w-full py-3.5 font-bold rounded-xl shadow-md transition-all hover:scale-[1.01] active:scale-95 text-sm flex justify-center items-center
                                    ${isEditMode
                                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200'
                                        : 'bg-[#5AA0FF] hover:bg-blue-600 text-white shadow-blue-200'}
                                `}
                            >
                                {isEditMode ? 'Update Transfer' : 'Add to List'}
                            </button>
                        </form>
                    </div>
                </div>


                {/* RIGHT COLUMN: History List (lg:col-span-8 = ~67%) */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px] flex flex-col">

                        {/* Table Toolbar */}
                        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900">History List</h3>

                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search history..."
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#5AA0FF] focus:ring-1 focus:ring-[#5AA0FF]"
                                />
                            </div>
                        </div>

                        {/* Table Area */}
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap w-32">Date</th>
                                        <th className="px-6 py-4 whitespace-nowrap w-40">Category</th>
                                        <th className="px-6 py-4">Description</th>
                                        <th className="px-6 py-4 text-right whitespace-nowrap w-24">Credits</th>
                                        <th className="px-6 py-4 text-center w-24">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {filteredTransfers.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                                                {searchTerm ? 'No matches found.' : 'No transfer credits added yet.'}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTransfers.map((item, idx) => (
                                            <tr
                                                key={item.id}
                                                className={`
                                                    group transition-colors
                                                    ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}
                                                    hover:bg-blue-50/40
                                                    ${isEditMode && editId === item.id ? 'bg-orange-50 border-l-4 border-orange-400' : ''}
                                                `}
                                            >
                                                <td className="px-6 py-4 font-mono text-xs text-gray-500 whitespace-nowrap">
                                                    {item.date}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-white border border-gray-200 text-gray-700 shadow-sm">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-900 font-medium">
                                                    {item.description}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="font-bold text-gray-900">{item.credits}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleEditClick(item)}
                                                            className="p-1.5 text-gray-400 hover:text-[#5AA0FF] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                                            title="Edit"
                                                            aria-label="Edit transfer"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(item.id)}
                                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-red-100"
                                                            title="Delete"
                                                            aria-label="Delete transfer"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Footer / Pagination Placeholder */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 text-xs text-gray-400 text-right">
                            Showing {filteredTransfers.length} entries
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Delete Item?</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-6">
                            Are you sure you want to delete this transfer credit entry? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
