import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Conoceme from './components/Conoceme';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsappButton from './components/WhatsappButton';
import AvisoDePrivacidad from './components/AvisoDePrivacidad';
import TerminosYCondiciones from './components/TerminosYCondiciones';
import PoliticaEliminacionDatos from './components/PoliticaEliminacionDatos';
import Lenis from 'lenis'; // Importamos Lenis

function App() {

    // Configuración de Lenis (Scroll Suave)
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2, // Ajusta la suavidad (1.2 es un buen estándar)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Efecto inercia
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Limpieza para evitar errores al recargar
        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <Router>
            <div className="font-sans antialiased text-text-dark">
                <NavBar />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header />
                            <main>
                                <Benefits />
                                <HowItWorks />
                                <Conoceme />
                                <Testimonials />
                                <FAQ />
                            </main>
                        </>
                    } />
                    <Route path="/aviso-de-privacidad" element={<AvisoDePrivacidad />} />
                    <Route path="/terminos_y_condiciones" element={<TerminosYCondiciones />} />
                    <Route path="/politica-de-eliminacion-de-datos-de-usuario" element={<PoliticaEliminacionDatos />} />
                </Routes>
                <Footer />
                <WhatsappButton />
            </div>
        </Router>
    );
}

export default App;