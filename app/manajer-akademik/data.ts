
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
    // grade: string; // REMOVED
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
// Generate Students with DETERMINISTIC NPMs
export const MANAGER_STUDENTS = Array.from({ length: 150 }).map((_, i) => {
    // Deterministic assignment for stable NPMs
    const programIndex = i % PROGRAMS.length;
    const program = PROGRAMS[programIndex];

    // Deterministic batch: 2020-2024
    const batch = 2020 + (i % 5);

    // NPM Logic
    const progCode = program === 'Ilmu Komputer' ? '08' : program === 'Sistem Informasi' ? '09' : '10';
    // Use a fixed sequence for the trailing number to ensure uniqueness and stability
    const uniqueId = 100000 + i;
    const npm = `${batch.toString().slice(2)}${progCode}${uniqueId}`;

    const name = `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[i % LAST_NAMES.length]}`;

    // Stats can remain partially random for variety, or use modulo for stability if needed.
    // Making them semi-deterministic based on ID to avoid hydration mismatches if generated on server vs client
    const isCuti = (i % 20) === 0; // Every 20th student is Cuti

    // Deterministic GPA/IPS logic based on index
    const baseGpa = 2.0 + ((i * 7) % 200) / 100; // Value between 2.00 and 4.00
    const gpa = parseFloat(Math.min(4.0, baseGpa).toFixed(2));
    const ips = parseFloat(Math.max(0, Math.min(4.0, gpa - 0.2 + ((i % 10) / 20))).toFixed(2));

    let evalStatus: 'Aman' | 'Peringatan' = 'Aman';
    const riskReasons: string[] = [];

    if (!isCuti) {
        if (ips < 2.30) { evalStatus = 'Peringatan'; riskReasons.push('IPS < 2.30'); }
        if (gpa < 2.00) { evalStatus = 'Peringatan'; riskReasons.push('IPK < 2.00'); }
    }

    // Yudisium Logic
    let yudisiumStatus: 'Belum mengajukan' | 'Diajukan' | 'Disetujui' | 'Ditolak' = 'Belum mengajukan';
    let isEligible = false;

    const credits = 80 + (i % 65); // 80 to 144

    if (credits >= 138 && gpa >= 3.00) {
        isEligible = true;
        const statusMod = i % 4;
        if (statusMod === 1) yudisiumStatus = 'Diajukan';
        if (statusMod === 2) yudisiumStatus = 'Disetujui';
        if (statusMod === 3) yudisiumStatus = 'Ditolak';
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
        transferCredits: (i % 5) * 2,
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
        npm: MANAGER_STUDENTS[0].npm,
        studentName: MANAGER_STUDENTS[0].name,
        activityName: 'Bangkit 2023',
        credits: 20,
        category: 'MBKM',
        date: '2023-12-15'
    },
    {
        id: 2,
        npm: MANAGER_STUDENTS[1].npm,
        studentName: MANAGER_STUDENTS[1].name,
        activityName: 'IISMA 2023',
        credits: 20,
        category: 'Pertukaran',
        date: '2024-01-10'
    }
];
