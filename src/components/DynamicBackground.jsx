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

        // Atom Configuration
        const nucleusRadius = 25;
        const electronCount = 8;
        const orbitSpeedBase = 0.02;
        const colors = ['#10B981', '#34D399', '#059669']; // Emerald shades

        class Electron {
            constructor(index) {
                this.index = index;
                this.angle = (Math.PI * 2 * index) / electronCount; // Distribute evenly
                this.orbitRadiusX = Math.random() * 150 + 100; // X radius
                this.orbitRadiusY = Math.random() * 100 + 50;  // Y radius
                this.speed = (Math.random() * 0.5 + 0.5) * orbitSpeedBase * (Math.random() > 0.5 ? 1 : -1);
                this.tilt = Math.random() * Math.PI; // Random tilt for 3D effect
                this.size = Math.random() * 3 + 2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.angle += this.speed;
            }

            draw(centerX, centerY) {
                // Calculate position on flat ellipse
                const flatX = Math.cos(this.angle) * this.orbitRadiusX;
                const flatY = Math.sin(this.angle) * this.orbitRadiusY;

                // Apply tilt rotation
                // x' = x cos(tilt) - y sin(tilt)
                // y' = x sin(tilt) + y cos(tilt)
                const x = flatX * Math.cos(this.tilt) - flatY * Math.sin(this.tilt);
                const y = flatX * Math.sin(this.tilt) + flatY * Math.cos(this.tilt);

                // Draw Electron
                ctx.beginPath();
                ctx.arc(centerX + x, centerY + y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fill();

                // Draw Orbit Path (Optional opacity)
                ctx.beginPath();
                ctx.ellipse(centerX, centerY, this.orbitRadiusX, this.orbitRadiusY, this.tilt, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(16, 185, 129, 0.1)`; // Very faint
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.shadowBlur = 0;
            }
        }

        const electrons = [];
        for (let i = 0; i < electronCount; i++) {
            electrons.push(new Electron(i));
        }

        const drawNucleus = (centerX, centerY) => {
            // Glowing Core
            const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, nucleusRadius * 2);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.3, '#34D399');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, nucleusRadius * 2, 0, Math.PI * 2);
            ctx.fill();

            // Solid Core
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#10B981';
            ctx.beginPath();
            ctx.arc(centerX, centerY, nucleusRadius * 0.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Draw Nucleus
            drawNucleus(centerX, centerY);

            // Update and Draw Electrons
            electrons.forEach(electron => {
                electron.update();
                electron.draw(centerX, centerY);
            });

            // Optional: Draw faint connecting lines between close electrons for "network" feel
            for (let i = 0; i < electrons.length; i++) {
                for (let j = i + 1; j < electrons.length; j++) {
                    const e1 = electrons[i];
                    const e2 = electrons[j];

                    // Re-calculate positions (copy logic from draw or store in checking)
                    // ... (Simplification: Just animate cleanly first)
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-gradient-to-br from-[#0f172a] via-[#022c22] to-[#064e3b]">
            {/* Darker background for contrast with glowing atom */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Overlay Gradient to blend with content at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-10"></div>
        </div>
    );
};

export default DynamicBackground;
