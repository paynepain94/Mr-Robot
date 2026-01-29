import React, { useEffect } from 'react';

const AvisoDePrivacidad = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-gray-300 font-sans pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
                <h1 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-8 text-center">
                    Aviso de Privacidad Integral
                </h1>

                <div className="space-y-6 text-sm md:text-base leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">Mr-Robot (Joab Romero)</h2>
                        <p className="text-gray-400">Última actualización: 20 de noviembre de 2025</p>
                        <p className="font-semibold mt-2">Seguridad de datos, encriptación y manejo de automatizaciones.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">I. Responsable de la protección de datos personales</h3>
                        <p>
                            Mr-Robot (en adelante “El Responsable”), es responsable de la protección y tratamiento de los datos personales recabados a través de sus servicios de automatización y chatbots. Puede contactarnos a través de nuestro sitio web <a href="https://mr-robot.mx" className="text-emerald-400 hover:underline">mr-robot.mx</a> o mediante los canales de atención al cliente establecidos. El Responsable se compromete a asegurar la privacidad de la información personal obtenida a través de sus servicios en línea y otros medios permitidos por la ley.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">II. Datos personales y sensibles que son recabados</h3>
                        <p>
                            Para la prestación de los servicios de automatización en WhatsApp Business, El Responsable podrá recabar los siguientes datos personales proporcionados por el titular o sus clientes finales:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Datos de identificación:</strong> Nombre completo, domicilio, número de teléfono (WhatsApp ID).</li>
                            <li><strong>Datos Patrimoniales o Financieros:</strong> Números de cuenta bancaria, historial de transacciones y datos necesarios para la gestión de pagos automatizados.</li>
                        </ul>

                        <h4 className="font-bold text-white mt-4 mb-1">DATOS SENSIBLES Y ESTÁNDARES DE SEGURIDAD (HIPAA / PCI DSS)</h4>
                        <p>
                            Debido a la naturaleza de las automatizaciones personalizadas, El Responsable podrá tener acceso y tratar datos sensibles, incluyendo información de salud (sujeta a estándares HIPAA para el sector médico) y datos de tarjetas de pago (sujetos a estándares PCI DSS).
                        </p>
                        <p className="mt-2">
                            El Responsable se compromete a que estos datos sensibles serán tratados bajo las más estrictas medidas de seguridad, siendo resguardados exclusivamente en <strong>COPIAS DE SEGURIDAD ENCRIPTADAS</strong> para garantizar su confidencialidad e integridad.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">III. Tratamiento de Mensajes y Conversaciones (WhatsApp)</h3>
                        <p>
                            Para el correcto funcionamiento de los Chatbots y flujos de automatización, El Responsable tiene acceso técnico al contenido de los mensajes intercambiados a través de la plataforma de WhatsApp Business API.
                        </p>
                        <p className="mt-2 text-white">El titular reconoce y acepta que:</p>
                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                            <li>El acceso a estos mensajes es estrictamente necesario para que el software procese las respuestas automáticas.</li>
                            <li>El Responsable <strong>NO</strong> hará uso indebido, comercialización ni divulgación no autorizada del contenido de dichas conversaciones.</li>
                            <li>El historial de mensajes y datos sensibles se almacena utilizando protocolos de encriptación robustos para prevenir accesos no autorizados.</li>
                        </ol>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">IV. Finalidad del tratamiento de los datos personales</h3>
                        <p>Los datos personales serán utilizados para las siguientes finalidades primarias:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Configuración, despliegue y mantenimiento de asistentes virtuales y chatbots en WhatsApp.</li>
                            <li>Procesamiento de solicitudes automatizadas (agendamiento de citas, consultas de saldo, triaje médico básico, etc.).</li>
                            <li>Generación de copias de seguridad encriptadas para la recuperación de desastres y continuidad del negocio.</li>
                            <li>Facturación y cobro de los servicios de automatización prestados.</li>
                            <li>Cumplimiento de normativas aplicables en materia de protección de datos y seguridad de la información.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">V. Transferencia y Seguridad de los Datos</h3>
                        <p>
                            El Responsable implementa medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.
                        </p>
                        <p className="mt-2">
                            Específicamente, la información sensible (HIPAA/PCI DSS) se resguarda mediante encriptación de grado militar en reposo y en tránsito.
                        </p>
                        <p className="mt-2">
                            Sus datos pueden ser remitidos a proveedores de servicios en la nube (Cloud Providers) encargados del alojamiento de la infraestructura de los chatbots, quienes operan bajo instrucciones estrictas de privacidad y seguridad.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">VI. Derechos ARCO</h3>
                        <p>
                            Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada conforme a los principios, deberes y obligaciones previstas en la normativa (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición).
                        </p>
                        <p className="mt-2">
                            Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través de nuestros canales de soporte indicados en el sitio web.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">VII. Cambios al Aviso de Privacidad</h3>
                        <p>
                            El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas.
                        </p>
                        <p className="mt-2">
                            Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad a través de nuestro sitio web.
                        </p>
                        <p className="text-gray-400 mt-4 text-sm">Fecha de última actualización: 20 de febrero de 2025.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AvisoDePrivacidad;
