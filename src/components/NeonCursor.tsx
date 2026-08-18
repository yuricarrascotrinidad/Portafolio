// ─── Neon Cursor ─────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

export default function NeonCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Seguimiento instantáneo para que se sienta como un puntero real
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener('mousemove', onMove);
    // Ocultar el cursor por defecto del sistema
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform'
      }}
    >
      <svg
        width="24"
        height="28"
        viewBox="0 0 24 28"
        style={{
          position: 'absolute',
          // Desplazamos 2px para que la punta de la flecha (M2,2) 
          // coincida exactamente con la posición real del clic (0,0)
          top: '-2px', 
          left: '-2px',
          filter: 'drop-shadow(0 0 3px #00eeff) drop-shadow(0 0 8px #00eeff)'
        }}
      >
        <path
          d="M2,2 L2,18 L6,14 L9,21 L12,20 L9,13 L14,13 Z"
          fill="transparent"
          stroke="#00eeff"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
