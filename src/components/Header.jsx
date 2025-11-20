import React from 'react';

// --- IMPORTA TUS ILUSTRACIONES AQUÍ ---
import HeroFadedRobot from '../assets/hero-faded-robot.svg';   
import TechLinesTop from '../assets/tech-lines-top.svg';       
import TechLinesBottom from '../assets/tech-lines-bottom.svg'; 
import TechLinesTopLeft from '../assets/tech-lines-top-left.svg'; 
// --- ELIMINADO: import StarBorder from './StarBorder'; ---
// ------------------------------------

const Header = () => {
  return (
    // ID "inicio" para el anclaje del menú
    <header id="inicio" className="relative bg-white overflow-hidden">
      
      {/* --- GRÁFICOS DECORATIVOS (SUTILES) --- */}
      
      {/* Circuitos superiores (izquierdo y derecho) */}
      <div 
        className="absolute top-4 sm:top-8 lg:top-12 left-0 z-10 opacity-10 lg:opacity-20" 
        aria-hidden="true"
      >
        <img src={TechLinesTopLeft} alt="" className="w-auto h-32 sm:h-48" />
      </div>
      <div 
        className="absolute top-4 sm:top-8 lg:top-12 right-0 z-10 opacity-10 lg:opacity-20" 
        aria-hidden="true"
      >
        <img src={TechLinesTop} alt="" className="w-auto h-32 sm:h-48" />
      </div>
      
      {/* Circuitos inferiores (derecho) */}
      <div className="absolute bottom-0 right-0 z-10 opacity-10 lg:opacity-20" aria-hidden="true">
        <img src={TechLinesBottom} alt="" className="w-auto h-32 sm:h-48" />
      </div>
      
      {/* Robot difuminado */}
      <div 
        className="absolute bottom-[-5rem] left-[-5rem] z-0 opacity-50 hidden lg:block" 
        aria-hidden="true"
      >
        <img src={HeroFadedRobot} alt="" className="w-96 h-96" /> 
      </div>
      
      {/* Degradado inferior verde */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1/2 z-10 pointer-events-none" 
        style={{
          background: 'linear-gradient(to top, rgba(37, 211, 102, 0.15), transparent)' 
        }}
        aria-hidden="true"
      ></div>
      {/* --- FIN GRÁFICOS DECORATIVOS --- */}

      {/* --- CÍRCULO BLANCO CENTRAL --- */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] 
                   bg-white rounded-full opacity-70 z-10"
        aria-hidden="true"
      ></div>
      {/* --- FIN CÍRCULO BLANCO CENTRAL --- */}

      {/* --- CONTENIDO PRINCIPAL DEL HERO (z-20 para estar sobre todo) --- */}
      <div className="relative z-20 max-w-4xl mx-auto pt-20 pb-32 sm:pt-24 sm:pb-40 lg:pt-32 lg:pb-48 px-4 text-center">
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-dark tracking-tight">
          Mr-Robot: El Único Empleado que Responde 24/7
        </h1>
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-whatsapp-green tracking-tight mt-2">
          y no Pide Sueldo.
        </h2>
        
        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light">
          Elimina los costos operativos. Respuestas instantáneas y automáticas que transforman cada chat de WhatsApp en una venta, sin importar la hora o el volumen.
        </p>
        
        {/* --- BOTÓN CTA ORIGINAL (Rollback) --- */}
        <button 
          onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
          className="mt-10 bg-whatsapp-green text-white font-semibold py-4 px-10 rounded-full text-lg 
                     hover:bg-whatsapp-dark transition duration-300 ease-in-out shadow-lg cursor-pointer 
                     transform hover:scale-105" // Clases de Tailwind originales
        >
          ¡Quiero Escalar Mi Negocio!
        </button>

      </div> {/* Fin Contenido Principal del Hero */}
    </header>
  );
};

export default Header;