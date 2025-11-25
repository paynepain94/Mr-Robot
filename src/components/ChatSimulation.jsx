import React, { useState, useEffect } from 'react';
import WhatsAppIcon from '../assets/whatsapp-dynamic.svg'; // Reusing the icon

const ChatSimulation = () => {
    const [messages, setMessages] = useState([]);

    const conversation = [
        { id: 1, sender: 'client', text: 'Hola, info de precios.', delay: 1000 },
        { id: 2, sender: 'robot', text: '¡Hola! 👋 Nuestros planes empiezan en $29/mes. ¿Te interesa ver una demo?', delay: 2500 },
        { id: 3, sender: 'client', text: 'Sí, claro.', delay: 4000 },
        { id: 4, sender: 'robot', text: '¡Genial! Agenda aquí: cal.com/mr-robot. ¡Listo! 🚀', delay: 5500 }
    ];

    useEffect(() => {
        let timeouts = [];

        // Reset messages on mount
        setMessages([]);

        conversation.forEach((msg) => {
            const timeout = setTimeout(() => {
                setMessages((prev) => [...prev, msg]);
            }, msg.delay);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="relative w-72 sm:w-80 bg-white rounded-[2rem] shadow-2xl border-8 border-gray-900 overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
            {/* Phone Header */}
            <div className="bg-[#075E54] p-4 flex items-center space-x-3 text-white">
                <div className="w-8 h-8 bg-white rounded-full p-1">
                    <img src={WhatsAppIcon} alt="Bot" className="w-full h-full" />
                </div>
                <div>
                    <h3 className="font-bold text-sm">Mr-Robot</h3>
                    <p className="text-xs opacity-80">En línea</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="bg-[#ECE5DD] h-80 p-4 overflow-y-auto flex flex-col space-y-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm animate-fade-in-up ${msg.sender === 'client'
                                ? 'bg-white self-start rounded-tl-none'
                                : 'bg-[#DCF8C6] self-end rounded-tr-none'
                            }`}
                    >
                        <p className="text-gray-800">{msg.text}</p>
                        <span className="text-[10px] text-gray-500 block text-right mt-1">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                ))}
            </div>

            {/* Input Area (Mock) */}
            <div className="bg-white p-3 border-t border-gray-200 flex items-center space-x-2">
                <div className="w-full h-8 bg-gray-100 rounded-full"></div>
                <div className="w-8 h-8 bg-[#075E54] rounded-full"></div>
            </div>

            <style>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default ChatSimulation;
