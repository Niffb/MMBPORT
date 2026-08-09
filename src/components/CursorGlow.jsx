import { useEffect, useRef } from 'react';

/**
 * Subtle radial glow that follows the mouse cursor.
 */
export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let rafId;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.left = `${glowX}px`;
        glowRef.current.style.top = `${glowY}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div className="cursor-glow" ref={glowRef} />;
}
