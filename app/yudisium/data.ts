
export type StudentStatus = 'Aktif' | 'Cuti' | 'Non-aktif';
export type SubmissionStatus = 'Submitted' | 'Approved' | 'Rejected';
export type CompletenessStatus = 'Complete' | 'Has Issues';

export interface Student {
    npm: string;
    name: string;
    prodi: string;
    batch: number;
    status: StudentStatus;
    gpa: number;
    totalCredits: number;
    phone: string;
    email: string;
}

export interface Submission {
    id: string;
    studentNpm: string;
    studentName: string; // denormalized for easier display
    prodi: string;
    batch: number;
    status: SubmissionStatus;
    completeness: CompletenessStatus;
    submittedDate: string;
    issues?: string[]; // list of issues if any

    // Eligibility Check Data (Dummy)
    regularCredits: number; // e.g. 138/144
    requiredCoursesTaken: number; // e.g. 38/40
    minGpaPassed: boolean;
    transferCredits: number;

    // Decision Data
    predicate?: string;
    rejectReason?: string;
    decisionDate?: string;
    decisionBy?: string;

    // Dummy Eligibility Flags
    hasRetakeDE?: boolean;
    hasGradeWashing?: boolean;
}

// Helper to generate dates
const randomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

// 1. Generate Students (approx 50)
export const STUDENTS: Student[] = Array.from({ length: 50 }).map((_, i) => {
    const isCS = i % 2 === 0;
    const batch = 2020 + Math.floor(Math.random() * 4); // 2020-2023
    return {
        npm: `2006${isCS ? '08' : '09'}${1000 + i}`,
        name: isCS ? `Mahasiswa CS ${i + 1}` : `Mahasiswa IS ${i + 1}`,
        prodi: isCS ? 'Computer Science' : 'Information Systems',
        batch: batch,
        status: Math.random() > 0.9 ? 'Cuti' : 'Aktif',
        gpa: Number((2.5 + Math.random() * 1.5).toFixed(2)),
        totalCredits: 100 + Math.floor(Math.random() * 50),
        phone: `081234567${i.toString().padStart(3, '0')}`,
        email: `student${i}@univ.ac.id`,
    };
});

// 2. Generate Submissions (linked to some students)
// We'll pick the first 20 students to have submissions
export const SUBMISSIONS: Submission[] = STUDENTS.slice(0, 20).map((student, i) => {
    // Default status is ALWAYS 'Submitted'
    const status: SubmissionStatus = 'Submitted';

    // Special Case: "MHSTDKCUMLAUDE"
    // We'll force the 5th student (index 4) to be this specific case
    let name = student.name;
    let hasRetakeDE = false;
    let hasGradeWashing = false;

    if (i === 4) {
        name = "MHSTDKCUMLAUDE";
        // Flag them as having issues with retake or grade washing
        hasGradeWashing = true;
    }

    const isComplete = i % 3 !== 0; // some have issues
    const issues = isComplete ? [] : ['Missing TOEFL certificate', 'Transcript mismatch', 'Tuition fee unresolved'];

    return {
        id: `YUD-${1000 + i}`,
        studentNpm: student.npm,
        studentName: name, // Use overridden name
        prodi: student.prodi,
        batch: student.batch,
        status: status,
        completeness: isComplete ? 'Complete' : 'Has Issues',
        submittedDate: randomDate(new Date(2025, 0, 1), new Date(2025, 6, 1)),
        issues: issues,
        regularCredits: 138 + Math.floor(Math.random() * 10), // Mostly valid
        requiredCoursesTaken: 40, // Mostly valid
        minGpaPassed: student.gpa >= 2.0,
        transferCredits: Math.floor(Math.random() * 10),
        predicate: undefined,
        rejectReason: undefined,
        decisionDate: undefined,
        decisionBy: undefined,
        hasRetakeDE: hasRetakeDE,
        hasGradeWashing: hasGradeWashing,
    };
});

// Helper to get submission by ID
export const getSubmissionById = (id: string) => SUBMISSIONS.find(s => s.id === id);

// Helper to get student by NPM
export const getStudentByNpm = (npm: string) => STUDENTS.find(s => s.npm === npm);

// Helper to get submission by Student NPM
export const getSubmissionByNpm = (npm: string) => SUBMISSIONS.find(s => s.studentNpm === npm);
