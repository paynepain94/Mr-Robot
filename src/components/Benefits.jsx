import React from 'react';

// --- IMPORTA TUS ILUSTRACIONES AQUÍ ---
import tiempo from '../assets/tiempo.svg';
import ventas from '../assets/ventas.svg';
import atencion from '../assets/atencion.svg';
import escala from '../assets/escala.svg';
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
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-soft text-center">
      <div className="max-w-7xl mx-auto">
        {/* CAMBIO DE PESO: Titular de sección en Bold (ya estaba) */}
        <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-12">
          ¿Por qué elegir Mr-Robot?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefitsData.map((benefit, index) => (
            <div 
              key={index} 
              className="relative bg-white p-6 sm:p-8 rounded-xl shadow-md overflow-hidden 
                         flex flex-col items-center justify-center text-center h-72 sm:h-80" 
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,255,240,1) 100%)',
                border: '1px solid #e6ffe6'
              }}
            >
              <img 
                 src={benefit.illustration} 
                 alt={benefit.title} 
                 className={`${benefit.sizeClass} object-contain mx-auto mb-4`} 
              />

              <div className="w-full text-center"> 
                {/* CAMBIO DE PESO: Titular de tarjeta en Bold */}
                <h3 className="text-xl font-bold text-text-dark mb-2">{benefit.title}</h3>
                {/* CAMBIO DE PESO: Descripción en Light */}
                <p className="text-gray-600 text-sm font-light">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;