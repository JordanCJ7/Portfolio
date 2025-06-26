// @/components/layout/header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CodeXml, Home, Layers, Mail, Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: Layers },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Sparkles },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const NavLink = ({ href, label, icon: Icon, onClick }: { href: string; label: string; icon: React.ElementType; onClick?: () => void }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          'justify-start sm:justify-center text-sm font-medium',
          pathname === href
            ? 'text-primary hover:text-primary/90 bg-accent/50'
            : 'text-foreground/80 hover:text-foreground hover:bg-accent/30'
        )}
        onClick={onClick}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </Link>
  );

  if (!isMounted) {
    return ( // Skeleton or simplified header for SSR/pre-hydration
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-lg font-semibold">
            <CodeXml className="h-7 w-7 text-primary" />
            <span>Janitha Gamage</span>
          </Link>
          <div className="h-8 w-8 bg-muted rounded-md animate-pulse sm:hidden"></div>
          <nav className="hidden sm:flex items-center space-x-2">
             <div className="h-8 w-20 bg-muted rounded-md animate-pulse"></div>
             <div className="h-8 w-20 bg-muted rounded-md animate-pulse"></div>
             <div className="h-8 w-24 bg-muted rounded-md animate-pulse"></div>
             <div className="h-8 w-20 bg-muted rounded-md animate-pulse"></div>
          </nav>
        </div>
      </header>
    );
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-lg font-semibold">
          <CodeXml className="h-7 w-7 text-primary" />
          <span className="tracking-tight">Janitha Gamage</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-1 md:space-x-2">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="sm:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6 bg-background">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center mb-4">
                   <Link href="/" className="flex items-center space-x-2 text-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                    <CodeXml className="h-7 w-7 text-primary" />
                    <span>Janitha Gamage</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                {navItems.map((item) => (
                  <NavLink key={item.href} {...item} onClick={() => setIsMobileMenuOpen(false)} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
