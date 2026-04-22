import React from 'react';
import { cn } from '@/lib/utils';

interface PixelBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'muted';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function PixelBadge({
  variant = 'primary',
  size = 'sm',
  className,
  children,
  ...props
}: PixelBadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-sm border font-mono font-semibold';

  const variantStyles = {
    primary: 'bg-cyan/10 text-cyan border-cyan pixel-border',
    secondary: 'bg-cyan-light/10 text-cyan-light border-cyan-light pixel-border',
    accent: 'bg-purple-accent/10 text-purple-accent border-purple-accent pixel-border',
    muted: 'bg-muted/30 text-muted-foreground border-border pixel-border-subtle',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
