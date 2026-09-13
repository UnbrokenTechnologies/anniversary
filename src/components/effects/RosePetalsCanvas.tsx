import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  color: string;
}

export const RosePetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction for wind breeze
    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Petal color palette
    const colors = [
      'rgba(219, 39, 119, ', // Pink-600
      'rgba(244, 63, 94, ',  // Rose-500
      'rgba(190, 18, 60, ',  // Rose-700
      'rgba(225, 29, 72, ',  // Rose-600
      'rgba(159, 18, 57, ',  // Rose-900
    ];

    const petalCount = window.innerWidth < 768 ? 22 : 45;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.015,
        opacity: Math.random() * 0.4 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(1, Math.cos(p.flip));

      // Draw curved rose petal
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
      ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);

      // Shaded petal gradient
      const grad = ctx.createLinearGradient(-p.size / 2, 0, p.size / 2, p.size);
      grad.addColorStop(0, `${p.color}${p.opacity})`);
      grad.addColorStop(0.7, `${p.color}${p.opacity * 0.85})`);
      grad.addColorStop(1, `rgba(100, 10, 30, ${p.opacity * 0.6})`);

      ctx.fillStyle = grad;
      ctx.fill();

      // Subtle center vein
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.quadraticCurveTo(p.size * 0.1, p.size * 0.5, 0, p.size * 0.85);
      ctx.strokeStyle = `rgba(255, 200, 220, ${p.opacity * 0.4})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick * 0.015 + i) * 0.6;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Subtle mouse push
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x += (dx / dist) * 1.5;
          p.y += (dy / dist) * 1.2;
        }

        // Wrap around screen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.85 }}
    />
  );
};
