import React, { useEffect } from 'react';
import DynamicBackground from './DynamicBackground';

const Certificacion = () => {
    // ======== CONFIGURACIÓN ========
    const APP_ID = import.meta.env.VITE_FB_APP_ID || "1587527345706764";
    const GRAPH_VERSION = import.meta.env.VITE_FB_GRAPH_VERSION || "v22.0";
    const CONFIG_ID = import.meta.env.VITE_FB_CONFIG_ID || "1153020273511065";

    // URLs de los webhooks de Vercel
    const API_ONBOARDING_URL = import.meta.env.VITE_API_ONBOARDING_URL || "/api/onboarding";
    const API_CODE_URL = import.meta.env.VITE_API_CODE_URL || "/api/auth-code";

    // Header Auth para seguridad (opcional)
    const API_HEADER_NAME = import.meta.env.VITE_API_HEADER_NAME || "authorization";
    const API_HEADER_VALUE = import.meta.env.VITE_API_HEADER_VALUE || `Bearer ${import.meta.env.VITE_INTERNAL_AUTH_TOKEN || "SECRETO_INTERNO"}`;

    useEffect(() => {
        window.scrollTo(0, 0);

        // Load FB SDK
        if (!document.getElementById('facebook-jssdk')) {
            const script = document.createElement('script');
            script.id = 'facebook-jssdk';
            script.async = true;
            script.defer = true;
            script.crossOrigin = 'anonymous';
            script.src = 'https://connect.facebook.net/en_US/sdk.js';
            document.body.appendChild(script);
        }

        window.fbAsyncInit = function() {
            window.FB.init({
                appId: APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: GRAPH_VERSION
            });
        };

        const handleMessage = (event) => {
            if (!event.origin.endsWith("facebook.com")) return;
            const client = getClientParam();

            let data;
            try {
                data = JSON.parse(event.data);
            } catch (err) {
                return;
            }

            if (data.type === "WA_EMBEDDED_SIGNUP") {
                if (data.event === "CANCEL") {
                    console.log("Proceso abandonado:", data.data);
                } else {
                    console.log("Onboarding exitoso:", data.data);
                }

                // Ejecutar el post de forma asíncrona pero sin marcar la función principal como async
                postToApi(API_ONBOARDING_URL, {
                    client,
                    embedded_event: data,
                    received_at: new Date().toISOString()
                });
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    const getClientParam = () => {
        return new URLSearchParams(window.location.search).get("client");
    };

    const postToApi = async (url, payload) => {
        try {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    [API_HEADER_NAME]: API_HEADER_VALUE
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            console.error("Error enviando datos a la API en Vercel:", err);
        }
    };

    const fbLoginCallback = (response) => {
        const client = getClientParam();

        if (response.authResponse) {
            const code = response.authResponse.code;

            postToApi(API_CODE_URL, {
                client,
                code,
                received_at: new Date().toISOString()
            });
        } else {
            postToApi(API_CODE_URL, {
                client,
                error: response,
                received_at: new Date().toISOString()
            });
        }
    };

    // Launch method and callback registration
    const launchWhatsAppSignup = () => {
        if (!window.FB) {
            console.error("Facebook SDK no está cargado todavía.");
            return;
        }

        window.FB.login(fbLoginCallback, {
            config_id: CONFIG_ID,
            response_type: "code",
            override_default_response_type: true,
            extras: {
                setup: {},
                featureType: "whatsapp_business_app_onboarding",
                sessionInfoVersion: "3"
            }
        });
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black font-sans">
            <DynamicBackground />

            <div className="relative z-10 p-8 rounded-2xl bg-gray-900/50 border border-white/10 shadow-2xl backdrop-blur-sm flex flex-col items-center">
                <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-8 uppercase tracking-widest text-center">
                    Certificación OAuth
                </h1>

                <p className="text-gray-300 mb-8 text-center max-w-md">
                    Haz clic en el botón de abajo para iniciar sesión con Facebook y vincular tu cuenta de WhatsApp en segundos.
                </p>

                <button
                    onClick={launchWhatsAppSignup}
                    className="group relative px-10 py-4 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold rounded-full shadow-[0_0_20px_rgba(24,119,242,0.4)] hover:shadow-[0_0_30px_rgba(24,119,242,0.6)] transition-all transform hover:-translate-y-1 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-3 text-lg">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Conectar mi WhatsApp
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Certificacion;
