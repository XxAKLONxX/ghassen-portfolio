import React from 'react';
import { cn } from '@/lib/utils';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function PixelButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: PixelButtonProps) {
  const baseStyles =
    'font-semibold transition-all duration-200 cursor-pointer uppercase tracking-tight text-xs font-mono focus-glow active:scale-95';

  const variantStyles = {
    primary: 'bg-cyan text-background border border-cyan pixel-border hover:glow-cyan-strong hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-cyan-light text-background border border-cyan-light pixel-border hover:glow-cyan-strong hover:shadow-lg hover:-translate-y-0.5',
    accent: 'bg-purple-accent text-foreground border border-purple-accent pixel-border hover:glow-purple-strong hover:shadow-lg hover:-translate-y-0.5',
    outline: 'bg-transparent text-cyan border pixel-border hover:bg-cyan/10 hover:glow-cyan-strong hover:-translate-y-0.5',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
