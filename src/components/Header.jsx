import React from 'react';
import DynamicBackground from './DynamicBackground';
import ChatSimulation from './ChatSimulation';

const Header = () => {
  const leftChatMessages = [
    { type: 'user', text: 'Hola, quisiera agendar una cita para uñas 💅', delay: 1000 },
    { type: 'bot', text: '¡Hola! Claro. Tengo espacio hoy a las 4:00 PM.', delay: 2500 },
    { type: 'user', text: '¿Podría ser más tarde? Como a las 6?', delay: 4000 },
    { type: 'bot', text: 'Listo. Tu cita quedó reagendada para las 6:00 PM. ✅', delay: 5500 },
  ];

  const rightChatMessages = [
    { type: 'user', text: 'Quiero 5 tacos al pastor con todo 🌮', delay: 1500 },
    { type: 'bot', text: '¡A la orden! ¿Paso por ello o te lo envío?', delay: 3000 },
    { type: 'user', text: 'Paso yo. ¿Me das la ubicación?', delay: 4500 },
    { type: 'bot', text: '📍 Av. Reforma 123. Tu pedido estará listo en 15 min.', delay: 6000 },
  ];

  return (
    <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-0">

      {/* 1. Dynamic Background */}
      <DynamicBackground />

      {/* 3. Main Content Container (Centered) */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center h-full">

        {/* Removed Badge as requested */}

        {/* Eyebrow / Top Title */}
        <p className="text-xl sm:text-2xl font-bold text-gray-300 mb-4 animate-fade-in-up uppercase tracking-widest">
          ¿Pierdes ventas mientras duermes?
        </p>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-white mb-6 animate-fade-in-up delay-100 uppercase leading-none drop-shadow-2xl max-w-5xl">
          Automatiza tu atención en WhatsApp y deja de perder ventas
        </h1>

        {/* Subheadline/Description */}
        <h2 className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200 leading-relaxed font-light mb-10">
          Tu primer empleado digital: trabaja 24/7 y cuesta una fracción de un sueldo mínimo
        </h2>

        {/* CTA */}
        <div className="flex flex-col items-center gap-6 animate-fade-in-up delay-300">
          <a href="https://wa.me/522206134842" target="_blank" rel="noopener noreferrer" className="group relative px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all transform hover:-translate-y-1 overflow-hidden">
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-base">
              PRUEBA SENIOR ROBOT AHORA <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>

          {/* Trust Signal (Users + Rating) */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[10, 12, 11, 8].map((imgId, i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-black bg-gray-700 overflow-hidden relative z-[${10 - i}]`}>
                  <img src={`https://i.pravatar.cc/100?img=${imgId}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start">
              <div className="flex text-yellow-400 text-sm">
                {'★★★★★'}
              </div>
              <p className="text-gray-400 text-xs font-medium">4.9/5 de valoración promedio.</p>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Floating Chats (Absolute Positioning) */}

      {/* Left Chat */}
      <div className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 hidden xl:block z-20 hover:z-30 transition-all duration-500 hover:scale-105 perspective-1000">
        <div className="transform rotate-y-6 rotate-z-2 shadow-2xl">
          <ChatSimulation messages={leftChatMessages} botName="Senior Robot AI" />
        </div>
      </div>

      {/* Right Chat */}
      <div className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 hidden xl:block z-20 hover:z-30 transition-all duration-500 hover:scale-105 perspective-1000">
        <div className="transform -rotate-y-6 -rotate-z-2 shadow-2xl">
          <ChatSimulation messages={rightChatMessages} botName="Senior Robot AI" status="escribiendo..." />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-6 { transform: rotateY(10deg); }
        .-rotate-y-6 { transform: rotateY(-10deg); }
      `}</style>
    </header>
  );
};

export default Header;