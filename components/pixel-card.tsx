import React from 'react';
import { cn } from '@/lib/utils';

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'subtle';
  children: React.ReactNode;
}

export function PixelCard({
  variant = 'default',
  className,
  children,
  ...props
}: PixelCardProps) {
  const baseStyles =
    'bg-card border border-border rounded-sm p-6 transition-all duration-300 hover:-translate-y-1';

  const variantStyles = {
    default: 'pixel-border hover:shadow-lg',
    glow: 'pixel-border glow-cyan hover:glow-cyan-strong hover:shadow-lg',
    subtle: 'pixel-border-subtle border-muted/30 hover:border-muted/50',
  };

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
