import React, { useState } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "¿Qué es Senior Robot y para qué sirve?",
            answer: "Senior Robot es una plataforma integral que centraliza y organiza la atención al cliente en WhatsApp. Te ayuda a responder más rápido, automatizar tareas repetitivas y brindar un servicio profesional sin perder la cercanía con tus clientes."
        },
        {
            question: "¿En qué se diferencia Senior Robot de WhatsApp Business normal?",
            answer: "WhatsApp Business está pensado para una sola persona o equipos muy pequeños. Con Senior Robot puedes trabajar con múltiples agentes y líneas simultáneamente, tener supervisión en tiempo real, chatbots avanzados y automatizaciones que el WhatsApp normal no ofrece."
        },
        {
            question: "¿Senior Robot trabaja con la API oficial de WhatsApp?",
            answer: "Sí. Solo utilizamos la API oficial de WhatsApp, lo que garantiza el cumplimiento con las políticas de Meta, máxima estabilidad y elimina los riesgos de bloqueo por uso indebido."
        },
        {
            question: "¿Necesito conocimientos técnicos para usar Senior Robot?",
            answer: "No. Nuestra plataforma está diseñada para ser intuitiva y fácil de usar desde el primer día. Tu equipo podrá aprender a utilizarla en cuestión de horas gracias a nuestras guías claras y soporte cercano."
        },
        {
            question: "¿Puedo usar Senior Robot si ya tengo un CRM?",
            answer: "¡Claro! Senior Robot se integra con miles de aplicaciones a través de Make, Webhooks y la propia API de meta, permitiendo que tu CRM actual y tu WhatsApp trabajen en perfecta sincronía."
        },
        {
            question: "¿Se pueden crear chatbots sin saber programar?",
            answer: "Sí. Puedes diseñar flujos conversacionales completos con botones, listas, condiciones y variables de forma visual, sin escribir una sola línea de código."
        },
        {
            question: "¿Puedo enviar mensajes masivos y campañas por WhatsApp con Senior Robot?",
            answer: "Sí. Senior Robot te permite enviar campañas segmentadas y personalizadas, con métricas en tiempo real para medir el impacto y la conversión de tus mensajes."
        },
        {
            question: "¿Qué industrias usan Senior Robot con más éxito?",
            answer: "E-commerce, servicios online, educación, marketing digital, cafés, restaurantes, ventas en línea, y taquerías. En general, cualquier negocio que utilice WhatsApp como un canal principal de comunicación se beneficia enormemente."
        },
        {
            question: "¿Para qué tipo de empresas NO está diseñado Senior Robot?",
            answer: "No es ideal para negocios sin proyección de crecimiento inmediato, empresas sin una estructura mínima de atención al cliente o quienes aún tienen un volumen muy bajo de mensajes, menos de 10 mensajes al día no aplican."
        },
        {
            question: "¿Cuánto cuesta Senior Robot y qué incluye?",
            answer: "Nuestros planes inician desde 3,000 mxn. Todos incluyen agente, línea, contactos ilimitados, créditos de IA. "
        },
        {
            question: "¿Qué soporte ofrece Senior Robot?",
            answer: "Ofrecemos un soporte cercano y humano. No te dejamos solo con documentación: acompañamos a tu equipo con guías, videos y asistencia directa siempre que lo necesites para asegurar tu éxito durante los primeros 1 ó 3 meses(Depende el plan)."
        },
        {
            question: "¿Qué resultados puedo esperar al usar Senior Robot?",
            answer: "Con Senior Robot tu equipo ganará orden y velocidad desde el primer día: ningún mensaje se quedará sin responder, los supervisores tendrán control total en tiempo real y tus clientes recibirán respuestas más rápidas y profesionales. Esto se traduce directamente en más ventas, menos quejas y una experiencia de atención sólida."
        },
        {
            question: "¿Cuánto tiempo me toma empezar a usar Senior Robot?",
            answer: "El proceso es rápido y sencillo. En cuestión de horas puedes tener tu número conectado y a tu equipo atendiendo desde la plataforma. Sin configuraciones técnicas complicadas: todo está diseñado para que arranques sin fricciones."
        },
        {
            question: "¿Por qué elegir Senior Robot y no otra herramienta?",
            answer: (
                <>
                    Porque Senior Robot está hecho específicamente para empresas que dependen de WhatsApp y sienten que su operación manual los limita. No somos un CRM genérico ni una app improvisada:
                    <br /><br />
                    ✅ <strong>Seguridad y estabilidad:</strong> Trabajamos exclusivamente con la API oficial de WhatsApp.<br />
                    ✅ <strong>Escalabilidad real:</strong> Puedes crecer de 5 a 50+ agentes sin cambiar de sistema.<br />
                    ✅ <strong>Simplicidad:</strong> Tu equipo lo dominará desde el primer uso, sin curvas de aprendizaje complejas.<br />
                    ✅ <strong>Automatización inteligente:</strong> Chatbots y asistentes de IA que liberan carga de trabajo sin necesidad de programar.<br />
                    ✅ <strong>Soporte cercano:</strong> Nunca estarás solo, siempre habrá alguien listo para ayudarte. <br />
                    ✅ <strong>Precio competitivo:</strong> Costos adaptables para distintos tipos de negocio.
                    <br /><br />
                    En pocas palabras: Senior Robot no es “otra herramienta más”, es la solución definitiva que ordena tu WhatsApp, da control a tu equipo y convierte el caos en ventas.
                </>
            )
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="faq" className="relative py-20 sm:py-24 bg-black overflow-hidden font-sans text-white">

            {/* Gradient Background Matches Hero */}
            <div className="absolute inset-0 z-0 bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#002b20_0%,_#000000_80%)] opacity-70"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        Sabemos que al conocer Mr-Robot pueden surgir dudas. Aquí reunimos algunas de las más comunes para que tengas claridad desde el inicio.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12 relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ffcc] to-[#00aa88] rounded-lg blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="relative w-full py-3 px-4 pr-12 rounded-lg bg-black border border-white/10 focus:border-[#00ffcc]/50 focus:ring-1 focus:ring-[#00ffcc] text-white placeholder-gray-500 outline-none transition-all"
                    />
                    <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#00ffcc] z-10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`
                                rounded-xl transition-all duration-300 border 
                                backdrop-blur-md
                                ${openIndex === index
                                    ? 'bg-[#001a14]/60 border-[#00ffcc]/40 shadow-[0_0_20px_rgba(0,255,204,0.1)]'
                                    : 'bg-white/5 border-white/10 hover:border-[#00ffcc]/30 hover:bg-white/10'}
                            `}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none group bg-transparent"
                            >
                                <span className={`text-base sm:text-lg font-bold transition-colors duration-300 pr-4 ${openIndex === index ? 'text-[#00ffcc]' : 'text-gray-200 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <span className="flex-shrink-0 ml-2">
                                    <ChevronDownIcon
                                        className={`h-5 w-5 transition-transform duration-300 ease-in-out ${openIndex === index ? 'rotate-180 text-[#00ffcc]' : 'text-gray-500 group-hover:text-[#00ffcc]'}`}
                                    />
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className={`px-5 sm:px-6 pb-6 leading-relaxed text-sm sm:text-base font-light border-t pt-4 mt-2 ${openIndex === index ? 'text-gray-300 border-[#00ffcc]/10' : 'text-gray-400 border-white/5'}`}>
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
