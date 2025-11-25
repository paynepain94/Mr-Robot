import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

// --- IMPORTAR LA FOTO AQUÍ ---
import JoabFoto from '../assets/joab-romero-foto.jpg';
// -----------------------------

const Conoceme = () => {
  return (
    <section id="conoceme" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* --- COLUMNA IZQUIERDA: FOTO CON PERSONALIDAD --- */}
          <div className="relative flex justify-center md:justify-end">
            {/* Elemento gráfico decorativo (Círculo desplazado) */}
            <div className="absolute top-4 right-4 md:-right-4 w-64 h-64 sm:w-80 sm:h-80 bg-emerald-100 rounded-full -z-10 blur-sm"></div>

            {/* Contenedor de la imagen con borde y sombra */}
            <div className="relative">
              <img
                src={JoabFoto}
                alt="Joab Romero, Fundador de Mr-Robot"
                className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-2xl shadow-2xl border-4 border-white transform transition-transform duration-500 hover:scale-[1.02]"
              />
              {/* Pequeño detalle de "verificado" o adorno */}
              <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                <span className="text-2xl">👨‍💻</span>
              </div>
            </div>
          </div>

          {/* --- COLUMNA DERECHA: TEXTO Y JERARQUÍA --- */}
          <div className="text-left">

            {/* Etiqueta "Fundador" en Negrita */}
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold tracking-wide uppercase mb-4">
              Fundador
            </span>

            {/* Nombre en ExtraBold */}
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Joab Romero
            </h2>

            {/* Historia en Regular (No Light) */}
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                Soy ingeniero en desarrollo de software con más de 15 años dedicándome a la tecnología. Durante más de una década, he ayudado a empresas en México y el extranjero a <span className="font-semibold text-gray-800">reducir hasta un 70% sus gastos operativos</span> mediante automatización inteligente.
              </p>
              <p>
                Me apasiona la ciberseguridad y la inteligencia artificial, pero mi verdadero enfoque es práctico: encontrar la manera más eficiente de que tu negocio ahorre tiempo y dinero.
              </p>
              <p className="font-medium text-emerald-700">
                Cuento con certificaciones internacionales que respaldan mi experiencia técnica y estratégica.
              </p>
            </div>

            {/* CTA LinkedIn */}
            <div className="mt-8">
              <a
                href="https://www.linkedin.com/in/joabromero94/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700 transition-colors group"
              >
                <span className="border-b-2 border-emerald-200 group-hover:border-emerald-600 transition-colors">
                  Ver perfil profesional en LinkedIn
                </span>
                <ArrowTopRightOnSquareIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Invitación final en Itálica */}
            <p className="text-lg text-gray-500 mt-8 italic border-l-4 border-emerald-200 pl-4">
              "Si tienes un negocio o un proyecto, será un gusto escucharte y ayudarte a descubrir las herramientas digitales exactas para impulsar tu crecimiento."
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Conoceme;