import React from 'react';

// --- IMPORTA TUS ILUSTRACIONES AQUÍ ---
import tiempo from '../assets/tiempo.svg';
import ventas from '../assets/ventas.svg';
import atencion from '../assets/atencion.svg';
import escala from '../assets/escala.svg';

// --- IMPORTA LOS PATRONES DE FONDO ---
import techLinesBottom from '../assets/tech-lines-bottom.svg';
import techLinesTop from '../assets/tech-lines-top.svg';
import techLinesTopLeft from '../assets/tech-lines-top-left.svg';
// ------------------------------------

const Benefits = () => {
  const benefitsData = [
    {
      illustration: tiempo,
      title: 'Ahorra Tiempo',
      description: 'Automatiza respuestas repetitivas y dedica tu energía a lo que realmente importa.',
      sizeClass: 'w-56 h-56',
    },
    {
      illustration: ventas,
      title: 'Impulsa Ventas',
      description: 'Respuestas instantáneas que convierten consultas en ventas confirmadas.',
      sizeClass: 'w-56 h-56',
    },
    {
      illustration: atencion,
      title: 'Mejora la Atención',
      description: 'Clientes satisfechos con respuestas al instante, 24/7 sin descanso.',
      sizeClass: 'w-56 h-56',
    },
    {
      illustration: escala,
      title: 'Escala sin Límites',
      description: 'Maneja cientos de conversaciones simultáneamente sin aumentar costos.',
      sizeClass: 'w-56 h-56',
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 text-center overflow-hidden">

      {/* --- PATRONES DE FONDO (Tech Lines) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img src={techLinesTopLeft} alt="" className="absolute top-0 left-0 w-64 sm:w-96 opacity-5" />
        <img src={techLinesTop} alt="" className="absolute top-0 right-0 w-full sm:w-2/3 opacity-5" />
        <img src={techLinesBottom} alt="" className="absolute bottom-0 left-0 w-full opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Titular de sección en Bold */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12">
          ¿Por qué elegir Mr-Robot?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              // --- CAMBIOS AQUÍ: Animación, Efecto de Levantamiento y Bordes Interactivos ---
              className="group relative bg-white p-6 sm:p-8 rounded-xl shadow-md overflow-hidden 
                         flex flex-col items-center justify-center text-center h-72 sm:h-80
                         transform transition-all duration-300 ease-in-out 
                         hover:scale-[1.02] hover:shadow-xl hover:border-[#25D366] border border-[#e6ffe6] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,255,240,1) 100%)',
              }}
            >
              {/* --- MARCA DE AGUA (Watermark Number) --- */}
              <div className="absolute top-2 right-4 text-6xl sm:text-7xl font-extrabold text-gray-100 group-hover:text-gray-200 transition-colors duration-300 select-none pointer-events-none">
                {`0${index + 1}`}
              </div>

              <img
                src={benefit.illustration}
                alt={benefit.title}
                className={`${benefit.sizeClass} object-contain mx-auto mb-4 relative z-10`}
              />

              <div className="w-full text-center relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#25D366] transition-colors duration-300">{benefit.title}</h3>
                <p className="text-gray-600 text-sm font-medium">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;