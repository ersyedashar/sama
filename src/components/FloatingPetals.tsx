"use client";

import { useEffect, useState } from "react";

export default function FloatingPetals() {
  const [petals, setPetals] = useState<
    { id: number; x: number; delay: number; size: number; duration: number; hue: number }[]
  >([]);

  useEffect(() => {
    const count = window.innerWidth < 640 ? 6 : window.innerWidth < 1024 ? 10 : 15;
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 20,
        size: Math.random() * 12 + 8,
        duration: Math.random() * 15 + 15,
        hue: Math.random() * 30 + 330,
      }))
    );
  }, []);

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-20"
          style={{
            left: `${petal.x}%`,
            top: "-5%",
            animation: `drift ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
          >
            <path
              d="M10 0C10 0 20 8 20 16C20 22 15 26 10 26C5 26 0 22 0 16C0 8 10 0 10 0Z"
              fill={`hsla(${petal.hue}, 60%, 80%, 0.6)`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
