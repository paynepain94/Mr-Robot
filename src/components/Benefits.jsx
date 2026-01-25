import React from 'react';
import { motion } from 'framer-motion';
// Removing Heroicons imports
// Suggesting Imports for new images
import ImgRelog from '@/assets/reloj.png';
import ImgVentas from '@/assets/ventas.png';
import ImgRobot from '@/assets/robot.png';
import ImgEscala from '@/assets/escala.png';

const Benefits = () => {
  const features = [
    {
      id: '01',
      title: 'Ahorra Tiempo',
      description: 'Automatiza respuestas repetitivas y dedica tu energía a lo que realmente importa.',
      icon: ImgRelog,
    },
    {
      id: '02',
      title: 'Impulsa Ventas',
      description: 'Respuestas instantáneas que convierten consultas en ventas confirmadas.',
      icon: ImgVentas,
    },
    {
      id: '03',
      title: 'Mejora la Atención',
      description: 'Clientes satisfechos con respuestas al instante, 24/7 sin descanso.',
      icon: ImgRobot,
    },
    {
      id: '04',
      title: 'Escala sin Límites',
      description: 'Maneja cientos de conversaciones simultáneamente sin aumentar costos.',
      icon: ImgEscala,
    },
  ];

  return (
    <section className="relative w-full py-24 px-4 bg-black overflow-hidden font-sans">

      {/* 1. Fondo: Black with Green Radial Gradient & Honeycomb Pattern */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#002b20_0%,_#000000_70%)] opacity-80"></div>
        {/* Honeycomb Pattern (SVG) */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%2300ffcc' stroke-width='1'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%2300ffcc' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '56px 100px'
          }}>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Encabezado */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center text-white mb-16 tracking-wide drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]"
        >
          ¿Por qué elegir Senior Robot?
        </motion.h2>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative group h-full"
            >
              {/* 
                  2. Contenedor Hexagonal "Cyberpunk" 
              */}
              <div
                className="
                  relative h-full p-[1px] 
                  bg-gradient-to-r from-[#00ffcc]/30 via-transparent to-[#00ffcc]/30
                  clip-path-hex
                "
                style={{
                  clipPath: 'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0% 50%)'
                }}
              >
                {/* Inner Card Content */}
                <div
                  className="
                    relative h-full bg-[#001a14]/60 backdrop-blur-xl 
                    flex flex-col justify-center
                    p-8 lg:p-10
                    hover:bg-[#002b20]/80 transition-all duration-300
                  "
                  style={{
                    clipPath: 'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0% 50%)'
                  }}
                >

                  {/* Top & Bottom "Light Tube" Accents */}
                  <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-[#00ffcc] shadow-[0_0_15px_#00ffcc]"></div>
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-[#00ffcc] shadow-[0_0_15px_#00ffcc]"></div>

                  {/* 3. Contenido */}
                  <div className="flex items-center justify-between relative z-20">

                    {/* Image Icon Left */}
                    <div className="mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="w-16 h-16 lg:w-20 lg:h-20 object-contain drop-shadow-[0_0_10px_rgba(0,255,204,0.5)]"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 text-left z-20">
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-[#00ffcc] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-sm lg:text-base leading-relaxed opacity-90">
                        {feature.description}
                      </p>
                    </div>

                    {/* Large Background Number */}
                    <div className="absolute -top-4 -right-2 text-7xl font-black text-[#00ffcc] opacity-10 select-none z-10 pointer-events-none">
                      {feature.id}
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Benefits;