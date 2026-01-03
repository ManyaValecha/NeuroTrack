import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NeuralVisualizerProps {
    isActive: boolean;
}

export default function NeuralVisualizer({ isActive }: NeuralVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let bars: number[] = new Array(40).fill(0);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 60;

            // Draw central pulse
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius + 20);
            gradient.addColorStop(0, isActive ? 'rgba(14, 165, 233, 0.4)' : 'rgba(14, 165, 233, 0.1)');
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius + (isActive ? Math.sin(Date.now() / 200) * 10 : 0), 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw frequency bars
            bars = bars.map((val) => {
                const target = isActive ? Math.random() * 50 + 10 : 2;
                return val + (target - val) * 0.2;
            });

            bars.forEach((val, i) => {
                const angle = (i / bars.length) * Math.PI * 2;
                const x1 = centerX + Math.cos(angle) * (radius + 5);
                const y1 = centerY + Math.sin(angle) * (radius + 5);
                const x2 = centerX + Math.cos(angle) * (radius + 5 + val);
                const y2 = centerY + Math.sin(angle) * (radius + 5 + val);

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgba(34, 211, 238, ${0.4 + (val / 100)})`;
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isActive]);

    return (
        <div className="relative w-full h-80 flex items-center justify-center">
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="max-w-full h-auto"
            />
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <div className="w-1 h-32 bg-primary/20 blur-xl animate-scanline" />
                </motion.div>
            )}
        </div>
    );
}
