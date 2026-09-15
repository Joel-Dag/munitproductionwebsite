import React, { useState } from 'react';
import { MunitLogoVector } from './MunitLogoVector';

interface StudioLogoProps {
  className?: string;
  imgClassName?: string;
}

export const StudioLogo: React.FC<StudioLogoProps> = ({
  className = '',
  imgClassName = 'h-9 w-auto'
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {!imgFailed ? (
        <img
          src="/assets/logo.png"
          alt="Munit Production Logo"
          onError={() => setImgFailed(true)}
          className={`object-contain ${imgClassName}`}
        />
      ) : (
        <MunitLogoVector className={imgClassName} />
      )}
    </div>
  );
};

