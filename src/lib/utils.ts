import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeUntilBirthday(): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthday: boolean;
} {
  const now = new Date();
  const currentYear = now.getFullYear();
  let birthday = new Date(currentYear, 7, 7); // August 7

  if (now > birthday) {
    birthday = new Date(currentYear + 1, 7, 7);
  }

  const diff = birthday.getTime() - now.getTime();
  const isBirthday =
    now.getMonth() === 7 && now.getDate() === 7;

  if (isBirthday) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isBirthday: false,
  };
}

export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
