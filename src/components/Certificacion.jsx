import React, { useEffect } from 'react';
import DynamicBackground from './DynamicBackground';

const Certificacion = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleOAuth = () => {
        // Redirigir a la página de developers.facebook (OAuth)
        window.location.href = 'https://developers.facebook.com';
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black font-sans">
            <DynamicBackground />

            <div className="relative z-10 p-8 rounded-2xl bg-gray-900/50 border border-white/10 shadow-2xl backdrop-blur-sm flex flex-col items-center">
                <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-8 uppercase tracking-widest text-center">
                    Certificación OAuth
                </h1>

                <p className="text-gray-300 mb-8 text-center max-w-md">
                    Haz clic en el botón de abajo para iniciar sesión con Facebook y completar el proceso de certificación.
                </p>

                <button
                    onClick={handleOAuth}
                    className="group relative px-10 py-4 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold rounded-full shadow-[0_0_20px_rgba(24,119,242,0.4)] hover:shadow-[0_0_30px_rgba(24,119,242,0.6)] transition-all transform hover:-translate-y-1 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-3 text-lg">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Autenticar con Facebook
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Certificacion;
