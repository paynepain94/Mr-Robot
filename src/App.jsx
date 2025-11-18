import React from 'react';
import NavBar from './components/NavBar'; // <-- 1. IMPORTA EL NUEVO COMPONENTE
import Header from './components/Header';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Conoceme from './components/Conoceme';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans antialiased text-text-dark">
      <NavBar /> {/* <-- 2. AÑÁDELO AQUÍ, ANTES DEL HEADER */}
      <Header />
      <main>
        <Benefits />
        <HowItWorks />
        <Conoceme />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;