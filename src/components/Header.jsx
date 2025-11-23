import React from 'react';
import GravityHero from './GravityHero';

const Header = () => {
  return (
    <header id="inicio" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a]">

      {/* --- ANTI-GRAVITY BACKGROUND --- */}
      <GravityHero />

      {/* --- MAIN HERO CONTENT --- */}
      {/* Added pointer-events-none to container so mouse can reach canvas, 
          but pointer-events-auto to children so they are clickable/selectable */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pointer-events-none select-none">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Mr-Robot: El Único Empleado que Responde 24/7
        </h1>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-whatsapp-green tracking-tight mt-2 drop-shadow-lg">
          y no Pide Sueldo.
        </h2>

        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-light drop-shadow-md">
          Elimina los costos operativos. Respuestas instantáneas y automáticas que transforman cada chat de WhatsApp en una venta, sin importar la hora o el volumen.
        </p>

        <div className="mt-10 pointer-events-auto">
          <button
            onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
            className="bg-whatsapp-green text-white font-semibold py-4 px-10 rounded-full text-lg 
                         hover:bg-whatsapp-dark transition duration-300 ease-in-out shadow-[0_0_20px_rgba(37,211,102,0.5)] cursor-pointer 
                         transform hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.8)]"
          >
            ¡Quiero Escalar Mi Negocio!
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;