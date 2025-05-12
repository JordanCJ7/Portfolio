"use client";

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  animationClass?: string; // e.g., 'animate-fade-in-up'
  delay?: string; // e.g., 'delay-200'
  threshold?: number;
  once?: boolean; // Trigger animation only once
}

export default function AnimatedElement({
  children,
  className,
  animationClass = 'animate-fade-in-up', // Default animation
  delay = '',
  threshold = 0.1,
  once = true,
}: AnimatedElementProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) { // Check ref.current before disconnecting
            observer.unobserve(ref.current);
          }
        } else {
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) { // Check ref.current before disconnecting
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [threshold, once]);

  // Add keyframes for fade-in-up animation in globals.css or tailwind.config.js if not already present
  // For simplicity, we'll assume utility classes like 'opacity-0', 'translate-y-4' and transition utilities are available.
  // Or define custom animation:
  // @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
  // .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? `opacity-100 translate-y-0 ${delay} ${animationClass}` : 'opacity-0 translate-y-5',
        className
      )}
      style={isVisible ? {} : { animationPlayState: 'paused' }} // Ensure animation is paused until visible
    >
      {children}
    </div>
  );
}

// Add these to tailwind.config.js keyframes and animation sections or globals.css:
// keyframes: {
//   'fade-in-up': {
//     '0%': { opacity: '0', transform: 'translateY(20px)' },
//     '100%': { opacity: '1', transform: 'translateY(0)' },
//   },
// },
// animation: {
//   'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
// }
