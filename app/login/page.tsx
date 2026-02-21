'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simulate API call
    setTimeout(() => {
      // Dummy Account Checks

      // 1. Define Dummy Database
      const accounts: Record<string, { pass: string, roles: string[], programs?: string[] }> = {
        // Students - REVISED
        'AmanBelumEligible': { pass: 'AmanBelumEligible', roles: ['Student-NotEligible'] },
        'AmanEligible': { pass: 'AmanEligible', roles: ['Student-Eligible'] },
        'WarningBelumEligible': { pass: 'WarningBelumEligible', roles: ['Student-Warning'] }, // Warning + Belum Eligible

        // Staff / Non-Student Roles
        'DosenPA': { pass: 'DosenPA', roles: ['Academic Advisor'], programs: ['Computer Science'] },
        'TimYudisium': { pass: 'TimYudisium', roles: ['Yudisium Team'] },
        'ManajerAkademik': { pass: 'ManajerAkademik', roles: ['Academic Manager'] },
        'Sekretariat': { pass: 'Sekretariat', roles: ['Secretariat'] },

        // REVISED KAPRODI (Single Prodi Only)
        'Kaprodi': {
          pass: 'Kaprodi',
          roles: ['Head of Program'],
          programs: ['Computer Science'] // Maps to Ilmu Komputer internally
        },

        // Multi-Role
        'MultiRole': { pass: 'MultiRole', roles: ['Academic Advisor', 'Yudisium Team'], programs: ['Computer Science'] },

        // PA Specific Scenarios
        'PA_SingleProdi': {
          pass: 'PA_SingleProdi',
          roles: ['Academic Advisor'],
          programs: ['Computer Science']
        },
        'PA_MultiProdi': {
          pass: 'PA_MultiProdi',
          roles: ['Academic Advisor'],
          programs: ['Computer Science', 'Information Systems']
        }
      };

      // Role -> Path Mapping
      const rolePaths: Record<string, string> = {
        'Academic Advisor': '/pa/dashboard',
        'Yudisium Team': '/yudisium/submissions',
        'Academic Manager': '/manajer-akademik/pilih-prodi', // Force context selection
        'Secretariat': '/secretariat/dashboard',
        'Head of Program': '/kaprodi/dasbor'
      };

      const user = accounts[username];

      if (user && user.pass === password) {
        // Success
        // 1. Clear previous session data
        localStorage.removeItem('userRoles');
        localStorage.removeItem('lastUsedRole');
        localStorage.removeItem('userPrograms');
        localStorage.removeItem('activeProgram');

        // Clear Contexts
        localStorage.removeItem('kaprodiRole');
        localStorage.removeItem('kaprodiActiveProdi');
        localStorage.removeItem('manajerActiveProdi');

        // 2. Handle Students Specials
        if (user.roles[0].startsWith('Student')) {
          if (user.roles[0] === 'Student-NotEligible') router.push('/student/aman-belum-eligible');
          else if (user.roles[0] === 'Student-Eligible') router.push('/student/dashboard');
          else if (user.roles[0] === 'Student-Warning') router.push('/student/warning-belum-eligible');
          return;
        }

        // 3. Handle Staff Roles
        // Store roles for the session
        localStorage.setItem('userRoles', JSON.stringify(user.roles));
        if (user.programs) {
          localStorage.setItem('userPrograms', JSON.stringify(user.programs));
        }

        // REVISED LOGIN LOGIC FOR KAPRODI (Always Single Prodi)
        if (user.roles.includes('Head of Program')) {
          localStorage.setItem('kaprodiRole', 'single');
          localStorage.setItem('kaprodiActiveProdi', 'Ilmu Komputer'); // Hardcoded as per request
          router.push('/kaprodi/dasbor');
          return;
        }

        // LOGIC FOR MANAJER AKADEMIK
        if (user.roles.includes('Academic Manager')) {
          router.push('/manajer-akademik/pilih-prodi');
          return;
        }

        // Special Login Logic for Academic Advisor
        if (user.roles.includes('Academic Advisor')) {
          // Check if it's the only role or if it's the specific target for PA accounts
          // For simplicity in this dummy, if username starts with PA_ or DosenPA, treat as PA flow
          const isPAUser = username.startsWith('PA_') || username === 'DosenPA';

          if (isPAUser) {
            if (user.programs && user.programs.length > 1) {
              router.push('/pa/select-program');
              return;
            } else if (user.programs && user.programs.length === 1) {
              localStorage.setItem('activeProgram', user.programs[0]);
              router.push('/pa/dashboard');
              return;
            }
          }
        }

        // Check default role (if implemented, for now we follow the simple rule: 1 role = auto, >1 = select)
        const savedDefault = localStorage.getItem('defaultRole');
        if (savedDefault && user.roles.includes(savedDefault)) {
          // If user wants to auto-login to default
          router.push(rolePaths[savedDefault]);
          return;
        }

        if (user.roles.length === 1) {
          // Redirect directly
          const path = rolePaths[user.roles[0]];
          if (path) router.push(path);
          else {
            // Fallback
            setMessage({ text: 'Configuration error: No path for role', type: 'error' });
            setLoading(false);
          }
        } else {
          // Redirect to role selector
          router.push('/select-role');
        }
      }
      else {
        // Invalid credentials
        setMessage({ text: 'Invalid username or password', type: 'error' });
        setLoading(false);
      }
    }, 1500);
  };

  const handleSSOLogin = () => {
    // Start a simple redirect flow for SSO - replace endpoint with real SSO entrypoint
    setMessage(null);
    setLoading(true);
    // Small delay to show loading state, then redirect to SSO endpoint
    setTimeout(() => {
      window.location.href = '/api/auth/sso';
    }, 250);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800 relative z-0">

      {/* Background decoration (optional subtle gradient or pattern) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white pointer-events-none -z-10" />

      {/* Header Bar */}
      <header className="w-full h-16 bg-[#5AA0FF] shadow-md flex items-center px-4 md:px-6 z-20 relative">

        {/* Banner Image - Positioned absolute to hang from the top, next to text */}
        <div className="absolute top-0 left-4 md:left-6 z-30 w-16 md:w-24 h-32 md:h-48 transition-all duration-300 ease-in-out hover:scale-105 origin-top">
          <div className="relative w-full h-full drop-shadow-lg filter">
            <Image
              src="/bannerfasilkomGG.webp"
              alt="Fasilkom Banner"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 768px) 80px, 120px"
            />
          </div>
        </div>

        {/* Title - Added left margin to account for the banner */}
        <h1 className="text-white text-lg md:text-2xl font-bold tracking-wide select-none drop-shadow-sm ml-20 md:ml-32">
          Kalkulator Yudisium
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-4 w-full">

        {/* Login Card */}
        <div className="w-full max-w-[400px] md:max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] border border-gray-100 z-10 relative">

          <div className="pt-10 pb-8 px-8 md:px-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                LOGIN KAYU
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="group">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1 transition-colors group-focus-within:text-[#5AA0FF]"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`block w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400
                             focus:border-[#5AA0FF] focus:ring-4 focus:ring-[#5AA0FF]/10 focus:bg-white
                             transition-all duration-200 ease-in-out outline-none sm:text-sm
                             ${message?.type === 'error' ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between mb-1.5 ml-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-[#5AA0FF]"
                  >
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-[#5AA0FF] hover:text-blue-600 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400
                             focus:border-[#5AA0FF] focus:ring-4 focus:ring-[#5AA0FF]/10 focus:bg-white
                             transition-all duration-200 ease-in-out outline-none sm:text-sm
                             ${message?.type === 'error' ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white shadow-lg bg-[#5AA0FF] 
                            hover:bg-blue-500 hover:shadow-blue-500/30 hover:-translate-y-0.5
                            active:bg-blue-600 active:scale-[0.98] active:shadow-none
                            transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5AA0FF]
                            ${loading ? 'opacity-75 cursor-not-allowed transform-none' : ''}`}
                >
                  {loading ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Please wait...</span>
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>

              {/* SSO Option */}
              <div className="pt-1">
                <div className="flex items-center my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <div className="px-3 text-xs text-gray-400 font-medium">atau</div>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <button
                  type="button"
                  onClick={handleSSOLogin}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl text-sm font-semibold text-gray-700 shadow-sm bg-white border border-gray-200
                            hover:bg-gray-50 hover:shadow-md active:scale-[0.995] transition-all duration-150
                            ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1F2937]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  <span>Login with SSO</span>
                </button>
              </div>
            </form>

            {/* Dummy Feedback Message */}
            {message && (
              <div className={`mt-6 p-3 rounded-lg text-sm text-center font-medium border animate-pulse
                 ${message.type === 'error'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}
              >
                {message.text}
              </div>
            )}



          </div>

          <div className="bg-gray-50/80 px-8 py-5 border-t border-gray-100 flex flex-col items-center justify-center space-y-2">
            <p className="text-xs text-gray-400 text-center leading-relaxed max-w-xs">
              By logging in, you agree to our
              <a href="#" className="hover:text-[#5AA0FF] ml-1 transition-colors">Terms of Service</a> and
              <a href="#" className="hover:text-[#5AA0FF] ml-1 transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-gray-400 select-none">
        &copy; {new Date().getFullYear()} Universitas Indonesia. All rights reserved.
      </footer>
    </div>
  );
}
