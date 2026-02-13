'use client';
import React, { useState } from 'react';
import {
    CheckCircle,
    AlertCircle,
    XCircle,
    ArrowRightLeft,
    Check
} from '../components/Icons';

export default function GraduationCalculatorPage() {
    const [modalType, setModalType] = useState<'none' | 'warning' | 'success'>('none');
    const [submissionStatus, setSubmissionStatus] = useState<'none' | 'pending'>('none');

    // Dummy Requirements
    const requirements = {
        regularCredits: { current: 138, target: 144, met: false },
        requiredCourses: { current: 24, target: 40, met: false },
        gpa: { current: 3.28, min: 2.0, met: true },
        transferCredits: 6
    };

    const isEligible = requirements.regularCredits.met && requirements.requiredCourses.met && requirements.gpa.met;

    const handleSubmitClick = () => {
        if (!isEligible) {
            setModalType('warning');
        } else {
            // Ideally a 'confirm' modal for safe state too, but simplified for this prompt to just handle the dummy flow
            setModalType('success'); // Or a 'ready' confirmation, but let's assume direct success for the happy path dummy
        }
    };

    const confirmSubmitAnyway = () => {
        setModalType('none');
        // Fake loading?
        setTimeout(() => {
            setSubmissionStatus('pending');
            setModalType('success');
        }, 500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12 font-sans text-gray-800">

            {/* Header */}
            <header className="text-center space-y-3 pt-6">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Graduation Calculator</h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-base">
                    Eligibility is strictly based on <span className="font-bold text-gray-700">regular course credits</span>,
                    required courses, and GPA. Transfer credits are tracked separately.
                </p>
            </header>

            {/* Submission Status Banner */}
            {submissionStatus === 'pending' && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-[#5AA0FF]">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-900 text-lg">Submission Received</h3>
                            <p className="text-blue-700/80 text-sm">Your yudisium request is pending review by the academic office.</p>
                        </div>
                    </div>
                    <span className="px-4 py-1.5 bg-blue-200 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wide">
                        Pending Review
                    </span>
                </div>
            )}

            {/* Main Eligibility Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Card Header with Status */}
                <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-bold text-gray-900">Eligibility Check</h2>

                    {!isEligible ? (
                        <div className="px-4 py-2 bg-yellow-100 text-yellow-700 font-bold rounded-full text-sm border border-yellow-200 flex items-center shadow-sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Not yet eligible
                        </div>
                    ) : (
                        <div className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-full text-sm border border-green-200 flex items-center shadow-sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Eligible
                        </div>
                    )}
                </div>

                <div className="p-8 space-y-8">

                    {/* Requirements List */}
                    <div className="space-y-6">
                        {/* 1. Regular Credits */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Regular Course Credits</h4>
                                    <p className="text-xs text-xs text-gray-400">Excludes transfer credits</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xl font-bold ${requirements.regularCredits.met ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {requirements.regularCredits.current}
                                    </span>
                                    <span className="text-gray-400 text-sm font-medium"> / {requirements.regularCredits.target}</span>
                                </div>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${requirements.regularCredits.met ? 'bg-green-500' : 'bg-yellow-400'}`}
                                    style={{ width: `${(requirements.regularCredits.current / requirements.regularCredits.target) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* 2. Required Courses */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <h4 className="font-bold text-gray-800 text-sm">Required Courses Completed</h4>
                                <div className="text-right">
                                    <span className={`text-xl font-bold ${requirements.requiredCourses.met ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {requirements.requiredCourses.current}
                                    </span>
                                    <span className="text-gray-400 text-sm font-medium"> / {requirements.requiredCourses.target}</span>
                                </div>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${requirements.requiredCourses.met ? 'bg-green-500' : 'bg-yellow-400'}`}
                                    style={{ width: `${(requirements.requiredCourses.current / requirements.requiredCourses.target) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* 3. GPA */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">Minimum GPA Requirement</h4>
                                <p className="text-xs text-gray-400 mt-0.5">Must be at least {requirements.gpa.min}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-lg font-bold ${requirements.gpa.met ? 'text-green-600' : 'text-red-600'}`}>
                                    {requirements.gpa.current}
                                </span>
                                {requirements.gpa.met ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-500" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Transfer Credit Note */}
                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-start gap-3">
                        <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
                            <ArrowRightLeft className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-indigo-900">Transfer Credits: {requirements.transferCredits} SKS</h4>
                            <p className="text-xs text-indigo-700/80 mt-1 leading-relaxed">
                                These are counted separately from regular course credits. They may be considered during the final manual review but do not automatically fulfill the 144 SKS regular requirement.
                            </p>
                        </div>
                    </div>

                    {/* MAIN CTA */}
                    <div className="pt-4 border-t border-gray-100">
                        <button
                            onClick={handleSubmitClick}
                            disabled={submissionStatus === 'pending'}
                            className={`
                                w-full py-4 rounded-2xl font-bold text-base shadow-lg transition-all transform active:scale-95
                                ${submissionStatus === 'pending'
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                    : 'bg-[#5AA0FF] hover:bg-blue-600 text-white shadow-blue-200 hover:shadow-blue-300'
                                }
                            `}
                        >
                            {submissionStatus === 'pending' ? 'Submission Sent' : 'Submit Yudisium'}
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-3 font-medium">
                            By submitting, you request a formal review of your academic standing.
                        </p>
                    </div>

                </div>
            </div>

            {/* MODALS */}

            {/* Warning Modal */}
            {modalType === 'warning' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8" />
                        </div>

                        <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Submit anyway?</h3>
                        <p className="text-gray-500 text-center text-sm leading-relaxed mb-6">
                            You are <span className="font-bold text-gray-800">not yet eligible</span>.
                            Your regular course credits are <span className="font-bold text-red-500">{requirements.regularCredits.current}/{requirements.regularCredits.target}</span> and/or required courses are incomplete.
                            <br /><br />
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">Note: Transfer credits do not replace missing regular credits.</span>
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setModalType('none')}
                                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmSubmitAnyway}
                                className="flex-1 py-3 rounded-xl bg-[#5AA0FF] text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-100"
                            >
                                Submit anyway
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal (Toast-like wrapper for simplicity here) */}
            {modalType === 'success' && submissionStatus === 'pending' && (
                // Just a quick transient state or we can rely on the pending banner in the main flow
                // For now, let's close the modal and show the banner
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5" />
            )}

        </div>
    );
}
