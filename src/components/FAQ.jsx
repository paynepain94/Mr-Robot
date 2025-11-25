import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "¿Qué es Mr-Robot y para qué sirve?",
            answer: "Mr-Robot es una plataforma integral que centraliza y organiza la atención al cliente en WhatsApp. Te ayuda a responder más rápido, automatizar tareas repetitivas y brindar un servicio profesional sin perder la cercanía con tus clientes."
        },
        {
            question: "¿En qué se diferencia Mr-Robot de WhatsApp Business normal?",
            answer: "WhatsApp Business está pensado para una sola persona o equipos muy pequeños. Con Mr-Robot puedes trabajar con múltiples agentes y líneas simultáneamente, tener supervisión en tiempo real, chatbots avanzados y automatizaciones que el WhatsApp normal no ofrece."
        },
        {
            question: "¿Mr-Robot trabaja con la API oficial de WhatsApp?",
            answer: "Sí. Solo utilizamos la API oficial de WhatsApp, lo que garantiza el cumplimiento con las políticas de Meta, máxima estabilidad y elimina los riesgos de bloqueo por uso indebido."
        },
        {
            question: "¿Necesito conocimientos técnicos para usar Mr-Robot?",
            answer: "No. Nuestra plataforma está diseñada para ser intuitiva y fácil de usar desde el primer día. Tu equipo podrá aprender a utilizarla en cuestión de horas gracias a nuestras guías claras y soporte cercano."
        },
        {
            question: "¿Puedo usar Mr-Robot si ya tengo un CRM?",
            answer: "¡Claro! Mr-Robot se integra con miles de aplicaciones a través de Make, Webhooks y la propia API de meta, permitiendo que tu CRM actual y tu WhatsApp trabajen en perfecta sincronía."
        },
        {
            question: "¿Se pueden crear chatbots sin saber programar?",
            answer: "Sí. Puedes diseñar flujos conversacionales completos con botones, listas, condiciones y variables de forma visual, sin escribir una sola línea de código."
        },
        {
            question: "¿Puedo enviar mensajes masivos y campañas por WhatsApp con Mr-Robot?",
            answer: "Sí. Mr-Robot te permite enviar campañas segmentadas y personalizadas, con métricas en tiempo real para medir el impacto y la conversión de tus mensajes."
        },
        {
            question: "¿Qué industrias usan Mr-Robot con más éxito?",
            answer: "E-commerce, servicios online, educación, marketing digital, cafés, restaurantes, ventas en línea, y taquerías. En general, cualquier negocio que utilice WhatsApp como un canal principal de comunicación se beneficia enormemente."
        },
        {
            question: "¿Para qué tipo de empresas NO está diseñado Mr-Robot?",
            answer: "No es ideal para negocios unipersonales sin proyección de crecimiento inmediato, empresas sin una estructura mínima de atención al cliente o quienes aún tienen un volumen muy bajo de mensajes. Está pensado para potenciar equipos de al menos 3 o más agentes."
        },
        {
            question: "¿Cuánto cuesta Mr-Robot y qué incluye?",
            answer: "Nuestros planes inician desde 2,490 mxn. Todos incluyen agente, línea, contactos ilimitados, créditos de IA. "
        },
        {
            question: "¿Qué soporte ofrece Mr-Robot?",
            answer: "Ofrecemos un soporte cercano y humano. No te dejamos solo con documentación: acompañamos a tu equipo con guías, videos y asistencia directa siempre que lo necesites para asegurar tu éxito durante los primeros 3meses."
        },
        {
            question: "¿Qué resultados puedo esperar al usar Mr-Robot?",
            answer: "Con Mr-Robot tu equipo ganará orden y velocidad desde el primer día: ningún mensaje se quedará sin responder, los supervisores tendrán control total en tiempo real y tus clientes recibirán respuestas más rápidas y profesionales. Esto se traduce directamente en más ventas, menos quejas y una experiencia de atención sólida."
        },
        {
            question: "¿Cuánto tiempo me toma empezar a usar Mr-Robot?",
            answer: "El proceso es rápido y sencillo. En cuestión de horas puedes tener tu número conectado y a tu equipo atendiendo desde la plataforma. Sin configuraciones técnicas complicadas: todo está diseñado para que arranques sin fricciones."
        },
        {
            question: "¿Por qué elegir Mr-Robot y no otra herramienta?",
            answer: (
                <>
                    Porque Mr-Robot está hecho específicamente para empresas que dependen de WhatsApp y sienten que su operación manual los limita. No somos un CRM genérico ni una app improvisada:
                    <br /><br />
                    ✅ <strong>Seguridad y estabilidad:</strong> Trabajamos exclusivamente con la API oficial de WhatsApp.<br />
                    ✅ <strong>Escalabilidad real:</strong> Puedes crecer de 5 a 50+ agentes sin cambiar de sistema.<br />
                    ✅ <strong>Simplicidad:</strong> Tu equipo lo dominará desde el primer uso, sin curvas de aprendizaje complejas.<br />
                    ✅ <strong>Automatización inteligente:</strong> Chatbots y asistentes de IA que liberan carga de trabajo sin necesidad de programar.<br />
                    ✅ <strong>Soporte cercano:</strong> Nunca estarás solo, siempre habrá alguien listo para ayudarte.
                    <br /><br />
                    En pocas palabras: Mr-Robot no es “otra herramienta más”, es la solución definitiva que ordena tu WhatsApp, da control a tu equipo y convierte el caos en ventas.
                </>
            )
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="faq" className="py-20 sm:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Sabemos que al conocer Mr-Robot pueden surgir dudas. Aquí reunimos algunas de las más comunes para que tengas claridad desde el inicio.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto mb-12 relative">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3 px-4 pr-12 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-500 outline-none transition-all"
                    />
                    <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-600" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-xl transition-all duration-300 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${openIndex === index ? 'bg-emerald-50 ring-1 ring-emerald-500 shadow-md' : 'bg-white'}`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none group bg-transparent"
                            >
                                <span className={`text-base sm:text-lg font-bold transition-colors duration-300 pr-4 ${openIndex === index ? 'text-emerald-800' : 'text-gray-900 group-hover:text-emerald-600'}`}>
                                    {faq.question}
                                </span>
                                <span className="flex-shrink-0 ml-2">
                                    <ChevronDownIcon
                                        className={`h-5 w-5 transition-transform duration-300 ease-in-out ${openIndex === index ? 'rotate-180 text-emerald-600' : 'text-gray-400 group-hover:text-emerald-500'}`}
                                    />
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className={`px-5 sm:px-6 pb-6 leading-relaxed text-sm sm:text-base font-normal border-t pt-4 mt-2 ${openIndex === index ? 'text-emerald-900 border-emerald-100' : 'text-gray-700 border-gray-50'}`}>
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
