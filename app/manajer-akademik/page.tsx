'use client';

import { useRouter } from 'next/navigation';

export default function RedirectPage() {
    const router = useRouter();
    // Redirect to list
    if (typeof window !== 'undefined') {
        router.push('/manajer-akademik/mahasiswa');
    }
    return null;
}
