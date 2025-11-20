import React from 'react';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Conoceme from './components/Conoceme';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsappButton from './components/WhatsappButton'; // <-- 1. IMPORTAR

function App() {
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
      <WhatsappButton /> {/* <-- 2. AÑADIR AL FINAL */}
    </div>
  );
}

export default App;