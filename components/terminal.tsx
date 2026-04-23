import React from 'react';
import { cn } from '@/lib/utils';

export interface TerminalLine {
  type: 'cmd' | 'output' | 'comment' | 'kv' | 'blink';
  text?: string;
  key?: string;
  val?: string;
}

interface TerminalProps {
  title?: string;
  lines: TerminalLine[];
  className?: string;
}

export function Terminal({ title = 'ghassen@portfolio ~ /status', lines, className }: TerminalProps) {
  return (
    <div
      className={cn(
        'terminal bg-card border border-border rounded-sm overflow-hidden shadow-lg',
        className,
      )}
    >
      {/* Terminal bar */}
      <div className="terminal-bar flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border bg-background/40">
        <div className="flex gap-1 sm:gap-1.5">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan shadow-[0_0_6px_var(--cyan)]" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-muted" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-muted" />
        </div>
        <span className="font-mono text-[10px] sm:text-[11px] text-muted-foreground ml-1 truncate">{title}</span>
      </div>

      {/* Body */}
      <div className="terminal-body p-4 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-[1.7] sm:leading-[1.9] overflow-x-auto">
        {lines.map((line, i) => {
          if (line.type === 'cmd') {
            return (
              <div key={i} className="text-muted-foreground">
                <span className="text-cyan">$</span>{' '}
                <span className="text-foreground">{line.text}</span>
              </div>
            );
          }
          if (line.type === 'output') {
            return (
              <div key={i} className="text-foreground">
                {line.text}
              </div>
            );
          }
          if (line.type === 'comment') {
            return (
              <div key={i} className="text-muted">
                # {line.text}
              </div>
            );
          }
          if (line.type === 'kv') {
            return (
              <div key={i} className="text-muted-foreground">
                <span className="text-cyan-light">{line.key}:</span>{' '}
                <span className="text-foreground">{line.val}</span>
              </div>
            );
          }
          if (line.type === 'blink') {
            return (
              <div key={i} className="text-muted-foreground">
                <span className="text-cyan">$</span>{' '}
                <span className="inline-block w-2 h-4 bg-cyan align-middle animate-[blink_1s_steps(2)_infinite]" />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
