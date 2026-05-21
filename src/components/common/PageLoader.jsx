import React from 'react';

export default function PageLoader() {
    return (
        <div className="bg-[#fcfbfa] min-h-screen w-full flex flex-col items-center justify-center fixed inset-0 z-50">
            <div className="flex flex-col items-center gap-4">
                {/* Elegant Minimalist Spinner */}
                <div className="w-12 h-12 border-2 border-[#e6e2dd] border-t-[#1a1714] rounded-full animate-spin"></div>

                {/* Brand Text Loader */}
                <p className="font-serif text-sm tracking-widest text-[#7a7068] uppercase animate-pulse mt-2">
                    Loading Experience
                </p>
            </div>
        </div>
    );
}
