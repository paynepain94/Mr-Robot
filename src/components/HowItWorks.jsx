import React from 'react';
import { motion } from 'framer-motion';
import { Cog6ToothIcon, LinkIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import IconoMrRobotHead from '../assets/icon-mr-robot-head.svg';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: '1. Análisis Humano',
      description: 'Entendemos a fondo tu negocio y tus clientes para diseñar conversaciones ideales.',
      icon: <Cog6ToothIcon className="w-8 h-8 text-emerald-400" />,
      position: 'md:-translate-x-64 md:translate-y-12', // Left
    },
    {
      id: 2,
      title: '2. Creación a Medida',
      description: 'Programamos tu chatbot con respuestas clave, haciéndolo sentir humano y efectivo.',
      icon: <LinkIcon className="w-8 h-8 text-emerald-400" />,
      position: 'md:-translate-y-12', // Center Top
    },
    {
      id: 3,
      title: '3. Lanzamiento',
      description: 'Tu bot empieza a trabajar 24/7, y nosotros te acompañamos para asegurar su rendimiento.',
      icon: <RocketLaunchIcon className="w-8 h-8 text-emerald-400" />,
      position: 'md:translate-x-64 md:translate-y-12', // Right
    },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#022c22] text-white">

      {/* Background Grid/Texture Effect */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-center mb-24 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200"
        >
          Senior Robot Process Flow
        </motion.h2>

        {/* Central Visualization Area */}
        <div className="relative w-full h-[600px] flex justify-center items-end pb-10">

          {/* SVG Circuits */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>

            {/* Circuit Paths matching the card positions roughly */}
            {/* Left Path */}
            <motion.path
              d="M50% 90% C 30% 90%, 20% 60%, 25% 35%"
              fill="none"
              stroke="url(#circuitGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="opacity-50 md:block hidden"
            />

            {/* Center Path */}
            <motion.path
              d="M50% 90% L 50% 30%"
              fill="none"
              stroke="url(#circuitGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="opacity-50 md:block hidden"
            />

            {/* Right Path */}
            <motion.path
              d="M50% 90% C 70% 90%, 80% 60%, 75% 35%"
              fill="none"
              stroke="url(#circuitGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="opacity-50 md:block hidden"
            />

            {/* Animated Particles flowing on paths */}
            <circle r="4" fill="#34D399" className="hidden md:block">
              <animateMotion dur="3s" repeatCount="indefinite" path="M50% 90% C 30% 90%, 20% 60%, 25% 35%" />
            </circle>
            <circle r="4" fill="#34D399" className="hidden md:block">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M50% 90% L 50% 30%" />
            </circle>
            <circle r="4" fill="#34D399" className="hidden md:block">
              <animateMotion dur="3s" repeatCount="indefinite" path="M50% 90% C 70% 90%, 80% 60%, 75% 35%" />
            </circle>
          </svg>

          {/* Steps - Positioned Absolute for Desktop, Stacked for Mobile */}
          <div className="absolute inset-0 flex flex-col md:block">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (index * 0.2) }}
                className={`
                            relative z-10 
                            w-full max-w-xs mx-auto md:absolute md:left-1/2 md:top-1/4 md:-ml-[160px]
                            p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl
                            transform ${step.position}
                            transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/50 hover:shadow-emerald-500/20 group
                            cursor-pointer mb-8 md:mb-0
                        `}
              >
                <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-emerald-500/20 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-2 group-hover:text-emerald-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 text-center leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Central Robot Head (Source) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-20 mt-auto"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] animate-pulse-slow">
              <img
                src={IconoMrRobotHead}
                alt="Senior Robot Brain"
                className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]"
              />
            </div>
            {/* Connecting lines glowing base */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent -z-10"></div>
          </motion.div>

        </div>

      </div>

      <style>{`
        @keyframes pulse-slow {
            0%, 100% { box-shadow: 0 0 50px rgba(16,185,129,0.3); }
            50% { box-shadow: 0 0 80px rgba(16,185,129,0.6); }
        }
        .animate-pulse-slow {
            animation: pulse-slow 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;