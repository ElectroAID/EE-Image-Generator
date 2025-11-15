
import React from 'react';

export const CircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9h2l-3 4" />
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9h-2l3-4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
    />
  </svg>
);

export const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
    >
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.75.75v3.546a.75.75 0 01-1.5 0V5.25A.75.75 0 019 4.5zM12.75 8.638a.75.75 0 01.69.946l-1.534 3.454a.75.75 0 11-1.38-.616l1.534-3.454a.75.75 0 01.69-.33zM15 4.5a.75.75 0 01.75.75v3.546a.75.75 0 01-1.5 0V5.25A.75.75 0 0115 4.5zM12 15.75a.75.75 0 01.75.75v3.016a.75.75 0 01-1.5 0V16.5a.75.75 0 01.75-.75zM8.25 14.138a.75.75 0 01.69.946l-1.534 3.454a.75.75 0 11-1.38-.616l1.534-3.454a.75.75 0 01.69-.33zM18.75 11.25a.75.75 0 01.75.75v3.016a.75.75 0 01-1.5 0V12a.75.75 0 01.75-.75zM5.25 11.25a.75.75 0 01.75.75v3.016a.75.75 0 01-1.5 0V12a.75.75 0 01.75-.75zM15.75 14.138a.75.75 0 01.69.946l-1.534 3.454a.75.75 0 11-1.38-.616l1.534-3.454a.75.75 0 01.69-.33z" clipRule="evenodd" />
        <path d="M12 1.5a5.25 5.25 0 00-5.25 5.25.75.75 0 01-1.5 0A6.75 6.75 0 0112 0a6.75 6.75 0 016.75 6.75.75.75 0 01-1.5 0A5.25 5.25 0 0012 1.5z" />
    </svg>
);
