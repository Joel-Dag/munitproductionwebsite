import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  glowColor?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  id?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  depth = 12,
  glowColor = 'rgba(212, 163, 115, 0.25)',
  onClick,
  style = {},
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D physics
  const springConfig = { damping: 20, stiffness: 260, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [depth, -depth]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-depth, depth]), springConfig);

  // Dynamic light glare position
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Normalized from -0.5 to 0.5
    const normX = clientX / rect.width - 0.5;
    const normY = clientY / rect.height - 0.5;

    x.set(normX);
    y.set(normY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative [transform-style:preserve-3d]"
    >
      <motion.div
        ref={cardRef}
        id={id}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          ...style,
        }}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`relative transition-shadow duration-300 ${
          isHovered
            ? 'shadow-[0_20px_40px_-15px_rgba(26,24,24,0.18),0_0_25px_0_rgba(224,169,109,0.2)]'
            : ''
        } ${className}`}
      >
        {/* Dynamic 3D Specular Sheen Glare */}
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] overflow-hidden opacity-40 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, ${glowColor} 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Content with 3D Depth transform */}
        <div className="relative z-10 [transform:translateZ(20px)] [transform-style:preserve-3d]">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
