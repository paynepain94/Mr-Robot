import React from 'react';

import instagramIcon from '../assets/instagram.svg';
import linkedinIcon from '../assets/linkedin.svg';
import tiktokIcon from '../assets/tiktok.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Enlaces proporcionados
  const privacidadLink = "https://drive.google.com/file/d/1AsZ5PTK4Iy311tuIk-RN3I_SZdoR7XJ6/view?usp=drive_link";
  const terminosLink = "https://drive.google.com/file/d/1iR9m2gGuxWHrPzEwktlCo7v5pxPoLLLq/view?usp=sharing";

  return (
    <footer className="relative bg-black text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 font-sans">
      {/* Background Gradient & Noise */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#002b20_0%,_#000000_70%)] opacity-80"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Columna 1: Logo y descripción */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-[#00ffcc] drop-shadow-[0_0_5px_rgba(0,255,204,0.5)]">Senior Robot</h3>
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            Automatización inteligente de WhatsApp para microempresas. Crece más, trabaja menos.
          </p>
        </div>

        {/* Columna 2: Navegación */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-white">Explorar</h4>
          <ul className="space-y-2 font-light">
            <li><a href="#Header" className="text-gray-400 hover:text-[#00ffcc] transition duration-200">Inicio</a></li>
            <li><a href="#Benefits" className="text-gray-400 hover:text-[#00ffcc] transition duration-200">Beneficios</a></li>
            <li><a href="#HowItWorks" className="text-gray-400 hover:text-[#00ffcc] transition duration-200">Cómo Funciona</a></li>
            <li><a href="#Contact" className="text-gray-400 hover:text-[#00ffcc] transition duration-200">Contacto</a></li>
          </ul>
        </div>

        {/* Columna 3: Legal y Redes sociales */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-white">Legal</h4>
          <ul className="space-y-2 mb-6 font-light">
            {/* ENLACE TÉRMINOS Y CONDICIONES ACTUALIZADO */}
            <li>
              <a
                href={terminosLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ffcc] transition duration-200"
              >
                Términos y Condiciones
              </a>
            </li>
            {/* ENLACE AVISO DE PRIVACIDAD ACTUALIZADO Y REUBICADO */}
            <li>
              <a
                href={privacidadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ffcc] transition duration-200"
              >
                Aviso de Privacidad
              </a>
            </li>
          </ul>

          <h4 className="text-xl font-bold mb-4 text-white">Síguenos</h4>

          <div className="flex space-x-4 justify-center md:justify-start items-center">

            {/* Instagram */}
            <a
              href="https://www.instagram.com/mr.robot.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-200 opacity-60 hover:opacity-100 hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(0,255,204,0.8)]"
            >
              <img src={instagramIcon} alt="Instagram" className="h-6 w-6 object-contain invert" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/joabromero94/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-200 opacity-60 hover:opacity-100 hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(0,255,204,0.8)]"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="h-6 w-6 object-contain invert" />
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@mr_robot_mx"
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-200 opacity-60 hover:opacity-100 hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(0,255,204,0.8)]"
            >
              <img src={tiktokIcon} alt="TikTok" className="h-6 w-6 object-contain invert" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 text-center text-gray-500 text-sm mt-12 border-t border-white/10 pt-8 font-light">
        <span className="text-gray-500">
          © {currentYear} Senior Robot. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;