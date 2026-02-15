'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Submission, SubmissionStatus } from '@/app/yudisium/data';
import { getStoredSubmissionById, updateStoredSubmission } from '@/app/yudisium/storage';
import { STATUS_LABELS, PREDICATE_LABELS } from '@/app/dictionaries';
import Link from 'next/link';

export default function SubmissionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [submission, setSubmission] = useState<Submission | null>(null);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    // Form States
    const [predicate, setPredicate] = useState('');
    const [approveComment, setApproveComment] = useState('');
    const [rejectReason, setRejectReason] = useState('');

    // Feedback
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (params.id) {
            const sub = getStoredSubmissionById(params.id as string);
            if (sub) {
                setSubmission({ ...sub }); // Clone to allow local mutation before saving
            } else {
                router.push('/403');
            }
            setLoading(false);
        }
    }, [params.id, router]);

    const handleApprove = () => {
        if (!predicate) {
            alert('Harap pilih predikat.');
            return;
        }
        if (submission) {
            const updated: Submission = {
                ...submission,
                status: 'Approved',
                predicate: predicate,
                decisionDate: new Date().toISOString().split('T')[0],
                decisionBy: 'Anda (Staf Yudisium)'
            };

            // Persist
            updateStoredSubmission(updated);

            // Update local state
            setSubmission(updated);
            setShowApproveModal(false);
            showToast('Pengajuan berhasil disetujui!', 'success');
        }
    };

    const handleReject = () => {
        if (!rejectReason.trim()) {
            alert('Harap berikan alasan penolakan.');
            return;
        }
        if (submission) {
            const updated: Submission = {
                ...submission,
                status: 'Rejected',
                rejectReason: rejectReason,
                decisionDate: new Date().toISOString().split('T')[0],
                decisionBy: 'Anda (Staf Yudisium)'
            };

            // Persist
            updateStoredSubmission(updated);

            // Update local state
            setSubmission(updated);
            setShowRejectModal(false);
            showToast('Pengajuan dikembalikan untuk perbaikan. Alasan tersimpan.', 'error');
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
    if (!submission) return null;

    const isFinal = submission.status === 'Approved' || submission.status === 'Rejected';

    return (
        <div className="space-y-6 relative">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-20 right-8 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {toast.message}
                </div>
            )}

            {/* Breadcrumb / Back */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/yudisium/submissions" className="hover:text-[#5AA0FF]">Pengajuan</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{submission.id}</span>
            </div>

            {/* Header Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{submission.studentName}</h1>
                    <div className="mt-1 text-gray-500 space-x-3 text-sm">
                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">{submission.studentNpm}</span>
                        <span>•</span>
                        <span>{submission.prodi}</span>
                        <span>•</span>
                        <span>Batch {submission.batch}</span>
                        <span>•</span>
                        <span className="text-green-600 font-medium">Status: Aktif</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                        {STATUS_LABELS[submission.status] || submission.status}
                    </span>
                    <span className="text-xs text-gray-400">Tanggal Pengajuan: {submission.submittedDate}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Pemeriksaan Kelayakan</h2>

                        <div className="space-y-6">
                            {/* Regular Credits */}
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">SKS Reguler</span>
                                    <span className="text-sm font-medium text-gray-900">{submission.regularCredits} / 144</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-[#5AA0FF] h-2.5 rounded-full" style={{ width: `${Math.min((submission.regularCredits / 144) * 100, 100)}%` }}></div>
                                </div>
                                {submission.regularCredits < 144 && <p className="text-xs text-amber-600 mt-1">Peringatan: Di bawah persyaratan 144 SKS.</p>}
                            </div>

                            {/* Required Courses */}
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">Mata Kuliah Wajib</span>
                                    <span className="text-sm font-medium text-gray-900">{submission.requiredCoursesTaken} / 40</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${Math.min((submission.requiredCoursesTaken / 40) * 100, 100)}%` }}></div>
                                </div>
                            </div>

                            {/* GPA & Transfer */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <span className="text-xs text-gray-500 uppercase tracking-wide">Persyaratan IPK Min (2.00)</span>
                                    <div className="mt-1 flex items-center">
                                        <span className={`text-lg font-bold ${submission.minGpaPassed ? 'text-green-600' : 'text-red-600'}`}>
                                            {submission.minGpaPassed ? 'MEMENUHI' : 'TIDAK MEMENUHI'}
                                        </span>
                                        {submission.minGpaPassed && (
                                            <svg className="w-5 h-5 text-green-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <span className="text-xs text-gray-500 uppercase tracking-wide">SKS Transfer</span>
                                    <div className="mt-1 text-lg font-bold text-gray-800">
                                        {submission.transferCredits} <span className="text-sm font-normal text-gray-500">SKS</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">Dihitung terpisah</p>
                                </div>
                            </div>

                            {/* Honors Eligibility Card */}
                            {(submission.hasRetakeDE || submission.hasGradeWashing) && (
                                <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-2">
                                    <h4 className="text-sm font-bold text-red-800 flex items-center mb-1">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        Tidak Layak Cum Laude
                                    </h4>
                                    <p className="text-xs text-red-700">
                                        Alasan: {submission.hasRetakeDE ? 'Terdeteksi mengulang mata kuliah dari nilai D/E.' : 'Terdeteksi perbaikan nilai (nyuci nilai).'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Issues Panel */}
                    {(submission.issues && submission.issues.length > 0) ? (
                        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 shadow-sm">
                            <h3 className="text-md font-bold text-amber-800 mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                Kendala yang Ditemukan
                            </h3>
                            <ul className="list-disc list-inside text-sm text-amber-900 space-y-1 ml-1">
                                {submission.issues.map((issue, i) => (
                                    <li key={i}>{issue}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm flex items-center">
                            <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-green-800 font-medium">Semua persyaratan tampaknya lengkap.</span>
                        </div>
                    )}
                </div>

                {/* Right Column: Decisions */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Keputusan</h2>

                        {!isFinal ? (
                            <div className="space-y-3">
                                <p className="text-sm text-gray-500 mb-4">
                                    Harap verifikasi semua persyaratan sebelum mengambil keputusan. Tindakan ini bersifat final.
                                </p>
                                <button
                                    onClick={() => setShowApproveModal(true)}
                                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#5AA0FF] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-all"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Setujui (Lulus)
                                </button>
                                <button
                                    onClick={() => setShowRejectModal(true)}
                                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-semibold rounded-lg text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    Tolak / Perlu Perbaikan
                                </button>
                            </div>
                        ) : (
                            <div className={`p-4 rounded-lg border ${submission.status === 'Approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                <div className="font-bold text-lg mb-1 flex items-center">
                                    {submission.status === 'Approved' ? (
                                        <span className="text-green-800">Disetujui</span>
                                    ) : (
                                        <span className="text-red-800">Ditolak</span>
                                    )}
                                </div>
                                <div className="text-sm space-y-2 mt-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Tanggal:</span>
                                        <span className="font-medium">{submission.decisionDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Oleh:</span>
                                        <span className="font-medium">{submission.decisionBy}</span>
                                    </div>
                                    {submission.predicate && (
                                        <div className="pt-2 border-t border-green-200 mt-2">
                                            <span className="block text-xs text-gray-500 uppercase">Predikat</span>
                                            <span className="font-bold text-green-900">{PREDICATE_LABELS[submission.predicate] || submission.predicate}</span>
                                        </div>
                                    )}
                                    {submission.rejectReason && (
                                        <div className="pt-2 border-t border-red-200 mt-2">
                                            <span className="block text-xs text-gray-500 uppercase">Alasan</span>
                                            <span className="font-medium text-red-900">{submission.rejectReason}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {/* Approve Modal */}
            {showApproveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Setujui Pengajuan</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Predikat <span className="text-red-500">*</span></label>
                                <select
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                    value={predicate}
                                    onChange={(e) => setPredicate(e.target.value)}
                                >
                                    <option value="">-- Pilih Predikat --</option>
                                    <option value="Summa Cum Laude" disabled={submission.hasRetakeDE || submission.hasGradeWashing}>Summa Cum Laude</option>
                                    <option value="Cum Laude" disabled={submission.hasRetakeDE || submission.hasGradeWashing}>Cum Laude</option>
                                    <option value="Sangat Memuaskan">Sangat Memuaskan</option>
                                    <option value="Memuaskan">Memuaskan</option>
                                </select>
                                {(submission.hasRetakeDE || submission.hasGradeWashing) && (
                                    <p className="mt-1 text-xs text-red-500">
                                        Tidak layak Cum Laude: {submission.hasRetakeDE ? 'mengulang mata kuliah' : 'perbaikan nilai'} terdeteksi.
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Komentar Tambahan (Opsional)</label>
                                <textarea
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                    rows={3}
                                    value={approveComment}
                                    onChange={(e) => setApproveComment(e.target.value)}
                                    placeholder="Tambahkan catatan internal..."
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowApproveModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleApprove}
                                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Konfirmasi Setujui
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Tolak / Minta Revisi</h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">Pastikan alasan penolakan sudah benar. Alasan ini akan terlihat oleh mahasiswa.</p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alasan <span className="text-red-500">*</span></label>
                                <textarea
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm border p-2"
                                    rows={4}
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Contoh: Dokumen tidak lengkap..."
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Konfirmasi Tolak
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function getStatusColor(status: SubmissionStatus) {
    switch (status) {
        case 'Submitted': return 'bg-blue-100 text-blue-800';
        case 'Approved': return 'bg-green-100 text-green-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}
