import React, { useEffect } from 'react'; 
import NavBar from './components/NavBar';
import Header from './components/Header';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Conoceme from './components/Conoceme';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsappButton from './components/WhatsappButton';
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
    <div className="font-sans antialiased text-text-dark">
      <NavBar /> 
      <Header />
      <main>
        <Benefits />
        <HowItWorks />
        <Conoceme />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  );
}

export default App;