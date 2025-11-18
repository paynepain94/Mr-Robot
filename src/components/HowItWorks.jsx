import React from 'react';
import { 
  ArrowRightIcon, 
  Cog6ToothIcon,
  LinkIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

// --- IMPORTA TUS ÍCONOS DE FLUJO AQUÍ ---
import IconoCliente from '../assets/icon-cliente.svg'; 
import IconoMrRobotHead from '../assets/icon-mr-robot-head.svg'; 
import IconoNegocio from '../assets/icon-negocio.svg'; 
// ------------------------------------

const HowItWorks = () => {

  // --- DATOS PARA LA PRIMERA SECCIÓN (LOS 3 PASOS) ---
  const verticalSteps = [
    {
      icon: <Cog6ToothIcon className="h-8 w-8 text-white" />,
      title: '1. Análisis Humano',
      description: 'Entendemos a fondo tu negocio y tus clientes para diseñar conversaciones ideales.',
    },
    {
      icon: <LinkIcon className="h-8 w-8 text-white" />,
      title: '2. Creación a Medida',
      description: 'Programamos tu chatbot con respuestas clave, haciéndolo sentir humano y efectivo.',
    },
    {
      icon: <RocketLaunchIcon className="h-8 w-8 text-white" />,
      title: '3. Lanzamiento y Soporte',
      description: 'Tu bot empieza a trabajar, y nosotros te acompañamos para asegurar su rendimiento.',
    },
  ];

  // --- DATOS PARA LA SEGUNDA SECCIÓN (EL FLUJO) ---
  const horizontalFlow = [
    {
      icon: IconoCliente,
      title: 'Cliente',
      description: 'Envía un mensaje a tu WhatsApp.',
    },
    {
      icon: IconoMrRobotHead,
      title: 'Mr-Robot',
      description: 'Recibe y contesta automáticamente.',
    },
    {
      icon: IconoNegocio,
      title: 'Tu Negocio',
      description: 'Vende, informa y crece sin esfuerzo.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-soft text-center">
      <div className="max-w-7xl mx-auto">
        {/* CAMBIO DE PESO: Titular de sección en Bold (ya estaba) */}
        <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-12">
          ¿Cómo funciona Mr-Robot?
        </h2>
        
        {/* --- SECCIÓN 1: LOS 3 PASOS (Análisis, Creación, Lanzamiento) --- */}
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center space-y-8 md:space-y-0 md:space-x-12 mb-16 sm:mb-20">
          {verticalSteps.map((step) => (
            <div key={step.title} className="flex flex-col items-center max-w-xs">
              <div className="bg-whatsapp-green rounded-full p-4 mb-4 shadow-md">
                {step.icon}
              </div>
              {/* CAMBIO DE PESO: Titular de paso en Bold */}
              <h3 className="text-xl font-bold text-text-dark mb-2">{step.title}</h3>
              {/* CAMBIO DE PESO: Descripción en Light */}
              <p className="text-gray-600 font-light">{step.description}</p>
            </div>
          ))}
        </div>

        {/* --- SECCIÓN 2: EL FLUJO VISUAL (Cliente, Robot, Negocio) --- */}
        <div 
          className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,255,240,1) 100%)',
            border: '1px solid #e6ffe6'
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8 lg:space-x-12 w-full">
            {horizontalFlow.map((step, index) => (
              <React.Fragment key={step.title}>
                <div className="flex flex-col items-center text-center max-w-[200px] w-full">
                  <div 
                    className="flex items-center justify-center w-24 h-24 rounded-full mb-4 shadow-md flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)',
                    }}
                  >
                    <img src={step.icon} alt={step.title} className="w-16 h-16 object-contain" />
                  </div>
                  {/* CAMBIO DE PESO: Titular de flujo en Bold */}
                  <h3 className="text-lg font-bold text-text-dark mb-1">{step.title}</h3>
                  {/* CAMBIO DE PESO: Descripción en Light */}
                  <p className="text-sm text-gray-600 font-light">{step.description}</p>
                </div>

                {index < horizontalFlow.length - 1 && (
                  <ArrowRightIcon className="h-8 w-8 text-whatsapp-green flex-shrink-0 mx-4 md:mx-0 rotate-90 md:rotate-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;