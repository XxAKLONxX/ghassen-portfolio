import React from 'react';
import { cn } from '@/lib/utils';

interface GlowEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'cyan' | 'purple';
  intensity?: 'soft' | 'medium' | 'strong';
  children: React.ReactNode;
}

export function GlowEffect({
  color = 'cyan',
  intensity = 'medium',
  className,
  children,
  ...props
}: GlowEffectProps) {
  const colorStyles = {
    cyan: 'glow-cyan',
    purple: 'glow-purple',
  };

  const intensityStyles = {
    soft: '',
    medium: 'hover:glow-cyan-strong',
    strong: 'glow-cyan-strong',
  };

  return (
    <div
      className={cn(
        'transition-all duration-200',
        colorStyles[color],
        intensityStyles[intensity],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
