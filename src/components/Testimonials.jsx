import React from 'react';

const Testimonials = () => {
  const testimonialsData = [
    {
      name: 'Juan Del Mar',
      role: 'Dueño de "Pesca Fresca"',
      quote: 'Mr-Robot transformó la forma en que atiendo a mis clientes. ¡Mi tiempo es mío otra vez!',
    },
    {
      name: 'Ana La Rosa',
      role: 'Emprendedora "Dulces Sueños"',
      quote: 'Ahora mis pedidos se gestionan solos. Increíble la facilidad y el impacto en mis ventas.',
    },
    {
        name: 'Carlos Sol',
        role: 'Gerente "EcoClean"',
        quote: 'La atención al cliente es 24/7 y la respuesta es impecable. ¡Altamente recomendado para microempresas!',
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-soft text-center">
      <div className="max-w-7xl mx-auto">
        {/* CAMBIO DE PESO: Titular de sección en Bold (ya estaba) */}
        <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-12">
          Lo que dicen nuestros clientes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-left">
              {/* CAMBIO DE PESO: Cita en Light Italic */}
              <p className="italic text-gray-700 mb-4 font-light">"{testimonial.quote}"</p>
              {/* CAMBIO DE PESO: Nombre en Bold */}
              <p className="font-bold text-text-dark">{testimonial.name}</p>
              {/* CAMBIO DE PESO: Rol en Light */}
              <p className="text-sm text-gray-500 font-light">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;