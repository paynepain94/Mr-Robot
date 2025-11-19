import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Iconos de Heroicons
import MrRobotNavLogo from '../assets/mr-robot-logo-circle.svg'; 

const NavBar = () => {
  // Estado para controlar si el menú está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Función para manejar la navegación (cierra el menú al hacer clic)
  const handleNavLinkClick = () => {
    setIsOpen(false); // Cierra el menú
    // Nota: La navegación al ancla (#) se maneja automáticamente por el 'href'
  };

  return (
    // El 'nav' se mantiene sticky
    <nav className="sticky top-0 z-30 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo y Nombre de la Marca */}
          <a href="#inicio" className="flex items-center space-x-3 flex-shrink-0">
            <img 
              src={MrRobotNavLogo} 
              alt="Mr-Robot Logo" 
              className="h-12 w-12 sm:h-16 sm:w-16" 
            />
            <span className="text-xl sm:text-3xl font-extrabold text-text-dark">Mr-Robot</span>
          </a>
          
          {/* BOTÓN DE HAMBURGUESA (visible solo en móvil) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 hover:text-whatsapp-green focus:outline-none focus:text-whatsapp-green transition duration-150 ease-in-out"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-8 w-8" /> // Icono de 'X' cuando está abierto
              ) : (
                <Bars3Icon className="h-8 w-8" /> // Icono de hamburguesa cuando está cerrado
              )}
            </button>
          </div>

          {/* MENÚ DE ESCRITORIO (siempre visible en md y más grande) */}
          <ul className="hidden md:flex space-x-6 sm:space-x-8"> 
            <li>
              <a 
                href="#inicio" 
                className="text-base text-whatsapp-green font-semibold border-b-2 border-whatsapp-green pb-1 transition duration-200"
              >
                Inicio
              </a>
            </li>
            <li>
              <a 
                href="#conoceme" 
                className="text-base text-gray-600 font-regular hover:text-whatsapp-green transition duration-200"
              >
                Conóceme
              </a>
            </li>
            <li>
              <a 
                href="#contacto" 
                className="text-base text-gray-600 font-regular hover:text-whatsapp-green transition duration-200"
              >
                Contáctame
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* --- MENÚ MÓVIL (se muestra/oculta con el estado) --- */}
      {/* Usamos el ternario para aplicar las clases de visibilidad y animación */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center bg-gray-50 border-t border-gray-200">
          <li>
            <a 
              href="#inicio" 
              onClick={handleNavLinkClick}
              className="block py-2 text-whatsapp-green font-semibold border-b-2 border-whatsapp-green transition duration-200"
            >
              Inicio
            </a>
          </li>
          <li>
            <a 
              href="#conoceme" 
              onClick={handleNavLinkClick}
              className="block py-2 text-text-dark font-regular hover:text-whatsapp-green transition duration-200"
            >
              Conóceme
            </a>
          </li>
          <li>
            <a 
              href="#contacto" 
              onClick={handleNavLinkClick}
              className="block py-2 text-text-dark font-regular hover:text-whatsapp-green transition duration-200"
            >
              Contáctame
            </a>
          </li>
        </ul>
      </div>
      {/* --- FIN MENÚ MÓVIL --- */}

    </nav>
  );
};

export default NavBar;