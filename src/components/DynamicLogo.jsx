import React from 'react';

const DynamicLogo = () => {
    return (
        <div className="fixed top-6 right-6 z-50 mix-blend-difference">
            <div className="relative group cursor-pointer">
                {/* Ring Animation */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-spin-slow"></div>

                {/* Logo Container */}
                <div className="relative flex items-center justify-center bg-black/90 rounded-full w-14 h-14 sm:w-16 sm:h-16 ring-1 ring-white/10 shadow-2xl backdrop-blur-xl">
                    {/* Simple Abstract 'S' or Atom Icon for Senior Robot */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>

                {/* Text Reveal on Hover (Optional, keeping it simple as requested 'Logo') */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <span className="font-bold text-white text-lg tracking-wider">Senior Robot</span>
                </div>
            </div>
        </div>
    );
};

export default DynamicLogo;
