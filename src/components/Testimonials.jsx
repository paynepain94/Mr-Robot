import React from 'react';

const Testimonials = () => {
  const testimonialsData = [
    {
      name: 'Roberto "El Charro" Méndez',
      role: 'Dueño de Taquería Fuego y Sabor',
      quote: 'En una taquería el ritmo es frenético. Mr-Robot automatizó nuestros pedidos de WhatsApp. Ahora no perdemos ni un solo cliente en hora pico, ¡incluso cuando estamos llenos!',
      image: 'https://i.pravatar.cc/150?img=11', // Foto real/estilo persona
    },
    {
      name: 'Sofía Valenzuela',
      role: 'Fundadora de Velvet Boutique',
      quote: 'Mis clientas querían ver el catálogo a las 2 AM. Gracias a la automatización, vendo vestidos mientras duermo. La integración fue elegante y perfecta para mi marca.',
      image: 'https://i.pravatar.cc/150?img=5', // Foto estilo fashion
    },
    {
      name: 'Gerencia General',
      role: 'Hotel Casa de Piedra',
      quote: 'La gestión de reservas y dudas frecuentes nos consumía horas en recepción. El sistema ahora responde al instante, mejorando la experiencia de nuestros huéspedes antes de llegar.',
      image: 'https://i.pravatar.cc/150?img=33', // Foto formal
    },
    {
      name: 'Carlos Dávila',
      role: 'Dávila Seminuevos Premium',
      quote: 'Filtrar a los curiosos de los compradores reales era agotador. El chatbot califica a los prospectos y solo me pasa a quienes están listos para comprar su auto hoy.',
      image: 'https://i.pravatar.cc/150?img=60', // Foto profesional
    },
  ];

  // Duplicamos los datos 3 veces para asegurar un loop suave y cobertura total
  const infiniteTestimonials = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  return (
    <section className="py-20 sm:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Lo que dicen nuestros clientes
        </h2>
      </div>

      {/* Contenedor del Carrusel Infinito */}
      <div className="relative w-full overflow-hidden">
        {/* Máscaras de degradado para suavizar los bordes */}
        <div className="absolute top-0 left-0 w-8 sm:w-16 h-full bg-gradient-to-r from-gray-50 to-transparent z-20"></div>
        <div className="absolute top-0 right-0 w-8 sm:w-16 h-full bg-gradient-to-l from-gray-50 to-transparent z-20"></div>

        {/* Track del Slider */}
        <div className="flex w-max animate-scroll-infinite hover:pause-animation py-12">
          {infiniteTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: '320px' }} // Ancho fijo + Padding px-2 (8px+8px=16px gap)
            >
              <div className="group relative bg-white rounded-2xl p-6 pt-12 shadow-sm border border-transparent 
                              transition-all duration-300 ease-out
                              hover:scale-105 hover:border-[#00FF9C] hover:shadow-[0_0_15px_rgba(0,255,156,0.4)]
                              h-full min-h-[320px] flex flex-col justify-center">

                {/* Avatar Flotante */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md group-hover:border-[#00FF9C] transition-colors duration-300"
                  />
                </div>

                {/* Contenido */}
                <div className="text-center mt-4">
                  <p className="text-gray-600 italic mb-4 text-sm font-medium group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#00FF9C] transition-colors duration-300">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos para la animación */}
      <style>{`
        /* 
           Cálculo para Loop Perfecto (Izquierda a Derecha):
           Ancho de un item = 320px (incluye padding porque box-sizing es border-box por defecto en Tailwind)
           Items por set = 4
           Ancho de un set = 4 * 320px = 1280px.
           
           Animación:
           Start: translateX(-1280px) (Mostrando el 2do set)
           End: translateX(0) (Mostrando el 1er set, que empuja al 2do a la derecha)
        */
        @keyframes scroll-loop {
          0% { transform: translateX(-1280px); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-infinite {
          animation: scroll-loop 20s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;