import React from 'react';

const ContactForm = () => {
  return (
    // ID "contacto" para el anclaje del menú
    <section id="contacto" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white text-center">
      <div className="max-w-7xl mx-auto">
        {/* Titular de sección en Bold */}
        <h2 className="text-3xl sm:text-4xl font-bold text-whatsapp-green mb-12">
          ¿Listo para transformar tu negocio?
        </h2>
        
        <div className="max-w-2xl mx-auto bg-gray-soft p-6 sm:p-8 rounded-lg shadow-lg">
          {/* Sub-titular en Bold */}
          <h3 className="text-2xl font-bold text-text-dark mb-6">Solicita tu Demostración</h3>
          <form className="space-y-6">
            {/* Los inputs usan el peso Regular por defecto, lo cual está bien */}
            <div>
              <input
                type="text"
                placeholder="Nombre Completo"
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-whatsapp-green focus:border-whatsapp-green transition duration-200"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-whatsapp-green focus:border-whatsapp-green transition duration-200"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Nombre de tu Negocio"
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-whatsapp-green focus:border-whatsapp-green transition duration-200"
              />
            </div>
            <div>
              <textarea
                placeholder="Cuéntanos un poco sobre tus necesidades..."
                rows="4"
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-whatsapp-green focus:border-whatsapp-green transition duration-200"
              ></textarea>
            </div>
            {/* Botón en SemiBold */}
            <button
              type="submit"
              className="w-full bg-whatsapp-green text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-whatsapp-dark transition duration-300 ease-in-out shadow-lg"
            >
              ¡Solicita una Demo Gratis!
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;