import React, { useEffect } from 'react';

const PoliticaEliminacionDatos = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-gray-300 font-sans pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
                <h1 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-8 text-center">
                    Instrucciones para la Solicitud de Eliminación de Datos (Senior-Robot)
                </h1>

                <div className="space-y-6 text-sm md:text-base leading-relaxed">
                    <section>
                        <p>
                            En Senior-Robot, respetamos tu privacidad y te proporcionamos un proceso sencillo para solicitar la eliminación de tu información personal almacenada en nuestras bases de datos de automatización.
                        </p>
                        <p className="mt-2 text-white">
                            Si deseas que eliminemos los datos asociados a tu número de WhatsApp o cuenta de usuario, sigue estos pasos:
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">Paso 1: Redacción de la solicitud</h3>
                        <p>
                            Envía un correo electrónico a la dirección de soporte <a href="mailto:mr.senior.robot@gmail.com" className="text-emerald-400 hover:underline">mr.senior.robot@gmail.com</a> o un mensaje directo a través de nuestro canal oficial de WhatsApp.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">Paso 2: Información requerida</h3>
                        <p>
                            Para procesar tu baja, es necesario que indiques el número de teléfono completo (con clave de país) que deseas desvincular de nuestro sistema.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">Paso 3: Plazo de ejecución</h3>
                        <p>
                            Una vez recibida la solicitud, nuestro equipo confirmará la identidad del solicitante y procederá con el borrado definitivo de los registros en un plazo de 48 a 72 horas hábiles.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-emerald-500 mb-2">Paso 4: Confirmación final</h3>
                        <p>
                            Te notificaremos por el mismo medio de contacto una vez que los datos hayan sido purgados de nuestros servidores de forma permanente.
                        </p>
                    </section>

                    <section className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p>
                            Para más información o para iniciar este proceso, puedes visitar nuestro sitio web oficial: <a href="https://senior-robot.com" className="text-emerald-400 hover:underline">Senior-Robot.com</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PoliticaEliminacionDatos;
