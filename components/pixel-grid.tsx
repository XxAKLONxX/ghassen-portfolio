import React from 'react';
import { cn } from '@/lib/utils';

interface PixelGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number;
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function PixelGrid({
  cols = 3,
  gap = 'md',
  className,
  children,
  ...props
}: PixelGridProps) {
  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  const colStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={cn(
        'grid',
        colStyles[cols as keyof typeof colStyles] || colStyles[3],
        gapStyles[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
