import React from 'react';
import { motion } from 'framer-motion';
import { Cog6ToothIcon, LinkIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import IconoMrRobotHead from '../assets/hero-faded-robot.svg';


const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: '1. Primer Contacto con el Cliente',
      description: 'Es el primer contacto con el Cliente para entender sus necesidades y definir el rumbo del proyecto.',
      icon: <Cog6ToothIcon className="w-8 h-8 text-emerald-400" />,
      position: 'lg:-translate-x-[350px] lg:translate-y-10', // Left
    },
    {
      id: 2,
      title: '2. Definir Alcances',
      description: 'Definimos los alcances del proceso, configuramos las respuestas clave y personalizamos la experiencia.',
      icon: <LinkIcon className="w-8 h-8 text-emerald-400" />,
      position: 'lg:-translate-y-16', // Center Top
    },
    {
      id: 3,
      title: '3. Configurar su número de WhatsApp',
      description: 'Configuramos tu número de WhatsApp para que el bot empiece a trabajar 24/7 de inmediato.',
      icon: <RocketLaunchIcon className="w-8 h-8 text-emerald-400" />,
      position: 'lg:translate-x-[350px] lg:translate-y-10', // Right
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
          Senior Robot Circular Process Flow
        </motion.h2>

        {/* Central Visualization Area - Increased height for mobile flow */}
        <div className="relative w-full min-h-[600px] lg:h-[700px] flex flex-col lg:justify-center items-center">

          {/* SVG Circuits */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Left Circuit - Tech Style */}
            <motion.path
              d="M50% 88% V 60% H 22% V 40%"
              fill="none"
              stroke="url(#circuitGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            {/* Left Dot */}
            <circle cx="22%" cy="40%" r="4" fill="#34D399" className="animate-pulse" />

            {/* Center Circuit */}
            <motion.path
              d="M50% 88% V 35%"
              fill="none"
              stroke="url(#circuitGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
            />
            {/* Center Dot */}
            <circle cx="50%" cy="35%" r="4" fill="#34D399" className="animate-pulse" />

            {/* Right Circuit - Tech Style */}
            <motion.path
              d="M50% 88% V 60% H 78% V 40%"
              fill="none"
              stroke="url(#circuitGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
            {/* Right Dot */}
            <circle cx="78%" cy="40%" r="4" fill="#34D399" className="animate-pulse" />

            {/* Moving Pulses on Circuits */}
            <circle r="3" fill="#ffffff">
              <animateMotion dur="4s" repeatCount="indefinite" path="M50% 88% V 60% H 22% V 40%" />
            </circle>
            <circle r="3" fill="#ffffff">
              <animateMotion dur="3s" repeatCount="indefinite" path="M50% 88% V 35%" />
            </circle>
            <circle r="3" fill="#ffffff">
              <animateMotion dur="4s" repeatCount="indefinite" path="M50% 88% V 60% H 78% V 40%" />
            </circle>
          </svg>

          {/* Steps - Positioned Absolute for Desktop (lg), Stacked for Mobile */}
          <div className="relative lg:absolute inset-0 flex flex-col lg:block items-center justify-center space-y-8 lg:space-y-0 w-full">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (index * 0.2) }}
                className={`
                            relative z-10 
                            w-full max-w-xs mx-auto lg:absolute lg:left-1/2 lg:top-1/4 lg:-ml-[160px]
                            p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl
                            transform ${step.position}
                            transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/50 hover:shadow-emerald-500/20 group
                            cursor-pointer
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
            className="relative z-20 mt-12 lg:mt-auto"
          >
            {/* Glowing Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/30 rounded-full blur-[60px] animate-pulse-slow"></div>

            <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full border border-emerald-500/50 bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.4)]">
              <div className="absolute inset-0 rounded-full border border-emerald-400/20 animate-spin-slow-reverse"></div>
              <img
                src="/mr-robot-logo.png"
                alt="Senior Robot Brain"
                className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_0_20px_rgba(52,211,153,0.6)]"
              />
            </div>
            {/* Connecting lines glowing base */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent -z-10"></div>
          </motion.div>

        </div>

      </div>

      <style>{`
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
        }
        @keyframes spin-slow-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
        }
        .animate-spin-slow-reverse {
            animation: spin-slow-reverse 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;