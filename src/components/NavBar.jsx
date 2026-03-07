import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import MrRobotNavLogo from '../assets/mr-robot-logo-circle.svg';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md shadow-lg border-b border-white/10 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">

          {/* Logo y Nombre de la Marca */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <img
              src={MrRobotNavLogo}
              alt="Senior Robot Logo"
              className="h-14 w-14 sm:h-16 sm:w-16 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">Senior Robot</span>
          </Link>

          {/* BOTÓN DE HAMBURGUESA (visible solo en móvil) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-300 hover:text-emerald-400 focus:outline-none focus:text-emerald-400 transition duration-150 ease-in-out"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
          </div>

          {/* MENÚ DE ESCRITORIO (siempre visible en md y más grande) */}
          <ul className="hidden md:flex items-center space-x-2">
            <li>
              <Link
                to="/"
                className="px-4 py-2 text-base font-medium text-gray-300 rounded-full hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                Inicio
              </Link>
            </li>
            <li>
              <a
                href="/#conoceme"
                className="px-4 py-2 text-base font-medium text-gray-300 rounded-full hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                Conóceme
              </a>
            </li>
            <li className="ml-4">
              <a
                href="https://wa.me/523121128434"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 text-base font-bold text-black bg-emerald-500 rounded-xl hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:shadow-[0_0_20px_rgba(16,185,129,0.7)] transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Contáctame
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* --- MENÚ MÓVIL (se muestra/oculta con el estado) --- */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden bg-[#0f172a]/95 backdrop-blur-xl border-t border-white/10 shadow-lg`}
      >
        <ul className="px-4 pt-4 pb-6 space-y-3 text-center">
          <li>
            <Link
              to="/"
              onClick={handleNavLinkClick}
              className="block py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition duration-200"
            >
              Inicio
            </Link>
          </li>
          <li>
            <a
              href="/#conoceme"
              onClick={handleNavLinkClick}
              className="block py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition duration-200"
            >
              Conóceme
            </a>
          </li>
          <li className="pt-2">
            <a
              href="https://wa.me/523121128434"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavLinkClick}
              className="block w-full py-3 text-base font-bold text-black bg-emerald-500 rounded-xl hover:bg-emerald-400 shadow-md transition duration-200"
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