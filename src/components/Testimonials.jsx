import React from 'react';

const Testimonials = () => {
  const testimonialsData = [
    {
      name: 'Roberto "El Charro" Méndez',
      role: 'Dueño de Taquería Fuego y Sabor',
      quote: 'En una taquería el ritmo es frenético. Senior Robot automatizó nuestros pedidos de WhatsApp. Ahora no perdemos ni un solo cliente en hora pico, ¡incluso cuando estamos llenos!',
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
    <section className="relative py-20 sm:py-24 bg-black overflow-hidden font-sans">

      {/* Background Gradient & Noise */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#002b20_0%,_#000000_70%)] opacity-80"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">
          Lo que dicen nuestros clientes
        </h2>
      </div>

      {/* Contenedor del Carrusel Infinito */}
      <div className="relative w-full overflow-hidden z-10">
        {/* Máscaras de degradado para suavizar los bordes - Dark Mode */}
        <div className="absolute top-0 left-0 w-8 sm:w-16 h-full bg-gradient-to-r from-black to-transparent z-20"></div>
        <div className="absolute top-0 right-0 w-8 sm:w-16 h-full bg-gradient-to-l from-black to-transparent z-20"></div>

        {/* Track del Slider */}
        <div className="flex w-max animate-scroll-infinite hover:pause-animation py-12">
          {infiniteTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: '320px' }} // Ancho fijo + Padding px-2
            >
              <div className="group relative bg-[#001a14]/40 backdrop-blur-md rounded-2xl p-6 pt-12 border border-white/10
                              transition-all duration-300 ease-out
                              hover:scale-105 hover:border-[#00ffcc]/50 hover:shadow-[0_0_20px_rgba(0,255,204,0.2)]
                              h-full min-h-[320px] flex flex-col justify-center text-white">

                {/* Avatar Flotante */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#002b20] shadow-[0_0_15px_#00ffcc] group-hover:border-[#00ffcc] transition-colors duration-300"
                  />
                  {/* Outer glow ring for avatar */}
                  <div className="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(0,255,204,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Contenido */}
                <div className="text-center mt-4">
                  <p className="text-gray-300 italic mb-4 text-sm font-medium group-hover:text-white transition-colors duration-300 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <h3 className="text-base font-bold text-white group-hover:text-[#00ffcc] transition-colors duration-300">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
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