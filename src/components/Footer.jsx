import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-text-dark text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Columna 1: Logo y descripción */}
        <div>
          {/* Titular de footer en Bold */}
          <h3 className="text-2xl font-bold mb-4">Mr-Robot</h3>
          {/* Descripción en Light */}
          <p className="text-gray-400 text-sm font-light">
            Automatización inteligente de WhatsApp para microempresas. Crece más, trabaja menos.
          </p>
        </div>

        {/* Columna 2: Navegación */}
        <div>
          {/* Titular de sección en Bold */}
          <h4 className="text-xl font-bold mb-4">Explorar</h4>
          {/* Enlaces en Light */}
          <ul className="space-y-2 font-light">
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Inicio</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Beneficios</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Cómo Funciona</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Contacto</a></li>
          </ul>
        </div>

        {/* Columna 3: Legal y redes sociales */}
        <div>
          {/* Titular de sección en Bold */}
          <h4 className="text-xl font-bold mb-4">Legal</h4>
          {/* Enlaces en Light */}
          <ul className="space-y-2 mb-6 font-light">
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Política de Privacidad</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Términos y Condiciones</a></li>
          </ul>
          {/* Titular de sección en Bold */}
          <h4 className="text-xl font-bold mb-4">Síguenos</h4>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">FB</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">IG</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">LN</a>
          </div>
        </div>
      </div>
      {/* Copyright en Light */}
      <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-700 pt-8 font-light">
        © {new Date().getFullYear()} Mr-Robot. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;