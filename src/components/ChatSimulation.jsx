import React, { useState, useEffect } from 'react';
import WhatsAppIcon from '../assets/whatsapp-dynamic.svg'; // Reusing the icon

const ChatSimulation = () => {
    const [messages, setMessages] = useState([]);

    const conversation = [
        {
            id: 1,
            sender: 'robot',
            text: '¡Hola! Gracias por escribirnos desde la web. ⚡',
            delay: 500
        },
        {
            id: 2,
            sender: 'robot',
            text: 'Para darte una propuesta de automatización a tu medida, cuéntanos ¿cuál es tu volumen aproximado de mensajes diarios?',
            type: 'options',
            delay: 5500, // 5 segundos después del primer mensaje
            options: [
                { label: '🟢 Bajo: Menos de 30 chats al día.', action: 'low' },
                { label: '🔴 Alto: Más de 100 chats y necesito solución robusta.', action: 'high' },
                { label: '🗓️ Agendar reunión', action: 'calendar', link: 'https://calendar.google.com' }
            ]
        }
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

    const handleOptionClick = (option) => {
        if (option.link) {
            window.open(option.link, '_blank');
        } else {
            console.log("Selected option:", option.label);
            // Simulación de interacción visual o respuesta podría ir aquí
        }
    };

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
            <div className="bg-[#ECE5DD] h-96 p-4 overflow-y-auto flex flex-col space-y-3 custom-scrollbar">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm animate-fade-in-up ${msg.sender === 'client'
                            ? 'bg-white self-start rounded-tl-none'
                            : 'bg-white self-start rounded-tl-none' // Bot is always white/default in this new flow for options? Or keep green? Standard whatsapp bot is usually left side (white)
                            }`}
                        style={msg.sender === 'robot' ? { backgroundColor: 'white', borderTopLeftRadius: 0 } : {}}
                    >
                        <p className="text-gray-800 whitespace-pre-line">{msg.text}</p>

                        {/* Options Rendering */}
                        {msg.type === 'options' && (
                            <div className="mt-3 flex flex-col space-y-2">
                                {msg.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionClick(option)}
                                        className="w-full text-left bg-gray-50 hover:bg-gray-100 text-gray-700 p-2 rounded border border-gray-200 text-xs transition-colors duration-200"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}

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
