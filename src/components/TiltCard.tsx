import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scaleOnHover?: number;
  glare?: boolean;
}

/**
 * 3D Interactive Card that bends / tilts toward where the mouse cursor points.
 * Implements smooth spring-damped physics and dynamic specular light reflections.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
  scaleOnHover = 1.025,
  glare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates: -0.5 to +0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physics spring
  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 20 });

  // Map mouse coordinate to 3D rotation angles
  // When cursor moves up (negative y), top bends forward (positive rotateX)
  // When cursor moves right (positive x), right bends forward (positive rotateY)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
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
      style={{ perspective: `${perspective}px` }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          scale: isHovered ? scaleOnHover : 1,
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`relative transition-shadow duration-300 ${className}`}
      >
        {/* Card Content with 3D depth preservation */}
        <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>

        {/* Dynamic Specular Light Glare that follows the cursor */}
        {glare && isHovered && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-inherit overflow-hidden z-30"
            style={{
              background: `radial-gradient(400px circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.12), transparent 75%)`,
              borderRadius: 'inherit'
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
