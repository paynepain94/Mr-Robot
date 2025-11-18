import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const Conoceme = () => {
  return (
    <section id="conoceme" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* CAMBIO DE PESO: Titular "Fundador" en Bold */}
        <h2 className="text-2xl font-bold text-whatsapp-green mb-4">
          Fundador
        </h2>
        
        <img 
          src="/joab-romero-foto.jpg"
          alt="Foto de Joab Romero, Fundador de Mr-Robot" 
          className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg bg-gray-200"
        />

        {/* CAMBIO DE PESO: Nombre en ExtraBold */}
        <h3 className="text-3xl sm:text-4xl font-extrabold text-text-dark mb-10">
          Joab Romero
        </h3>

        {/* CAMBIO DE PESO: Párrafos de descripción en Light */}
        <div className="space-y-6 text-lg text-gray-600 text-left sm:text-center font-light">
          <p>
            Soy ingeniero en desarrollo de software con más de 15 años dedicándome a la tecnología, de los cuales tengo más de 11 años ayudando a empresas en México y otros países a reducir hasta un 70% sus gastos, usando herramientas digitales, automatizaciones y soluciones que hacen su trabajo más fácil y eficiente.
          </p>
          <p>
            Me apasiona la ciberseguridad, la inteligencia artificial y encontrar la manera que los negocios ahorren tiempo y dinero.
          </p>
          <p>
           <u> Cuento con certificaciones internacionales que respaldan mi experiencia.</u>
          </p>
        </div>

        <div className="mt-10">
          {/* CAMBIO DE PESO: Párrafo de CTA en Light */}
          <p className="text-lg text-gray-600 mb-4 font-light">
            Puedes conocer más sobre mi trayectoria en mi LinkedIn:
          </p>
          {/* CAMBIO DE PESO: Botón en SemiBold (ya estaba) */}
          <a
            href="https://www.linkedin.com/in/joabromero94/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-whatsapp-green text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-whatsapp-dark transition duration-300 ease-in-out shadow-lg"
          >
            👉 Verificar en LinkedIn
            <ArrowTopRightOnSquareIcon className="h-5 w-5 ml-2" />
          </a>
        </div>

        {/* CAMBIO DE PESO: Párrafo final en Regular Italic */}
        <p className="text-lg text-gray-700 mt-10 italic font-regular">
          Si tienes un negocio o un proyecto, será un gusto escucharte, conocerte y ayudarte a descubrir las mejores herramientas digitales para impulsar tu emprendimiento.
        </p>

      </div>
    </section>
  );
};

export default Conoceme;