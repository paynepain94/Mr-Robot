import React from 'react';

// --- IMPORTAR EL ICONO PNG LOCAL ---
import WhatsappIcon from '../assets/whatsapp_icon.png'; 
// ------------------------------------

const WhatsappButton = () => {
  const phoneNumber = '5213317106005'; 
  const message = encodeURIComponent('¡Hola! Me interesa saber mas de Mr-Robot');

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    // Contenedor fijo en la esquina inferior derecha
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        // --- CLASES MODIFICADAS ---
        // AÑADIDO: rounded-full y overflow-hidden
        className="flex items-center justify-center 
                   w-16 h-16 shadow-xl rounded-full overflow-hidden" // <<-- ¡CAMBIOS CLAVE AQUÍ!
        title="Enviar mensaje por WhatsApp"
      >
        {/* La animación y el hover se mantienen en la imagen */}
        <img 
          src={WhatsappIcon} 
          alt="WhatsApp Icon" 
          // La animación se aplica a la imagen para que todo el botón gire
          className="w-full h-full transform hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
        />
      </a>
    </div>
  );
};

export default WhatsappButton;