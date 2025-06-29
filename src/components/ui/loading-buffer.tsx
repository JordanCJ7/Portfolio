"use client";

import { useState, useEffect } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingBufferProps {
  className?: string;
}

export function LoadingBar({ className }: LoadingBufferProps) {
  const { isNavigating } = useNavigation();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isNavigating) {
      setIsVisible(true);
      setProgress(0);
      
      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev; // Don't go to 100% until navigation completes
          return prev + Math.random() * 15; // Random increments for realistic feel
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      // Complete the progress bar quickly when navigation finishes
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 500);
    }
  }, [isNavigating]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-[60] h-1 bg-gradient-to-r from-primary/20 to-accent/20",
      className
    )}>
      <div 
        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-200 ease-out shadow-lg"
        style={{ 
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(var(--primary), 0.5)'
        }}
      />
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
    </div>
  );
}

export function LoadingSpinner({ className }: LoadingBufferProps) {
  const { isNavigating } = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isNavigating) {
      // Show spinner after a slight delay to avoid flickering on fast navigations
      const timer = setTimeout(() => setIsVisible(true), 150);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isNavigating]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-[55] flex items-center justify-center bg-background/80 backdrop-blur-sm",
      className
    )}>
      <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-background/90 border shadow-xl backdrop-blur-xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-sm text-muted-foreground font-medium">
          Loading page...
        </div>
        {/* Pulsing dots */}
        <div className="flex gap-1">
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
}

export function LoadingOverlay({ className }: LoadingBufferProps) {
  const { isNavigating } = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isNavigating) {
      setIsVisible(true);
      setProgress(0);
      
      // Smooth progress animation
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) return prev;
          return prev + Math.random() * 12;
        });
      }, 80);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 300);
    }
  }, [isNavigating]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-[55] bg-background/60 backdrop-blur-sm transition-all duration-300",
      className
    )}>
      {/* Modern card-style loader */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-background/95 backdrop-blur-xl border rounded-xl p-6 shadow-2xl min-w-[280px]">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <div className="absolute inset-0 h-6 w-6 rounded-full border-2 border-primary/20" />
            </div>
            <span className="text-sm font-medium text-foreground">
              Loading page...
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Status text */}
          <div className="mt-3 text-xs text-muted-foreground text-center">
            Optimizing your experience...
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component that combines all loading states
export default function LoadingBuffer({ 
  type = 'overlay',
  className 
}: LoadingBufferProps & { 
  type?: 'bar' | 'spinner' | 'overlay' 
}) {
  switch (type) {
    case 'bar':
      return <LoadingBar className={className} />;
    case 'spinner':
      return <LoadingSpinner className={className} />;
    case 'overlay':
      return <LoadingOverlay className={className} />;
    default:
      return <LoadingOverlay className={className} />;
  }
}
