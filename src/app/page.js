import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-4xl">
        <div className="flex items-center gap-3">
          <Image
            src="/stethoscope.svg"
            alt="MediTrack Logo"
            width={40}
            height={40}
            priority
            className="text-blue-600"
          />
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">MediTrack AI</h1>
        </div>
        
        <div className="text-center sm:text-left mb-6">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Intelligent Healthcare Management</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Revolutionize patient care with AI-powered treatment optimization and comprehensive patient management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Patient Management</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Easily add, update, and track patient information, medical history, and treatment plans in one secure location.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                  <path d="M9 17v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">AI Treatment Optimization</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Leverage AI to predict patient responses to treatments based on their unique characteristics and medical history.</p>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 sm:w-auto"
            href="/sign-in"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            Sign In
          </Link>
          <Link
            className="rounded-full border border-solid border-blue-600 dark:border-blue-500 transition-colors flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 w-full sm:w-auto"
            href="/sign-up"
          >
            Create Account
          </Link>
          <Link
            className="rounded-full border border-solid border-green-600 dark:border-green-500 transition-colors flex items-center justify-center hover:bg-green-50 dark:hover:bg-gray-800 text-green-600 dark:text-green-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 w-full sm:w-auto"
            href="/dashboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <line x1="3" x2="21" y1="9" y2="9"></line>
              <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"></path>
            </svg>
            Dashboard
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-gray-600 dark:text-gray-400">
        <a
          className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          href="#features"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          Features
        </a>
        <a
          className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          href="#testimonials"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M3 9h18"></path>
          </svg>
          Testimonials
        </a>
        <a
          className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          href="#contact"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
            <path d="M2 12h20"></path>
          </svg>
          Contact Us
        </a>
      </footer>
    </div>
  );
}
