import React, { useEffect, useRef } from 'react';

const DynamicBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Comet configuration
        const comets = [];
        const cometCount = 35; // High volume
        const colors = ['#10B981', '#34D399', '#059669', '#6EE7B7']; // Emerald shades

        class Comet {
            constructor() {
                this.direction = 'left-to-right'; // Uniform direction
                this.init();
            }

            init() {
                this.speed = Math.random() * 1.5 + 0.5;
                this.length = Math.random() * 200 + 150;
                this.thickness = Math.random() * 3 + 1;
                this.headSize = this.thickness + Math.random() * 3;
                this.color = colors[Math.floor(Math.random() * colors.length)];

                // Start off-screen left
                this.x = Math.random() * canvas.width - canvas.width;

                // RESTRICTED AREAS: Top 15% or Bottom 15%
                const isTop = Math.random() > 0.5;
                if (isTop) {
                    // Top 15%
                    this.y = Math.random() * (canvas.height * 0.15);
                } else {
                    // Bottom 15% (Start at 85% height)
                    this.y = (canvas.height * 0.85) + Math.random() * (canvas.height * 0.15);
                }
            }

            update() {
                // Move Left to Right
                this.x += this.speed;

                // Reset if off-screen right
                if (this.x > canvas.width + this.length) {
                    this.init();
                    this.x = -this.length;
                }
            }

            draw() {
                // Head is at x + length (Right), Tail is at x (Left)
                const xHead = this.x + this.length;
                const xTail = this.x;

                // Gradient: Head (Solid) -> Tail (Transparent)
                const gradient = ctx.createLinearGradient(xHead, this.y, xTail, this.y);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

                // Draw Trail
                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.thickness;
                ctx.lineCap = 'round';
                ctx.moveTo(xTail, this.y);
                ctx.lineTo(xHead, this.y);
                ctx.stroke();

                // Draw Nucleus
                ctx.beginPath();
                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = 20;
                ctx.shadowColor = this.color;
                ctx.arc(xHead, this.y, this.headSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 0;
            }
        }

        // Initialize comets
        for (let i = 0; i < cometCount; i++) {
            comets.push(new Comet());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            comets.forEach(comet => {
                comet.update();
                comet.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-gradient-to-br from-[#D0F0F5] via-white to-[#D8F0D9]">
            {/* Canvas for Comets */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

            {/* --- ANIMATED CIRCUITS (SVG Overlay) --- */}
            <svg className="absolute w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#25D366" stopOpacity="0" />
                        <stop offset="50%" stopColor="#25D366" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#25D366" stopOpacity="0" />
                    </linearGradient>
                    <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M10 10 H 90 V 90 H 10 Z" fill="none" stroke="rgba(37, 211, 102, 0.1)" strokeWidth="1" />
                        <circle cx="10" cy="10" r="2" fill="rgba(37, 211, 102, 0.2)" />
                        <circle cx="90" cy="90" r="2" fill="rgba(37, 211, 102, 0.2)" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
        </div>
    );
};

export default DynamicBackground;
