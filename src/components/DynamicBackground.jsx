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
            constructor(direction) {
                this.direction = direction; // 'left-to-right' or 'right-to-left'
                this.init();
            }

            init() {
                this.speed = Math.random() * 1.5 + 0.5;
                this.length = Math.random() * 200 + 150;
                this.thickness = Math.random() * 3 + 1;
                this.headSize = this.thickness + Math.random() * 3;
                this.color = colors[Math.floor(Math.random() * colors.length)];

                if (this.direction === 'left-to-right') {
                    this.x = Math.random() * canvas.width - canvas.width;
                    this.y = Math.random() * (canvas.height * 0.35); // Top 35%
                } else {
                    this.x = Math.random() * canvas.width + canvas.width;
                    this.y = canvas.height - Math.random() * (canvas.height * 0.35); // Bottom 35%
                }
            }

            update() {
                if (this.direction === 'left-to-right') {
                    this.x += this.speed;
                    if (this.x > canvas.width + this.length) {
                        this.init();
                        this.x = -this.length;
                    }
                } else {
                    this.x -= this.speed;
                    if (this.x < -this.length) {
                        this.init();
                        this.x = canvas.width + this.length;
                    }
                }
            }

            draw() {
                // Determine Head and Tail positions based on direction
                let xHead, xTail;

                if (this.direction === 'left-to-right') {
                    // Moving Right: Head is at the rightmost point (x + length), Tail is at x
                    xHead = this.x + this.length;
                    xTail = this.x;
                } else {
                    // Moving Left: Head is at the leftmost point (x), Tail is at x + length
                    xHead = this.x;
                    xTail = this.x + this.length;
                }

                // Create Gradient from Head to Tail
                // We always define the gradient starting from the Head (Solid) to the Tail (Transparent)
                const gradient = ctx.createLinearGradient(xHead, this.y, xTail, this.y);

                gradient.addColorStop(0, this.color);           // Head: Solid Color
                gradient.addColorStop(1, 'rgba(16, 185, 129, 0)'); // Tail: Transparent

                // Draw the Trail
                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.thickness;
                ctx.lineCap = 'round';
                ctx.moveTo(xTail, this.y);
                ctx.lineTo(xHead, this.y);
                ctx.stroke();

                // Draw the Nucleus at the Head position
                ctx.beginPath();
                ctx.fillStyle = '#ffffff'; // White hot center
                ctx.shadowBlur = 20; // Glow
                ctx.shadowColor = this.color;
                ctx.arc(xHead, this.y, this.headSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 0;
            }
        }

        // Initialize comets
        for (let i = 0; i < cometCount; i++) {
            // User requested "flip" and complained about "reverse" look.
            // Switching all to 'left-to-right' to ensure consistent forward flow.
            // We still distribute them top/bottom.
            const direction = 'left-to-right';

            // We need to manually handle the y-position distribution since we removed the direction check
            const comet = new Comet(direction);

            // Override y position to distribute across top and bottom
            if (i >= cometCount / 2) {
                // Bottom half
                comet.y = canvas.height - Math.random() * (canvas.height * 0.35);
            }

            comets.push(comet);
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
