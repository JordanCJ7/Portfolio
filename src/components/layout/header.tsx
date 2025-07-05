// @/components/layout/header.tsx
"use client";

import { usePathname } from 'next/navigation';
import { CodeXml, Home, Layers, Mail, Sparkles, Menu, X, Brain, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { SmartLink, useNavigation } from '@/contexts/NavigationContext';
import { throttle } from '@/lib/performance';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: Home, prefetch: 'immediate' as const },
  { href: '/projects', label: 'Projects', icon: Layers, prefetch: 'immediate' as const },
  { href: '/skills', label: 'Skills', icon: Brain, prefetch: 'hover' as const },
  { href: '/education', label: 'Education', icon: GraduationCap, prefetch: 'hover' as const },
  { href: '/ai-assistant', label: 'Ask About Janitha', icon: Sparkles, prefetch: 'hover' as const },
  { href: '/contact', label: 'Contact', icon: Mail, prefetch: 'hover' as const },
];

export default function Header() {
  const pathname = usePathname();
  const { isNavigating, isPrefetched } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Enhanced scroll handler with throttling
  const handleScroll = useCallback(() => {
    const throttledScroll = throttle(() => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    }, 16); // ~60fps
    
    return throttledScroll();
  }, []);

  useEffect(() => {
    setIsMounted(true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Optimized NavLink component with enhanced effects but no borders
  const NavLink = useCallback(({ 
    href, 
    label, 
    icon: Icon, 
    prefetch = 'hover',
    onClick,
    isMobile = false 
  }: { 
    href: string; 
    label: string; 
    icon: React.ElementType; 
    prefetch?: 'hover' | 'visible' | 'immediate' | 'none';
    onClick?: () => void;
    isMobile?: boolean;
  }) => {
    const isActive = pathname === href;
    const prefetched = isPrefetched(href);
    
    return (
      <SmartLink 
        href={href} 
        prefetch={prefetch}
        onClick={onClick}
        className={cn(
          // Base styles - enhanced with better transitions and micro-interactions
          'group relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 ease-out',
          'rounded-xl hover:scale-105 active:scale-95',
          
          // Focus and accessibility
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          
          // Mobile vs Desktop spacing
          isMobile ? 'w-full justify-start px-4 py-3' : 'min-w-[80px]',
          
          // Active state with enhanced styling (no borders, no bottom indicator)
          isActive
            ? [
                'text-primary bg-primary/10 shadow-sm',
                'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-primary/20 before:to-accent/20',
                'before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
                // Removed bottom indicator lines
                isMobile && 'bg-primary/5'
              ]
            : [
                'text-muted-foreground hover:text-foreground',
                'hover:bg-accent/50 hover:shadow-sm'
                // Removed bottom indicator lines
              ],
          
          // Loading state when navigating
          isNavigating && href !== pathname && 'opacity-70 cursor-wait',
          
          // Prefetch indicator (subtle) - removed ring border
          prefetched && !isActive && 'bg-green-500/5'
        )}
        data-active={isActive}
        data-prefetched={prefetched}
      >
        <Icon className={cn(
          'h-4 w-4 transition-all duration-200',
          isActive ? 'text-primary scale-110' : 'text-muted-foreground group-hover:text-foreground group-hover:scale-105'
        )} />
        <span className={cn(
          'transition-all duration-200',
          isActive && 'font-semibold'
        )}>
          {label}
        </span>
        
        {/* Subtle animation indicators */}
        {isActive && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse" />
        )}
      </SmartLink>
    );
  }, [pathname, isPrefetched, isNavigating]);

  // Memoize navigation items to prevent unnecessary re-renders
  const memoizedNavItems = useMemo(() => navItems, []);

  // Enhanced loading skeleton with better animations
  if (!isMounted) {
    return (
      <header className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        'bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60',
        'border-border/40'
      )}>
        <div className="container flex h-16 items-center justify-between pl-6">
          <div className="flex items-center space-x-2 ml-2">
            <div className="h-7 w-7 rounded-md bg-primary/20 animate-pulse" />
            <div className="h-6 w-32 rounded bg-muted/50 animate-pulse" />
          </div>
          
          {/* Mobile skeleton */}
          <div className="h-8 w-8 bg-muted/50 rounded-md animate-pulse sm:hidden" />
          
          {/* Desktop skeleton */}
          <nav className="hidden sm:flex items-center space-x-3 md:space-x-4">
            {[68, 85, 72, 95, 88, 75].map((width, i) => (
              <div 
                key={i} 
                className="h-8 bg-muted/50 rounded-xl animate-pulse"
                style={{ 
                  width: `${width}px`,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full border-b transition-all duration-300',
      // Enhanced backdrop blur and transparency
      'bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60',
      // Dynamic border and shadow based on scroll
      isScrolled 
        ? 'border-border/60 shadow-lg shadow-primary/5' 
        : 'border-border/40',
      // Loading state
      isNavigating && 'opacity-95'
    )}>
      <div className="container flex h-16 items-center justify-between pl-6">
        {/* Enhanced Logo with better animations and left margin */}
        <SmartLink 
          href="/" 
          prefetch="immediate"
          className={cn(
            'flex items-center space-x-2 text-lg font-semibold transition-all duration-200 ml-4',
            'hover:scale-105 active:scale-95 group',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          )}
        >
          <CodeXml className={cn(
            'h-7 w-7 text-primary transition-all duration-300',
            'group-hover:rotate-12 group-hover:scale-110',
            isScrolled && 'scale-95'
          )} />
          <span className={cn(
            'tracking-tight transition-all duration-200',
            'bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent',
            'group-hover:from-primary group-hover:to-accent'
          )}>
            Janitha Gamage
          </span>
        </SmartLink>
        {/* Visible round admin portal button next to name, separate from name link, with icon and default header theme */}
        <button
          type="button"
          aria-label="Admin Portal"
          onClick={e => {
            e.stopPropagation();
            router.push('/admin/messages');
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            marginLeft: 8,
            borderRadius: '50%',
            background: 'var(--background)',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s, transform 0.2s, background 0.2s',
          }}
          className="admin-portal-trigger hover:shadow-xl hover:bg-primary/10 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {/* Use a lock icon for admin */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </button>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-3 md:space-x-4">
          {memoizedNavItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Enhanced Mobile Navigation */}
        <div className="sm:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className={cn(
                  'relative transition-all duration-200 hover:scale-105 active:scale-95',
                  'hover:bg-accent/50'
                )}
              >
                <div className="relative">
                  <Menu className={cn(
                    'h-6 w-6 transition-all duration-300',
                    isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  )} />
                  <X className={cn(
                    'absolute inset-0 h-6 w-6 transition-all duration-300',
                    isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  )} />
                </div>
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className={cn(
                'w-full max-w-xs p-0 bg-background/95 backdrop-blur-xl',
                'border-l border-border/40'
              )}
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col">
                {/* Mobile header */}
                <div className="flex items-center justify-between p-6 border-b border-border/40">
                  <SmartLink 
                    href="/" 
                    prefetch="immediate"
                    className="flex items-center space-x-2 text-lg font-semibold group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <CodeXml className="h-7 w-7 text-primary group-hover:rotate-12 transition-transform duration-300" />
                    <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                      Janitha Gamage
                    </span>
                  </SmartLink>
                  
                  <SheetClose asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-accent/50 transition-colors duration-200"
                    >
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
                
                {/* Mobile navigation */}
                <nav className="flex-1 p-4 space-y-2">
                  {memoizedNavItems.map((item) => (
                    <NavLink 
                      key={item.href} 
                      {...item} 
                      isMobile={true}
                      onClick={() => setIsMobileMenuOpen(false)} 
                    />
                  ))}
                </nav>
                
                {/* Mobile footer with performance info (dev only) */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="p-4 border-t border-border/40 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Prefetched: {navItems.filter(item => isPrefetched(item.href)).length}</span>
                      <span className={cn(
                        'transition-colors duration-200',
                        isNavigating ? 'text-orange-500' : 'text-green-500'
                      )}>
                        {isNavigating ? 'Navigating...' : 'Ready'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Subtle loading indicator */}
      {isNavigating && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent animate-pulse" />
      )}
    </header>
  );
}
