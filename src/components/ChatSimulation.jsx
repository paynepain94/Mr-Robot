import React, { useState, useEffect, useRef } from 'react';
import WhatsAppIcon from '../assets/whatsapp-dynamic.svg'; // Asegúrate de que esta ruta sea correcta

const ChatSimulation = ({
    messages = [],
    position = 'right',
    botName = "Senior Robot",
    status = "online",
    className = ""
}) => {
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Default messages if none provided (Fallback)
    const defaultMessages = [
        { type: 'user', text: 'Hi, I need to schedule a viewing.', delay: 1000 },
        { type: 'bot', text: 'I can help with that. Slots available: Today at 4 PM.', delay: 2000 },
    ];

    const currentMessages = messages.length > 0 ? messages : defaultMessages;

    useEffect(() => {
        let currentIndex = 0;
        let timeoutId;

        const processNextMessage = () => {
            if (currentIndex >= currentMessages.length) {
                // Loop: Reset after a pause
                timeoutId = setTimeout(() => {
                    setVisibleMessages([]);
                    currentIndex = 0;
                    processNextMessage();
                }, 5000);
                return;
            }

            const msg = currentMessages[currentIndex];

            if (msg.type === 'bot') {
                setIsTyping(true);
                // Simulate typing delay
                const typingDelay = 800;

                timeoutId = setTimeout(() => {
                    setIsTyping(false);
                    setVisibleMessages(prev => [...prev, msg]);
                    currentIndex++;
                    // Wait for next message delay
                    timeoutId = setTimeout(processNextMessage, msg.delay || 1500);
                }, typingDelay);
            } else {
                // User message
                timeoutId = setTimeout(() => {
                    setVisibleMessages(prev => [...prev, msg]);
                    currentIndex++;
                    processNextMessage();
                }, msg.delay || 1000);
            }
        };

        // Start initial delay
        timeoutId = setTimeout(processNextMessage, 500);

        return () => clearTimeout(timeoutId);
    }, [currentMessages]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [visibleMessages, isTyping]);

    return (
        <div className={`w-72 sm:w-80 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans ${className}`}>
            {/* Header */}
            <div className="bg-gray-800/90 px-4 py-3 flex items-center gap-3 border-b border-gray-700">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 p-1.5 flex items-center justify-center">
                    {/* Using a generic bot icon or the whatsapp icon if available, ensuring it renders nicely on dark */}
                    <span className="text-xl">🤖</span>
                </div>
                <div>
                    <h3 className="font-bold text-sm text-gray-100">{botName}</h3>
                    <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {isTyping ? 'typing...' : status}
                    </p>
                </div>
            </div>

            {/* Body */}
            <div
                ref={scrollRef}
                className="flex-1 p-4 space-y-4 h-64 overflow-y-auto scrollbar-hide bg-gradient-to-b from-gray-900/50 to-black/20"
            >
                {visibleMessages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                    >
                        <div
                            className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.type === 'user'
                                    ? 'bg-emerald-600 text-white rounded-tr-none'
                                    : 'bg-gray-700 text-gray-200 rounded-tl-none border border-gray-600'
                                }`}
                        >
                            {msg.text}
                            <div className={`text-[10px] mt-1 opacity-70 text-right ${msg.type === 'user' ? 'text-emerald-100' : 'text-gray-400'}`}>
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                {msg.type === 'user' && <span className="ml-1">✓✓</span>}
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                        <div className="bg-gray-700 px-4 py-3 rounded-2xl rounded-tl-none border border-gray-600 flex gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Placeholder (Visual only) */}
            <div className="bg-gray-800/50 px-3 py-2 border-t border-gray-700 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-xs">+</div>
                <div className="flex-1 h-8 bg-gray-700/50 rounded-full border border-gray-600"></div>
                <div className="w-8 h-8 rounded-full bg-emerald-600/80 flex items-center justify-center text-white text-xs">➤</div>
            </div>
        </div>
    );
};

export default ChatSimulation;
