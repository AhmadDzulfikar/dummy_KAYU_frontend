'use client';

import Link from 'next/link';

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V9m0 0V6m0 3h2m-2 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">403 Akses Ditolak</h1>
                <p className="text-gray-500 mb-8">
                    Anda tidak memiliki akses ke halaman ini karena mahasiswa tersebut tidak berada di bawah program studi Anda.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/kaprodi/dasbor"
                        className="block w-full py-3 bg-[#5AA0FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200"
                    >
                        Kembali ke Dasbor
                    </Link>
                    <Link
                        href="/kaprodi/pilih-prodi"
                        className="block w-full py-3 bg-white text-gray-600 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        Ganti Prodi
                    </Link>
                </div>
            </div>
        </div>
    );
}
