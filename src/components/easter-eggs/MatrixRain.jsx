import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function MatrixRain({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const characters = '01MAROUANERADIDEVOS{}[]();/<>*+=#@$%^&';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    const render = () => {
      ctx.fillStyle = 'rgba(5, 7, 11, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00F0FF'; // Cyber cyan / matrix style
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 cursor-pointer flex flex-col justify-between p-6 select-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className="relative z-10 flex justify-between text-xs font-mono text-dev-cyan bg-black/60 p-2 rounded border border-dev-cyan/30 backdrop-blur-sm self-center">
        <span>MATRIX PROTOCOL ENGAGED // CLICK ANYWHERE OR PRESS ESC TO EXIT</span>
      </div>
    </motion.div>
  );
}
