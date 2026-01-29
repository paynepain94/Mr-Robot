import React, { useEffect } from 'react';

const TerminosYCondiciones = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-gray-300 font-sans pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
                <h1 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-8 text-center">
                    TÉRMINOS Y CONDICIONES DE USO
                </h1>

                <div className="space-y-6 text-sm md:text-base leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">Mr-Robot</h2>
                        <p className="text-gray-400">21 de noviembre de 2025</p>
                        <h3 className="text-lg font-bold text-emerald-500 mt-4 mb-2">Bienvenido a Mr-Robot</h3>
                        <p>
                            Estos Términos y Condiciones (”Términos”) regulan el uso de nuestros servicios de automatización inteligente de WhatsApp y el acceso a nuestro sitio web. Al contratar nuestros servicios o utilizar nuestra plataforma, usted (”el Cliente” o ”el Usuario”) acepta estar legalmente vinculado por estos Términos.
                        </p>
                        <p className="mt-2 text-white">
                            Si no está de acuerdo con alguno de estos términos, le solicitamos abstenerse de utilizar nuestros servicios.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">1. DESCRIPCIÓN DEL SERVICIO</h3>
                        <p>
                            Mr-Robot ofrece herramientas de software para la automatización de respuestas, gestión de flujos de conversación y chatbots a través de la plataforma WhatsApp (”el Servicio”), diseñado para optimizar la comunicación de microempresas.
                        </p>
                        <p className="mt-2">
                            El Servicio se proporciona ”tal cual” y está sujeto a disponibilidad. Nos reservamos el derecho de modificar, suspender o retirar el contenido o las funciones del Servicio en cualquier momento.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">2. USO DE WHATSAPP Y CUMPLIMIENTO DE POLÍTICAS</h3>
                        <p>
                            El Usuario reconoce que Mr-Robot es una herramienta independiente y no está afiliada, asociada, autorizada, respaldada ni conectada oficialmente de ninguna manera con WhatsApp Inc. o Meta Platforms, Inc.
                        </p>
                        <p className="mt-2">Al utilizar nuestros servicios, el Usuario se compromete a:</p>
                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                            <li>Cumplir con las Políticas de Comercio y Políticas de Business de WhatsApp.</li>
                            <li>No utilizar la automatización para el envío de SPAM, mensajes no solicitados o contenido ofensivo.</li>
                            <li>Obtener el consentimiento explícito de sus clientes finales antes de enviar mensajes automatizados.</li>
                        </ol>
                        <p className="mt-2">
                            Mr-Robot no se hace responsable de bloqueos, suspensiones o inhabilitaciones de números telefónicos por parte de WhatsApp debido al mal uso de la plataforma o incumplimiento de sus políticas por parte del Usuario.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">3. CUENTAS Y REGISTRO</h3>
                        <p>
                            Para acceder a ciertas funciones, el Usuario deberá registrarse y proporcionar información veraz y actualizada. El Usuario es el único responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">4. PAGOS Y FACTURACIÓN</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Precios:</strong> Los precios de nuestros planes están publicados en nuestro sitio web y están sujetos a cambios con previo aviso.</li>
                            <li><strong>Pagos:</strong> El servicio se paga por adelantado (mensual o anualmente, según el plan elegido).</li>
                            <li><strong>Reembolsos:</strong> Ofrecemos una garantía de devolución de dinero de 7 días si el servicio no cumple con sus expectativas. Pasado este periodo, no se realizan reembolsos parciales por cancelaciones anticipadas.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">5. PROPIEDAD INTELECTUAL</h3>
                        <p>
                            Todo el contenido, software, código fuente, diseños, logotipos y marcas comerciales relacionados con Mr-Robot son propiedad exclusiva de nosotros o de nuestros licenciantes. Se prohíbe la reproducción, distribución o ingeniería inversa de nuestra plataforma sin autorización expresa.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">6. LIMITACIÓN DE RESPONSABILIDAD</h3>
                        <p>En la máxima medida permitida por la ley aplicable, Mr-Robot no será responsable por:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Daños indirectos, incidentales o consecuentes (incluyendo pérdida de beneficios o datos).</li>
                            <li>Interrupciones del servicio causadas por fallas en los servidores de WhatsApp o proveedores de internet.</li>
                            <li>Errores en la configuración de los flujos de conversación realizados por el Usuario.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">7. CANCELACIÓN DEL SERVICIO</h3>
                        <p>
                            El Usuario puede cancelar su suscripción en cualquier momento a través de su panel de control o contactando a soporte. El servicio permanecerá activo hasta el final del periodo de facturación pagado.
                        </p>
                        <p className="mt-2">
                            Nos reservamos el derecho de suspender o terminar la cuenta de cualquier Usuario que viole estos Términos, sin derecho a reembolso.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">8. MODIFICACIONES A LOS TÉRMINOS</h3>
                        <p>
                            Podemos actualizar estos Términos ocasionalmente. Notificaremos cualquier cambio material a través de nuestro sitio web o por correo electrónico. El uso continuado del servicio después de dichos cambios constituye su aceptación de los nuevos Términos.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">9. LEGISLACIÓN APLICABLE Y JURISDICCIÓN</h3>
                        <p>
                            Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier disputa derivada de estos Términos, las partes se someten a la jurisdicción de los tribunales competentes en [Tu Ciudad, Estado], renunciando a cualquier otro fuero que pudiera corresponderles.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">10. CONTACTO</h3>
                        <p>Para cualquier duda o aclaración sobre estos Términos y Condiciones, por favor contáctenos en:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Correo electrónico:</strong> contacto@mr-robot.mx</li>
                            <li><strong>Sitio Web:</strong> <a href="https://www.senior-robot.com" className="text-emerald-400 hover:underline">www.senior-robot.com</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TerminosYCondiciones;
