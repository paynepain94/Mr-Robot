import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const GravityHero = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);

    useEffect(() => {
        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events,
            Body = Matter.Body;

        // Create engine
        const engine = Engine.create();
        engine.gravity.y = 0; // Zero gravity
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: '#0a0a0a', // Deep dark background
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        // Create bodies
        const width = window.innerWidth;
        const height = window.innerHeight;
        const bodies = [];

        // Add some random "tech" shapes
        const colors = ['#25D366', '#128C7E', '#075E54', '#34B7F1', '#ECE5DD']; // WhatsApp & Tech colors

        for (let i = 0; i < 40; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 30 + 10;
            const color = colors[Math.floor(Math.random() * colors.length)];

            let body;
            if (Math.random() > 0.5) {
                body = Bodies.circle(x, y, size, {
                    render: { fillStyle: color, opacity: 0.8 },
                    restitution: 0.9,
                    frictionAir: 0.02
                });
            } else {
                body = Bodies.rectangle(x, y, size * 1.5, size * 1.5, {
                    render: { fillStyle: color, opacity: 0.8 },
                    restitution: 0.9,
                    frictionAir: 0.02,
                    chamfer: { radius: 5 }
                });
            }
            bodies.push(body);
        }

        // Add walls to keep things on screen (optional, but good for containment)
        const wallOptions = { isStatic: true, render: { visible: false } };
        const walls = [
            Bodies.rectangle(width / 2, -50, width, 100, wallOptions),
            Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions),
            Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions),
            Bodies.rectangle(-50, height / 2, 100, height, wallOptions)
        ];

        Composite.add(engine.world, [...bodies, ...walls]);

        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        Composite.add(engine.world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // Add "Anti-Gravity" effect on mouse move
        Events.on(engine, 'beforeUpdate', function () {
            const mousePosition = mouse.position;
            const bodies = Composite.allBodies(engine.world);

            bodies.forEach(body => {
                if (body.isStatic) return;

                const dx = body.position.x - mousePosition.x;
                const dy = body.position.y - mousePosition.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Repel if close
                if (distance < 200) {
                    const forceMagnitude = (200 - distance) / 200 * 0.00005;
                    Body.applyForce(body, body.position, {
                        x: dx * forceMagnitude,
                        y: dy * forceMagnitude
                    });
                }
            });
        });


        // Run the engine
        Render.run(render);
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // Handle resize
        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) {
                render.canvas.remove();
            }
            Composite.clear(engine.world);
            Engine.clear(engine);
            render.canvas = null;
            render.context = null;
            render.textures = {};
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
