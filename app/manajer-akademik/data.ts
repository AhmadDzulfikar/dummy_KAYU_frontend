
export interface Student {
    npm: string;
    name: string;
    program: 'Ilmu Komputer' | 'Sistem Informasi' | 'Kecerdasan Artifisial';
    batch: number;
    status: 'Aktif' | 'Cuti';
    gpa: number;
    ips: number;
    credits: number; // Reguler
    transferCredits: number;
    evaluationStatus: 'Aman' | 'Peringatan';
    yudisiumStatus: 'Belum mengajukan' | 'Diajukan' | 'Disetujui' | 'Ditolak';
    riskReasons?: string[];
    isEligibleForGraduation?: boolean;
}

export interface CreditTransfer {
    id: number;
    npm: string;
    studentName: string; // Helper for display
    activityName: string;
    credits: number;
    grade: string;
    category: 'MBKM' | 'Pertukaran' | 'Kompetisi' | 'Sertifikasi' | 'Lainnya';
    date: string;
}

const FIRST_NAMES = [
    'Aditya', 'Bayu', 'Chandra', 'Dinda', 'Elisa', 'Fahmi', 'Gilang', 'Hafiz', 'Indah', 'Jasmine',
    'Kevin', 'Lia', 'Muhammad', 'Nadia', 'Ophelia', 'Putri', 'Qori', 'Rian', 'Sarah', 'Taufik',
    'Utari', 'Vicky', 'Wulan', 'Xaverius', 'Yusuf', 'Zahra', 'Bambang', 'Cintya', 'Dimas', 'Eko'
];

const LAST_NAMES = [
    'Pratama', 'Saputra', 'Wijaya', 'Santoso', 'Hidayat', 'Nugraha', 'Kusuma', 'Lestari', 'Wibowo', 'Ramadhan',
    'Pertiwi', 'Utami', 'Setiawan', 'Aksara', 'Budiman', 'Firmansyah', 'Gunawan', 'Hakim', 'Irawan', 'Jaya'
];

const PROGRAMS = ['Ilmu Komputer', 'Sistem Informasi', 'Kecerdasan Artifisial'] as const;

// Generate Students
export const MANAGER_STUDENTS = Array.from({ length: 150 }).map((_, i) => {
    const program = PROGRAMS[Math.floor(Math.random() * PROGRAMS.length)];
    const batch = 2020 + Math.floor(Math.random() * 5); // 2020-2024

    // NPM Logic
    const progCode = program === 'Ilmu Komputer' ? '08' : program === 'Sistem Informasi' ? '09' : '10';
    const npm = `${batch.toString().slice(2)}${progCode}${100000 + i}`;

    const name = `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`;

    const isCuti = Math.random() < 0.05;
    const gpa = parseFloat((2.0 + Math.random() * 2.0).toFixed(2));
    const ips = parseFloat((Math.max(0, gpa - 0.5 + Math.random())).toFixed(2));

    let evalStatus: 'Aman' | 'Peringatan' = 'Aman';
    const riskReasons = [];

    if (!isCuti) {
        if (ips < 2.30) { evalStatus = 'Peringatan'; riskReasons.push('IPS < 2.30'); }
        if (gpa < 2.00) { evalStatus = 'Peringatan'; riskReasons.push('IPK < 2.00'); }
    }

    // Yudisium Logic
    let yudisiumStatus: 'Belum mengajukan' | 'Diajukan' | 'Disetujui' | 'Ditolak' = 'Belum mengajukan';
    let isEligible = false;

    const credits = Math.floor(Math.random() * 144);

    if (credits >= 138 && gpa >= 3.00) {
        isEligible = true;
        if (Math.random() < 0.6) yudisiumStatus = ['Diajukan', 'Disetujui', 'Ditolak'][Math.floor(Math.random() * 3)] as any;
    }

    return {
        npm,
        name,
        program,
        batch,
        status: isCuti ? 'Cuti' : 'Aktif',
        gpa,
        ips,
        credits,
        transferCredits: Math.floor(Math.random() * 10),
        evaluationStatus: evalStatus,
        riskReasons: riskReasons.length ? riskReasons : undefined,
        yudisiumStatus,
        isEligibleForGraduation: isEligible
    } as Student;
});

// Initial Transfer Credits Draft
export const INITIAL_TRANSFERS: CreditTransfer[] = [
    {
        id: 1,
        npm: '2008100001',
        studentName: 'Muhammad Pratama',
        activityName: 'Bangkit 2023',
        credits: 20,
        grade: 'A',
        category: 'MBKM',
        date: '2023-12-15'
    },
    {
        id: 2,
        npm: '2109100012',
        studentName: 'Sarah Wibowo',
        activityName: 'IISMA 2023',
        credits: 20,
        grade: 'A',
        category: 'Pertukaran',
        date: '2024-01-10'
    }
];
