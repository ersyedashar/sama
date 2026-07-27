"use client";

import { useEffect, useCallback } from "react";

export default function ClickEffects() {
  const handleClick = useCallback((e: MouseEvent) => {
    // Floating hearts
    createFloatingHeart(e.clientX, e.clientY);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return null;
}

function createFloatingHeart(x: number, y: number) {
  if (Math.random() > 0.3) return; // Only 30% of clicks create hearts

  const heart = document.createElement("div");
  const size = Math.random() * 12 + 8;
  const color = ["#ff6b9d", "#b48eff", "#ffb8d0", "#ffd700", "#ff4081"][
    Math.floor(Math.random() * 5)
  ];
  const offsetX = (Math.random() - 0.5) * 60;

  heart.innerHTML = "❤";
  heart.style.cssText = `
    position: fixed;
    left: ${x + offsetX}px;
    top: ${y}px;
    font-size: ${size}px;
    color: ${color};
    pointer-events: none;
    z-index: 9999;
    opacity: 0.8;
    animation: float-up 1.5s ease-out forwards;
  `;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes float-up {
      0% { transform: translateY(0) scale(1); opacity: 0.8; }
      50% { opacity: 0.6; }
      100% { transform: translateY(-120px) scale(0.3) rotate(${Math.random() * 40 - 20}deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
    style.remove();
  }, 1500);
}
