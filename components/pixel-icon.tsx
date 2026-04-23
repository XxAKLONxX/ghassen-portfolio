import React from 'react';
import { cn } from '@/lib/utils';

interface PixelIconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * Renders an SVG icon from /public/icons/ using a CSS mask, so it fully
 * inherits the current text color. Use `text-cyan`, `text-muted-foreground`,
 * `hover:text-cyan-light`, etc. on the parent or directly on this element.
 */
export function PixelIcon({ name, size = 32, className, alt = '', ...props }: PixelIconProps) {
  const url = `/icons/${name}.svg`;
  return (
    <span
      role={alt ? 'img' : 'presentation'}
      aria-label={alt || undefined}
      aria-hidden={!alt || undefined}
      className={cn('inline-block bg-current transition-colors', className)}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
      {...props}
    />
  );
}
