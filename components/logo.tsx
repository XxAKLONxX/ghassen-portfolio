import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(0,512) scale(0.1,-0.1)" fill="currentColor" stroke="none">
        <path d="M1780 4125 l0 -155 -155 0 -155 0 0 -1410 0 -1410 155 0 155 0 0 -155 0 -155 780 0 780 0 0 155 0 155 155 0 155 0 0 785 0 785 -465 0 -465 0 0 -315 0 -315 155 0 155 0 0 -310 0 -310 -470 0 -470 0 0 1090 0 1090 470 0 470 0 0 -155 0 -155 310 0 310 0 0 315 0 315 -155 0 -155 0 0 155 0 155 -780 0 -780 0 0 -155z" />
      </g>
    </svg>
  );
}
