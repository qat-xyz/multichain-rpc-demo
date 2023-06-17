import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  s: number;
  tx: number;
  ty: number;
  oldX: number;
  oldY: number;
  isConnected: boolean;
};

type Line = { x1: number; x2: number; y1: number; y2: number; a: number };

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (ctx) {
        const fps = 60;
        const particlesAmount = 20;
        const particleMinSize = 1;
        const particleMaxSize = 12;
        const particleMinSpeed = 1;
        const particleMaxSpeed = 2;
        const lineDistance = 100;

        let frameInterval: string | number | NodeJS.Timeout | undefined;
        let particles: Particle[] = [];
        let lines: Line[] = [];
        const drawParticle = (p: Particle) => {
          ctx.fillStyle = p.isConnected ? "rgba(130, 89, 215,1)" : "white";
          ctx.strokeStyle = "rgba(130, 89, 215,1)";
          ctx.beginPath();
          // ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
          ctx.rect(p.x, p.y, p.r * 2, p.r * 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        };

        const drawLine = (l: Line) => {
          ctx.strokeStyle = "rgba(130, 89, 215," + l.a + ")";
          ctx.beginPath();
          ctx.moveTo(l.x1, l.y1);
          ctx.lineTo(l.x2, l.y2);
          ctx.closePath();
          ctx.stroke();
        };

        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (const l of lines) {
            drawLine(l);
          }
          for (const p of particles) {
            drawParticle(p);
          }
        };

        const createParticles = (amountNew: number, xy: { x: any; y: any }) => {
          let randY;
          let randX;
          for (let i = 0; i < amountNew; i++) {
            if (xy.x === 0 && xy.y === 0) {
              randX = Math.floor(Math.random() * canvas.width) + 1;
              randY = Math.floor(Math.random() * canvas.height) + 1;
            } else {
              randX = xy.x;
              randY = xy.y;
            }
            const newP: Particle = {
              x: randX,
              y: randY,
              oldX: randX,
              oldY: randY,
              tx: Math.floor(Math.random() * canvas.width) + 1,
              ty: Math.floor(Math.random() * canvas.height) + 1,
              s:
                Math.floor(Math.random() * (particleMaxSpeed - particleMinSpeed + 1)) +
                particleMinSpeed,
              r:
                Math.floor(Math.random() * (particleMaxSize - particleMinSize + 1)) +
                particleMinSize,
              isConnected: false,
            };
            particles.push(newP);
          }
        };

        const updateParticles = () => {
          for (let p of particles) {
            const nx = p.tx - p.x;
            const ny = p.ty - p.y;
            const dist = Math.sqrt(nx * nx + ny * ny);
            const velX = (nx / dist) * p.s;
            const velY = (ny / dist) * p.s;
            p.oldX = p.x;
            p.oldY = p.y;
            p.x += velX;
            p.y += velY;
            if (p.x < p.tx + p.s && p.x > p.tx - p.s && p.y < p.ty + p.s && p.y > p.ty - p.s) {
              p.tx = Math.floor(Math.random() * canvas.width) + 1;
              p.ty = Math.floor(Math.random() * canvas.height) + 1;
            }
          }
        };

        const checkLines = () => {
          lines = [];
          for (const p of particles) {
            let isConnected = false;
            for (const p2 of particles) {
              const dist = Math.sqrt(Math.pow(p2.x - p.x, 2) + Math.pow(p2.y - p.y, 2));
              if (dist > 0 && dist < lineDistance) {
                isConnected = true;
                const newLine = {
                  x1: p.x,
                  x2: p2.x,
                  y1: p.y,
                  y2: p2.y,
                  a: 1 - dist / lineDistance,
                };
                lines.push(newLine);
              }
            }
            p.isConnected = isConnected;
          }
        };

        const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          particles = [];
          const toSend = { x: 0, y: 0 };
          createParticles(particlesAmount, toSend);
          draw();
        };
        resizeCanvas();

        const frame = () => {
          frameInterval = setTimeout(() => {
            updateParticles();
            checkLines();
            draw();
            requestAnimationFrame(frame);
          }, 1000 / fps);
        };

        // Start Frame Loop
        const toSend = { x: 0, y: 0 };
        createParticles(particlesAmount, toSend);
        frame();

        // Event Listeners
        window.addEventListener("resize", resizeCanvas, false);

        return () => {
          window.removeEventListener("resize", resizeCanvas, false);
          if (frameInterval) {
            clearInterval(frameInterval);
          }
        };
      }
    }
  });

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
        opacity: 0.3,
      }}
    />
  );
};
