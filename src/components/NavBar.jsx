import React from 'react';
import MrRobotNavLogo from '../assets/mr-robot-logo-circle.svg'; 

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-30 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          
          {/* LOGO/BRAND NAME - Ajuste el tamaño del texto para móvil */}
          <a href="#inicio" className="flex items-center space-x-3"> 
            <img 
              src={MrRobotNavLogo} 
              alt="Mr-Robot Logo" 
              className="h-12 w-12 sm:h-16 sm:w-16" 
            />
            {/* CAMBIO: Text size reducido a 'text-xl' en móvil */}
            <span className="text-xl sm:text-3xl font-extrabold text-text-dark">Mr-Robot</span>
          </a>
          
          {/* MENU LINKS - Ajustado el tamaño de la fuente y el espaciado para móvil */}
          <ul className="flex space-x-3 text-sm sm:space-x-6 sm:text-base"> 
            <li>
              <a 
                href="#inicio" 
                className="text-whatsapp-green font-semibold border-b-2 border-whatsapp-green pb-1 transition duration-200"
              >
                Inicio
              </a>
            </li>
            <li>
              <a 
                href="#conoceme" 
                className="text-gray-600 font-regular hover:text-whatsapp-green transition duration-200"
              >
                Conóceme
              </a>
            </li>
            <li>
              <a 
                href="#contacto" 
                className="text-gray-600 font-regular hover:text-whatsapp-green transition duration-200"
              >
                Contáctame
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;