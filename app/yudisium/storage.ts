
import { SUBMISSIONS, Submission } from './data';

const STORAGE_KEY = 'yudisium_submissions_v2';

// Get all submissions from local storage or default
export const getStoredSubmissions = (): Submission[] => {
    if (typeof window === 'undefined') return SUBMISSIONS;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SUBMISSIONS));
        return SUBMISSIONS;
    }

    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error('Failed to parse stored submissions', e);
        return SUBMISSIONS;
    }
};

// Get single formatted submission
export const getStoredSubmissionById = (id: string): Submission | undefined => {
    const submissions = getStoredSubmissions();
    return submissions.find(s => s.id === id);
};

// Update submission
export const updateStoredSubmission = (updatedPlugin: Submission) => {
    const submissions = getStoredSubmissions();
    const index = submissions.findIndex(s => s.id === updatedPlugin.id);

    if (index !== -1) {
        submissions[index] = updatedPlugin;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
        // Force a storage event for other components if needed (usually not needed for single page app flow unless multiple tabs)
        window.dispatchEvent(new Event('storage'));
        return true;
    }
    return false;
};

// Get submission by student NPM
export const getStoredSubmissionByNpm = (npm: string): Submission | undefined => {
    const submissions = getStoredSubmissions();
    return submissions.find(s => s.studentNpm === npm);
};
