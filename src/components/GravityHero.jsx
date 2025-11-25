import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import WhatsAppIcon from '../assets/whatsapp-dynamic.svg';
import CheckIcon from '../assets/check-dynamic.svg';

const GravityHero = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);

    useEffect(() => {
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events,
            Body = Matter.Body;

        const engine = Engine.create();
        engine.gravity.y = 0;
        engineRef.current = engine;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: '#0a0a0a',
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        // --- CREATE BODIES WITH ICONS ---
        const createBodies = (width, height) => {
            const bodies = [];
            const iconSize = 60; // Base size for icons

            for (let i = 0; i < 25; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const scale = 0.5 + Math.random() * 0.5; // Random scale between 0.5 and 1.0

                let body;
                if (Math.random() > 0.4) {
                    // WhatsApp Icon
                    body = Bodies.circle(x, y, (iconSize * scale) / 2, {
                        restitution: 0.9,
                        frictionAir: 0.02,
                        render: {
                            sprite: {
                                texture: WhatsAppIcon,
                                xScale: scale * 0.6, // Adjust scale to match body size
                                yScale: scale * 0.6
                            }
                        }
                    });
                } else {
                    // Check Icon (Palomita)
                    body = Bodies.circle(x, y, (iconSize * scale) / 2, {
                        restitution: 0.9,
                        frictionAir: 0.02,
                        render: {
                            sprite: {
                                texture: CheckIcon,
                                xScale: scale * 0.8,
                                yScale: scale * 0.8
                            }
                        }
                    });
                }
                bodies.push(body);
            }
            return bodies;
        };

        const initialBodies = createBodies(window.innerWidth, window.innerHeight);

        // --- WALLS ---
        const createWalls = (width, height) => {
            const wallOptions = { isStatic: true, render: { visible: false } };
            const wallThickness = 200; // Thick walls to prevent tunneling
            return [
                Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, wallOptions), // Top
                Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, wallOptions), // Bottom
                Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions), // Right
                Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions) // Left
            ];
        };

        let walls = createWalls(window.innerWidth, window.innerHeight);
        Composite.add(engine.world, [...initialBodies, ...walls]);

        // --- MOUSE CONTROL ---
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // --- INTERACTION ---
        Events.on(engine, 'beforeUpdate', function () {
            const mousePosition = mouse.position;
            const bodies = Composite.allBodies(engine.world);
            bodies.forEach(body => {
                if (body.isStatic) return;
                const dx = body.position.x - mousePosition.x;
                const dy = body.position.y - mousePosition.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 250) {
                    const forceMagnitude = (250 - distance) / 250 * 0.00005;
                    Body.applyForce(body, body.position, {
                        x: dx * forceMagnitude,
                        y: dy * forceMagnitude
                    });
                }
            });
        });

        Render.run(render);
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // --- RESPONSIVE HANDLER ---
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            // Update canvas and renderer
            render.canvas.width = newWidth;
            render.canvas.height = newHeight;
            render.options.width = newWidth;
            render.options.height = newHeight;

            // Remove old walls and add new ones
            Composite.remove(engine.world, walls);
            walls = createWalls(newWidth, newHeight);
            Composite.add(engine.world, walls);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            Composite.clear(engine.world);
            Engine.clear(engine);
        };
    }, []);

    return (
        <div
            ref={sceneRef}
            className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden bg-[#0a0a0a]"
        />
    );
};

export default GravityHero;
