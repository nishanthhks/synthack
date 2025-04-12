import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-4xl">
        <div className="flex items-center gap-3">
          <div className="text-teal-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
              <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
              <circle cx="20" cy="10" r="2" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 inline-block text-transparent bg-clip-text dark:from-blue-400 dark:to-teal-300">MediTrack AI</h1>
        </div>
        
        <div className="text-center sm:text-left mb-6">
          <h2 className="text-5xl font-bold mb-4 text-gray-800 dark:text-white leading-tight">Personalized <span className="text-blue-600 dark:text-blue-400">Treatment</span> <span className="text-teal-600 dark:text-teal-400">Optimization</span></h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Our AI platform predicts individual patient responses to different treatment options based on their unique characteristics, improving outcomes and reducing adverse effects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-teal-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-teal-200 dark:hover:border-teal-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600 dark:text-teal-400">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Patient Profiling</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Comprehensive analysis of patient data including medical history, genetics, and lifestyle factors to create personalized treatment profiles.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                  <path d="M9 17v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">AI Treatment Prediction</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Advanced machine learning algorithms predict treatment efficacy and potential side effects based on individual patient characteristics.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-green-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-green-200 dark:hover:border-green-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Outcome Optimization</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Real-time monitoring and adjustment of treatment plans based on patient response data, ensuring optimal healthcare outcomes.</p>
          </div>
        </div>

        <div className="flex flex-col items-center w-full mb-8">
          <Link
            className="rounded-full border-2 border-solid border-transparent transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white gap-2 font-medium text-lg h-14 px-10 w-full sm:w-auto max-w-md shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            href="/dashboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <line x1="3" x2="21" y1="9" y2="9"></line>
              <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"></path>
            </svg>
            Explore Treatment Dashboard
          </Link>
          
          <div className="flex gap-4 items-center mt-6 w-full justify-center">
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
              className="rounded-full border border-solid border-teal-600 dark:border-teal-500 transition-colors flex items-center justify-center hover:bg-teal-50 dark:hover:bg-gray-800 text-teal-600 dark:text-teal-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 w-full sm:w-auto"
              href="/sign-in"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              Create Account
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700 w-full">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Why Choose MediTrack AI?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-1 mt-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">93% improvement in treatment efficacy</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 mt-1 bg-teal-100 dark:bg-teal-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600 dark:text-teal-400">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">78% reduction in adverse effects</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 mt-1 bg-green-100 dark:bg-green-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Trusted by 5,000+ healthcare providers</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 mt-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">HIPAA compliant and secure</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-gray-600 dark:text-gray-400">
        <a
          className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          href="#features"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          Features
        </a>
        <a
          className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          href="#testimonials"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path>
          </svg>
          Testimonials
        </a>
        <a
          className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          href="#research"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          Research
        </a>
        <a
          className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          href="#contact"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Contact Us
        </a>
      </footer>
    </div>
  );
}
