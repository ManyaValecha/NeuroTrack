import { useEffect, useRef } from 'react';

export default function LiveNeuralStream() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; speed: number; size: number; opacity: number }[] = [];

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: 0.5 + Math.random() * 1,
                    size: 1 + Math.random() * 2,
                    opacity: 0.1 + Math.random() * 0.4
                });
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Sine Waves (Neural Data)
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(14, 165, 233, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < 3; i++) {
                ctx.moveTo(0, canvas.height * (0.3 + i * 0.2));
                for (let x = 0; x < canvas.width; x += 10) {
                    const y = canvas.height * (0.3 + i * 0.2) + Math.sin(x * 0.002 + Date.now() * 0.001 + i) * 50;
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            // Draw Particles (Data Nodes)
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
                ctx.fill();

                p.x += p.speed;
                if (p.x > canvas.width) p.x = -10;
            });

            animationFrameId = requestAnimationFrame(render);
        };

        init();
        render();
        window.addEventListener('resize', init);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', init);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1] opacity-40"
        />
    );
}
