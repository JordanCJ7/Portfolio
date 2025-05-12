import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionWrapper({
  id,
  className,
  title,
  subtitle,
  children,
  titleClassName,
  subtitleClassName,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn('py-12 md:py-16 lg:py-20', className)}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="mb-8 md:mb-12 text-center">
            {title && (
              <h2 className={cn('text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2', titleClassName)}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn('text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto', subtitleClassName)}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
