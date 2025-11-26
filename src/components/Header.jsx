import React from 'react';
import { CheckCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import DynamicBackground from './DynamicBackground';
import ChatSimulation from './ChatSimulation';
import HeroRobotGif from '../assets/hero-faded-robot.gif';

const Header = () => {
  return (
    <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-0">

      {/* 1. Dynamic Background */}
      <DynamicBackground />

      {/* 2. Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">

        {/* --- Left Column: Copy & CTAs --- */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 lg:pr-12">

          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm animate-fade-in-down">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-semibold text-emerald-800 tracking-wide">
              IA Revolucionaria para WhatsApp
            </span>
          </div>

          {/* Headline (Visual only, semantically secondary) */}
          <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight animate-fade-in-up">
            ¿Pierdes ventas mientras duermes?
          </p>

          {/* Main H1 (SEO optimized) */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mt-4 animate-fade-in-up delay-100">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Mr-Robot vende por ti 24/7. Sin sueldos, sin descansos, solo resultados.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-200">
            Convierte chats de WhatsApp en ventas automáticamente. Respuestas instantáneas que eliminan costos y escalan tu atención al cliente sin límites.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up delay-300">
            <a href="https://wa.me/523317106005" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <span className="text-xl">🚀</span>
              Empieza a automatizar hoy
            </a>
          </div>

          {/* Trust Signal */}
          <div className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-gray-500 animate-fade-in-up delay-300">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <p>⭐ 4.9/5 de valoración promedio.</p>
          </div>
        </div>

        {/* --- Right Column: Visuals (Robot + Chat) --- */}
        <div className="w-full lg:w-1/2 mt-32 lg:mt-0 relative flex items-center justify-center perspective-1000">

          {/* Visuals Wrapper - Keeps elements together and centered */}
          <div className="relative w-auto h-auto">

            {/* Robot GIF (Floating) */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 z-10 animate-float-slow -translate-x-20 sm:-translate-x-16 lg:-translate-x-24">
              <img
                src={HeroRobotGif}
                alt="Mr. Robot AI"
                className="w-full h-full object-contain mix-blend-multiply"
              />

              {/* Glowing Effect behind Robot */}
              <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full -z-10 animate-pulse-slow"></div>
            </div>

            {/* Chat Simulation (Overlapping/Positioned relative to wrapper) */}
            <div className="absolute -right-24 bottom-0 sm:-right-20 sm:bottom-10 lg:-right-36 lg:bottom-12 z-20 transform scale-75 sm:scale-90 lg:scale-100 origin-bottom-right">
              <ChatSimulation />
            </div>

          </div>

          {/* Decorative Elements (Background) */}
          <div className="absolute top-0 right-0 lg:right-10 w-20 h-20 bg-teal-100 rounded-full blur-xl opacity-50 animate-blob"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-emerald-100 rounded-full blur-xl opacity-50 animate-blob animation-delay-2000"></div>

        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(-20px);
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          to { opacity: 1; transform: translateY(0); }
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </header>
  );
};

export default Header;