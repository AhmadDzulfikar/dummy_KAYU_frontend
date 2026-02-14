
export interface Student {
    npm: string;
    name: string;
    program: string;
    batch: number;
    status: 'Aktif' | 'Cuti';
    gpa: number; // IPK
    ips: number; // IPS
    credits: number; // Total SKS
    phone: string;
    // Evaluation Logic
    isAtRisk?: boolean; // Warning status
    maxSksNext?: number; // Calculated Max SKS
    riskReasons?: string[]; // Triggers
}

// Helper to determine max SKS based on IPS/GPA rules
export const calculateMaxSks = (ips: number): number => {
    if (ips > 3.5) return 24;
    if (ips > 3.0) return 21;
    if (ips > 2.5) return 18;
    if (ips > 2.0) return 15;
    return 12;
};

export const STUDENTS_DATA: Student[] = [
    // Computer Science (CS) - At Risk Cases
    {
        npm: '2206081234', name: 'Gede Bagus', program: 'Computer Science', batch: 2022, status: 'Aktif',
        gpa: 3.85, ips: 3.90, credits: 88, phone: '081234567890', isAtRisk: false
    },
    {
        npm: '2206082345', name: 'Ni Putu Sari', program: 'Computer Science', batch: 2022, status: 'Aktif',
        gpa: 3.92, ips: 3.95, credits: 90, phone: '081234567891', isAtRisk: false
    },
    // WARNING: Low GPA
    {
        npm: '2306089999', name: 'Rizky Pratama', program: 'Computer Science', batch: 2023, status: 'Aktif',
        gpa: 2.15, ips: 1.80, credits: 40, phone: '081234560001', isAtRisk: true,
        riskReasons: ['IPS < 2.30', 'Odd semester passed credits below 11']
    },
    // WARNING: Drastic Drop
    {
        npm: '2306088888', name: 'Dewi Lestari', program: 'Computer Science', batch: 2023, status: 'Aktif',
        gpa: 3.20, ips: 2.10, credits: 48, phone: '081234560002', isAtRisk: true,
        riskReasons: ['Drastic IPS drop (≥ 0.75)', 'IPS < 2.30']
    },
    {
        npm: '2306083456', name: 'Wayan Adi', program: 'Computer Science', batch: 2023, status: 'Cuti',
        gpa: 3.50, ips: 0, credits: 45, phone: '081234567892', isAtRisk: false
    },
    {
        npm: '2306084567', name: 'Made Krisna', program: 'Computer Science', batch: 2023, status: 'Aktif',
        gpa: 3.10, ips: 3.20, credits: 50, phone: '081234567893', isAtRisk: false
    },
    {
        npm: '2406085678', name: 'Ketut Suka', program: 'Computer Science', batch: 2024, status: 'Aktif',
        gpa: 3.75, ips: 3.80, credits: 24, phone: '081234567894', isAtRisk: false
    },
    {
        npm: '2206086789', name: 'Komang Dewi', program: 'Computer Science', batch: 2022, status: 'Aktif',
        gpa: 2.90, ips: 3.00, credits: 80, phone: '081234567895', isAtRisk: false
    },
    {
        npm: '2306087890', name: 'Putu Eka', program: 'Computer Science', batch: 2023, status: 'Aktif',
        gpa: 3.45, ips: 3.50, credits: 52, phone: '081234567896', isAtRisk: false
    },
    {
        npm: '2406088901', name: 'Kadek Agus', program: 'Computer Science', batch: 2024, status: 'Cuti',
        gpa: 0, ips: 0, credits: 0, phone: '081234567897', isAtRisk: false
    },

    // Information Systems (IS)
    {
        npm: '2206091234', name: 'Siti Aminah', program: 'Information Systems', batch: 2022, status: 'Aktif',
        gpa: 3.65, ips: 3.70, credits: 86, phone: '081234567898', isAtRisk: false
    },
    {
        npm: '2206092345', name: 'Budi Santoso', program: 'Information Systems', batch: 2022, status: 'Aktif',
        gpa: 3.30, ips: 3.10, credits: 82, phone: '081234567899', isAtRisk: false
    },
    // WARNING: Credits Issue
    {
        npm: '2206097777', name: 'Andi Wijaya', program: 'Information Systems', batch: 2022, status: 'Aktif',
        gpa: 2.40, ips: 2.50, credits: 60, phone: '081234560003', isAtRisk: true,
        riskReasons: ['Cumulative credits below even-semester milestone', 'Projected credits below target']
    },
    {
        npm: '2306093456', name: 'Rina Wati', program: 'Information Systems', batch: 2023, status: 'Aktif',
        gpa: 3.88, ips: 3.90, credits: 55, phone: '081234567800', isAtRisk: false
    },
    // WARNING: Low IPS
    {
        npm: '2306096666', name: 'Bambang Pamungkas', program: 'Information Systems', batch: 2023, status: 'Aktif',
        gpa: 2.80, ips: 1.90, credits: 40, phone: '081234560004', isAtRisk: true,
        riskReasons: ['IPS < 2.30']
    },
    {
        npm: '2306094567', name: 'Doni Pratama', program: 'Information Systems', batch: 2023, status: 'Aktif',
        gpa: 2.80, ips: 2.75, credits: 40, phone: '081234567801', isAtRisk: false
    },
    {
        npm: '2406095678', name: 'Eko Saputra', program: 'Information Systems', batch: 2024, status: 'Aktif',
        gpa: 3.55, ips: 3.60, credits: 22, phone: '081234567802', isAtRisk: false
    },
    {
        npm: '2406096789', name: 'Fani Indah', program: 'Information Systems', batch: 2024, status: 'Cuti',
        gpa: 3.20, ips: 0, credits: 18, phone: '081234567803', isAtRisk: false
    },
    {
        npm: '2206097890', name: 'Gilang Ramadhan', program: 'Information Systems', batch: 2022, status: 'Aktif',
        gpa: 3.15, ips: 3.20, credits: 84, phone: '081234567804', isAtRisk: false
    },
    {
        npm: '2306098901', name: 'Hani Susanti', program: 'Information Systems', batch: 2023, status: 'Aktif',
        gpa: 3.95, ips: 4.00, credits: 58, phone: '081234567805', isAtRisk: false
    },
];

// Pre-calculate maxSkSNext for everyone
STUDENTS_DATA.forEach(s => {
    // If status cuti, max SKS usually normal logic based on last IPS, but let's assume 0 for simplicity or logic
    if (s.status === 'Cuti') {
        s.maxSksNext = 0; // Or standard check
    } else {
        s.maxSksNext = calculateMaxSks(s.ips || s.gpa);
    }
});
