import React from 'react';
import { motion } from 'framer-motion';
import { Cog6ToothIcon, LinkIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import IconoMrRobotHead from '../assets/hero-faded-robot.svg';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: '1. Primer Contacto',
      description: 'Entendemos tus necesidades y definimos el rumbo del proyecto.',
      icon: <Cog6ToothIcon className="w-8 h-8 text-white" />,
      positionClass: 'lg:top-[27%] lg:left-[8%]',
    },
    {
      id: 2,
      title: '2. Definir Alcances',
      description: 'Configuramos respuestas clave y personalizamos la experiencia.',
      icon: <LinkIcon className="w-8 h-8 text-white" />,
      // Modified: Moved to 18% to bring it closer to the actual circuit termination
      positionClass: 'lg:top-[15%] lg:left-[38%] lg:-translate-x-1/2',
    },
    {
      id: 3,
      title: '3. Configuración',
      description: 'Tu bot de WhatsApp listo para trabajar 24/7 de inmediato.',
      icon: <RocketLaunchIcon className="w-8 h-8 text-white" />,
      positionClass: 'lg:top-[27%] lg:right-[8%]',
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#000000] overflow-hidden font-sans text-white py-20 flex flex-col items-center justify-center">

      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_center,_#002419_0%,_#000000_70%)]"></div>

      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto h-[900px] lg:h-[750px]">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center relative mb-12 lg:mb-0 lg:absolute lg:top-0 w-full z-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(0,255,204,0.6)]">
            Proceso de Integración
          </h2>
        </motion.div>

        {/* --- Circuit Layer --- */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="neonTrace" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00ffcc" stopOpacity="1" />
              <stop offset="100%" stopColor="#ccff00" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="neonTraceFaint" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#00ffcc" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glowTrace" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 
             Robot Base Center: 50, 85
          */}

          {/* --- LEFT BUS --- */}
          <g stroke="url(#neonTrace)" strokeWidth="0.3" fill="none" filter="url(#glowTrace)">
            <path d="M 46 85 L 35 85 L 20 60 L 20 54" />
            <path d="M 46 86 L 34 86 L 19 61 L 19 54" />
            <path d="M 46 87 L 33 87 L 18 62 L 18 54" />
            <path d="M 46 84 L 36 84 L 21 59 L 21 54" />
            <path d="M 46 83 L 37 83 L 22 58 L 22 54" />
            <path d="M 46 82 L 38 82 L 23 57 L 23 54" />
            {[18, 19, 20, 21, 22, 23].map((x, i) => (
              <circle key={`l-${i}`} cx={x} cy="54" r="0.4" fill="#00ffcc" />
            ))}
          </g>

          {/* --- RIGHT BUS --- */}
          <g stroke="url(#neonTrace)" strokeWidth="0.3" fill="none" filter="url(#glowTrace)">
            <path d="M 54 85 L 65 85 L 80 60 L 80 54" />
            <path d="M 54 86 L 66 86 L 81 61 L 81 54" />
            <path d="M 54 87 L 67 87 L 82 62 L 82 54" />
            <path d="M 54 84 L 64 84 L 79 59 L 79 54" />
            <path d="M 54 83 L 63 83 L 78 58 L 78 54" />
            <path d="M 54 82 L 62 82 L 77 57 L 77 54" />
            {[77, 78, 79, 80, 81, 82].map((x, i) => (
              <circle key={`r-${i}`} cx={x} cy="54" r="0.4" fill="#00ffcc" />
            ))}
          </g>

          {/* --- CENTER BUS (EXTENDED TO y=42) --- */}
          {/* Extended higher to ensure visual connection with the card */}
          <g stroke="url(#neonTrace)" strokeWidth="0.3" fill="none" filter="url(#glowTrace)">
            {/* Central straight line up to 42 */}
            <path d="M 50 80 L 50 42" />

            {/* Side lines fanning and reaching up to 42 */}
            <path d="M 49 80 L 49 55 L 48 50 L 48 42" />
            <path d="M 51 80 L 51 55 L 52 50 L 52 42" />

            {/* Wide lines */}
            <path d="M 48 80 L 48 60 L 46 55 L 46 42" />
            <path d="M 52 80 L 52 60 L 54 55 L 54 42" />

            {/* Terminals at y=42 */}
            {[46, 48, 50, 52, 54].map((x, i) => (
              <circle key={`c-${i}`} cx={x} cy="42" r="0.4" fill="#00ffcc" />
            ))}
          </g>

          {/* --- EXTRA DECORATIVE --- */}
          <g stroke="url(#neonTraceFaint)" strokeWidth="0.2" fill="none">
            <path d="M 20 54 L 20 45 L 10 35" />
            <path d="M 18 54 L 18 40 L 5 25" />
            <path d="M 80 54 L 80 45 L 90 35" />
            <path d="M 82 54 L 82 40 L 95 25" />
            {/* Extra Center detail */}
            <path d="M 50 42 L 50 35" opacity="0.5" />
          </g>

          {/* Data Sparks (Multiple & Staggered) */}
          {/* Left Bus Sparks */}
          {[0, 1.5, 3].map((delay, i) => (
            <circle key={`spark-l-${i}`} r="1" fill="#fff" filter="url(#glowTrace)">
              <animateMotion dur="4s" repeatCount="indefinite" begin={`${delay}s`} path="M 46 85 L 35 85 L 20 60 L 20 54" />
            </circle>
          ))}
          {/* Right Bus Sparks */}
          {[0.5, 2, 3.5].map((delay, i) => (
            <circle key={`spark-r-${i}`} r="1" fill="#fff" filter="url(#glowTrace)">
              <animateMotion dur="4s" repeatCount="indefinite" begin={`${delay}s`} path="M 54 85 L 65 85 L 80 60 L 80 54" />
            </circle>
          ))}
          {/* Center Bus Sparks */}
          {[0.2, 1.8, 3.2].map((delay, i) => (
            <circle key={`spark-c-${i}`} r="1" fill="#fff" filter="url(#glowTrace)">
              <animateMotion dur="3s" repeatCount="indefinite" begin={`${delay}s`} path="M 50 80 L 50 42" />
            </circle>
          ))}

        </svg>

        {/* --- Cards --- */}
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`
              relative z-10 w-[300px] p-8 lg:absolute ${step.positionClass} mx-auto mb-8 lg:mb-0
              bg-white/5 backdrop-blur-[12px] 
              border border-white/20 rounded-[20px]
              shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
              hover:border-[#00ffcc]/50 hover:shadow-[0_0_30px_rgba(0,255,204,0.3)]
              transition-all duration-300 group
            `}
          >
            {/* Number Indicator */}
            <div className={`
                absolute -top-4 -left-4 w-10 h-10 
                bg-[#001a14] border border-[#00ffcc] rounded-full 
                flex items-center justify-center text-[#00ffcc] font-bold 
                shadow-[0_0_10px_#00ffcc]
                group-hover:scale-110 transition-transform duration-300
            `}>
              {step.id}
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 text-white group-hover:text-[#00ffcc] transition-colors duration-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white tracking-wide">
                {step.title}
              </h3>
              <p className="text-sm text-gray-300 font-light leading-relaxed opacity-90">
                {step.description}
              </p>
            </div>

            {/* Visual Anchor Dot */}
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#00ffcc] shadow-[0_0_8px_#00ffcc]"></div>
          </motion.div>
        ))}

        {/* --- Robot Central --- */}
        <div className="relative mx-auto mt-auto lg:absolute lg:bottom-[5%] lg:left-1/2 lg:-translate-x-1/2 w-48 h-48 flex justify-center items-center z-20">
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-[#00ffcc]/30 blur-[60px] rounded-full animate-pulse-slow"></div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            {/* Robot Head */}
            <img
              src={IconoMrRobotHead}
              alt="Central AI Node"
              className="w-36 h-36 drop-shadow-[0_0_20px_#00ffcc]"
            />
          </motion.div>
        </div>

      </div>

      <style>{`
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;