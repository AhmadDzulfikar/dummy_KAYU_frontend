
export interface Student {
    npm: string;
    name: string;
    program: 'Ilmu Komputer' | 'Sistem Informasi' | 'Kecerdasan Artifisial';
    batch: number;
    status: 'Aktif' | 'Cuti';
    gpa: number; // IPK
    ips: number; // IPS
    credits: number; // Total SKS Reguler
    transferCredits: number; // SKS Transfer
    evaluationStatus: 'Aman' | 'Peringatan';
    yudisiumStatus: 'Belum mengajukan' | 'Diajukan' | 'Disetujui' | 'Ditolak';
    riskReasons?: string[]; // Triggers if Peringatan
}

// Helper to generate dummy students
const NAMES = [
    'Ahmad', 'Budi', 'Charlie', 'Dewi', 'Eka', 'Fajar', 'Gita', 'Hana', 'Indra', 'Joko',
    'Kadek', 'Lestari', 'Made', 'Nina', 'Oscar', 'Putu', 'Qiana', 'Rizky', 'Siti', 'Tono',
    'Umar', 'Vina', 'Wayan', 'Xena', 'Yusuf', 'Zara', 'Andi', 'Bella', 'Citra', 'Dimas'
];

const LAST_NAMES = [
    'Santoso', 'Wijaya', 'Pratama', 'Putri', 'Sari', 'Kusuma', 'Hidayat', 'Nugroho', 'Saputra', 'Wibowo',
    'Lestari', 'Anggara', 'Setiawan', 'Utami', 'Rahayu', 'Gunawan', 'Susanti', 'Purnomo', 'Yulia', 'Ramadhan'
];

const PROGRAMS = ['Ilmu Komputer', 'Sistem Informasi', 'Kecerdasan Artifisial'] as const;
const BATCHES = [2020, 2021, 2022, 2023, 2024];
const EVALUATION_STATUSES = ['Aman', 'Peringatan'] as const;
const YUDISIUM_STATUSES = ['Belum mengajukan', 'Diajukan', 'Disetujui', 'Ditolak'] as const;

const generateStudents = (count: number): Student[] => {
    const students: Student[] = [];
    for (let i = 0; i < count; i++) {
        const program = PROGRAMS[Math.floor(Math.random() * PROGRAMS.length)];
        const batch = BATCHES[Math.floor(Math.random() * BATCHES.length)];

        // NPM Logic: Batch + Program Code + Random
        const progCode = program === 'Ilmu Komputer' ? '08' : program === 'Sistem Informasi' ? '09' : '10';
        const npm = `${batch.toString().slice(2)}${progCode}${Math.floor(100000 + Math.random() * 900000)}`;

        const name = `${NAMES[Math.floor(Math.random() * NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`;

        const isCuti = Math.random() < 0.05; // 5% chance Cuti
        const status = isCuti ? 'Cuti' : 'Aktif';

        const gpa = parseFloat((2.0 + Math.random() * 2.0).toFixed(2)); // 2.00 - 4.00
        const ips = parseFloat((Math.max(0, gpa - 0.5 + Math.random())).toFixed(2)); // correlate slightly with GPA

        // Evaluation Logic
        let evalStatus: 'Aman' | 'Peringatan' = 'Aman';
        let riskReasons: string[] = [];

        if (status === 'Aktif') {
            if (ips < 2.30) {
                evalStatus = 'Peringatan';
                riskReasons.push('IPS < 2.30');
            }
            if (gpa < 2.00) {
                evalStatus = 'Peringatan';
                riskReasons.push('IPK < 2.00');
            }
            if (Math.random() < 0.05) { // Random other reason
                evalStatus = 'Peringatan';
                riskReasons.push('SKS lulus semester ganjil di bawah 11');
            }
        }

        // Yudisium Logic
        let yudisiumStatus: 'Belum mengajukan' | 'Diajukan' | 'Disetujui' | 'Ditolak' = 'Belum mengajukan';
        if (batch <= 2021 && gpa >= 3.00) {
            const r = Math.random();
            if (r < 0.3) yudisiumStatus = 'Diajukan';
            else if (r < 0.5) yudisiumStatus = 'Disetujui';
        }

        students.push({
            npm,
            name,
            program,
            batch,
            status,
            gpa,
            ips,
            credits: Math.floor(Math.random() * 144),
            transferCredits: Math.floor(Math.random() * 20),
            evaluationStatus: evalStatus,
            yudisiumStatus,
            riskReasons: riskReasons.length > 0 ? riskReasons : undefined
        });
    }
    return students;
};

export const KAPRODI_STUDENTS_DATA = generateStudents(120);
