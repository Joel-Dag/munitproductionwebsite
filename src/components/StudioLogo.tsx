import React, { useState } from 'react';

interface StudioLogoProps {
  className?: string;
  imgClassName?: string;
}

export const StudioLogo: React.FC<StudioLogoProps> = ({
  className = '',
  imgClassName = 'h-9 w-auto'
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {!hasError ? (
        <img
          src="/assets/logo.svg"
          alt="Munit Production Logo"
          onError={() => setHasError(true)}
          className={`object-contain rounded-lg ${imgClassName}`}
        />
      ) : (
        // Clean fallback if user deletes or provides incompatible file format
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1A1818] to-[#362D24] flex items-center justify-center text-[#E0A96D] shadow-xs border border-[#E0A96D]/30">
            <div className="flex items-center gap-0.5 h-4">
              <span className="w-0.5 h-2 bg-[#E0A96D] rounded-full" />
              <span className="w-0.5 h-3.5 bg-[#D4A373] rounded-full" />
              <span className="w-0.5 h-4 bg-[#E0A96D] rounded-full" />
              <span className="w-0.5 h-2.5 bg-[#D4A373] rounded-full" />
            </div>
          </div>
          <div>
            <span className="font-serif font-bold text-base tracking-wider text-[#1A1818] block leading-none">
              MUNIT PRODUCTION
            </span>
            <span className="text-[10px] tracking-widest text-[#9C6D38] uppercase font-semibold">
              Music Production Studio
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
