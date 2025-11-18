import React from 'react';

// Importa el logo que usará la barra de navegación
import MrRobotNavLogo from '../assets/mr-robot-logo-circle.svg'; 

const NavBar = () => {
  return (
    // --- MENÚ DE NAVEGACIÓN STICKY (z-30) ---
    // Clases clave:
    // sticky: Hace que se pegue
    // top-0: Lo pega en la parte superior
    // z-30: Asegura que esté por encima de todo el contenido de la página
    // bg-white: Le da un fondo sólido para que el contenido no se vea a través de él
    // shadow-md: Añade una sombra sutil cuando se despega del header
    <nav className="sticky top-0 z-30 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          
          <a href="#inicio" className="flex items-center space-x-3">
            <img 
              src={MrRobotNavLogo} 
              alt="Mr-Robot Logo" 
              className="h-12 w-12 sm:h-16 sm:w-16" 
            />
            <span className="text-3xl font-extrabold text-text-dark">Mr-Robot</span>
          </a>
          
          <ul className="flex space-x-6 sm:space-x-8">
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
    </nav>
    // --- FIN DEL MENÚ ---
  );
};

export default NavBar;