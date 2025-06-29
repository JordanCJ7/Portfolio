"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { performanceMonitor } from '@/lib/performance';

interface NavigationState {
  isNavigating: boolean;
  previousPath: string | null;
  navigationHistory: string[];
  prefetchedRoutes: Set<string>;
}

interface NavigationContextType extends NavigationState {
  navigate: (path: string, options?: { replace?: boolean; prefetch?: boolean }) => Promise<void>;
  prefetchRoute: (path: string) => void;
  isPrefetched: (path: string) => boolean;
  getNavigationMetrics: () => any;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

// Route prefetching strategy
const PREFETCH_STRATEGIES = {
  immediate: ['/', '/projects'], // Prefetch immediately
  onHover: ['/skills', '/education', '/contact'], // Prefetch on hover
  onIdle: ['/ai-assistant'], // Prefetch when browser is idle
};

export function NavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [state, setState] = useState<NavigationState>({
    isNavigating: false,
    previousPath: null,
    navigationHistory: [pathname],
    prefetchedRoutes: new Set(),
  });

  // Enhanced navigation function with performance monitoring
  const navigate = useCallback(async (
    path: string, 
    options: { replace?: boolean; prefetch?: boolean } = {}
  ) => {
    const { replace = false, prefetch = true } = options;
    
    // Don't navigate to current path
    if (path === pathname) return;

    // Start performance monitoring
    performanceMonitor.markRouteChangeStart(path);
    
    const startTime = Date.now();
    
    setState(prev => ({
      ...prev,
      isNavigating: true,
      previousPath: pathname,
    }));

    try {
      // Prefetch if requested
      if (prefetch && !state.prefetchedRoutes.has(path)) {
        await prefetchRoute(path);
      }

      // Navigate
      if (replace) {
        router.replace(path);
      } else {
        router.push(path);
      }

      // Update navigation history
      setState(prev => ({
        ...prev,
        navigationHistory: [...prev.navigationHistory, path].slice(-10), // Keep last 10
      }));

      // Ensure minimum loading time for better UX (prevent flickering)
      const elapsed = Date.now() - startTime;
      const minLoadTime = 200; // 200ms minimum
      if (elapsed < minLoadTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadTime - elapsed));
      }

    } catch (error) {
      console.error('Navigation failed:', error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router, state.prefetchedRoutes]);

  // Advanced prefetching with different strategies
  const prefetchRoute = useCallback((path: string) => {
    if (state.prefetchedRoutes.has(path)) return;

    // Use Next.js router prefetch
    router.prefetch(path);
    
    setState(prev => ({
      ...prev,
      prefetchedRoutes: new Set([...prev.prefetchedRoutes, path]),
    }));

    console.log(`🔗 Prefetched route: ${path}`);
  }, [router, state.prefetchedRoutes]);

  const isPrefetched = useCallback((path: string) => {
    return state.prefetchedRoutes.has(path);
  }, [state.prefetchedRoutes]);

  const getNavigationMetrics = useCallback(() => {
    return {
      ...performanceMonitor.getMetrics(),
      navigationHistory: state.navigationHistory,
      prefetchedRoutes: Array.from(state.prefetchedRoutes),
    };
  }, [state.navigationHistory, state.prefetchedRoutes]);

  // Initialize prefetching strategies
  useEffect(() => {
    // Immediate prefetch for critical routes
    PREFETCH_STRATEGIES.immediate.forEach(route => {
      if (route !== pathname) {
        prefetchRoute(route);
      }
    });

    // Idle prefetch
    if ('requestIdleCallback' in window) {
      const idleCallback = () => {
        PREFETCH_STRATEGIES.onIdle.forEach(route => {
          if (route !== pathname && !state.prefetchedRoutes.has(route)) {
            prefetchRoute(route);
          }
        });
      };
      
      const idleId = window.requestIdleCallback(idleCallback, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }
  }, [pathname, prefetchRoute, state.prefetchedRoutes]);

  // Handle route change completion
  useEffect(() => {
    if (state.isNavigating) {
      performanceMonitor.markRouteChangeComplete(pathname);
      setState(prev => ({ ...prev, isNavigating: false }));
    }
  }, [pathname, state.isNavigating]);

  // Performance monitoring on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      performanceMonitor.logMetrics();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const value: NavigationContextType = {
    ...state,
    navigate,
    prefetchRoute,
    isPrefetched,
    getNavigationMetrics,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

// Enhanced Link component with smart prefetching
export interface SmartLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: 'hover' | 'visible' | 'immediate' | 'none';
  replace?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

export function SmartLink({ 
  href, 
  children, 
  prefetch = 'hover', 
  replace = false,
  onClick,
  ...props 
}: SmartLinkProps) {
  const { navigate, prefetchRoute, isPrefetched } = useNavigation();
  const [isHovered, setIsHovered] = useState(false);

  // Handle click navigation
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    navigate(href, { replace });
  }, [navigate, href, replace, onClick]);

  // Handle hover prefetching
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (prefetch === 'hover' && !isPrefetched(href)) {
      prefetchRoute(href);
    }
  }, [prefetch, href, isPrefetched, prefetchRoute]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Immediate prefetching
  useEffect(() => {
    if (prefetch === 'immediate' && !isPrefetched(href)) {
      prefetchRoute(href);
    }
  }, [prefetch, href, isPrefetched, prefetchRoute]);

  // Intersection observer for visible prefetching
  useEffect(() => {
    if (prefetch !== 'visible') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPrefetched(href)) {
            prefetchRoute(href);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(`[data-smart-link="${href}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [prefetch, href, isPrefetched, prefetchRoute]);

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-smart-link={href}
      data-prefetched={isPrefetched(href)}
      data-hovered={isHovered}
      {...props}
    >
      {children}
    </a>
  );
}
