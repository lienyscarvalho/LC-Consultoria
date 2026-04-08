import React from 'react';

export default function Logo({ className = "", showText = true }: { className?: string, showText?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Crest/Shield */}
        <path d="M50 5 L10 25 L10 55 C10 75 50 95 50 95 C50 95 90 75 90 55 L90 25 L50 5 Z" fill="#C8973A" />
        <path d="M50 12 L18 28 L18 55 C18 70 50 85 50 85 C50 85 82 70 82 55 L82 28 L50 12 Z" fill="#1A237E" />
        
        {/* Letters */}
        <text x="50" y="62" fontFamily="serif" fontSize="32" fontWeight="bold" fill="#C8973A" textAnchor="middle">LC</text>
        
        {/* Decorative elements */}
        <path d="M35 40 Q30 45 35 50" stroke="#C8973A" strokeWidth="2" fill="none" />
        <path d="M65 40 Q70 45 65 50" stroke="#C8973A" strokeWidth="2" fill="none" />
      </svg>
      {showText && (
        <span className="font-serif text-xl font-bold tracking-tight text-[#C8973A]">
          LC <span className="font-normal text-white">Consultoria</span>
        </span>
      )}
    </div>
  );
}
