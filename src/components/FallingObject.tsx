import React from 'react';
import { FallingItem } from '../types';

interface FallingObjectProps {
  item: FallingItem;
  onClick: (item: FallingItem) => void;
  isTarget: boolean;
}

// Leaf color palettes: [primary, accent, vein]
const leafPalettes = [
  { fill: '#4ade80', stroke: '#15803d', vein: '#16a34a', highlight: '#bbf7d0' }, // Vibrant Emerald
  { fill: '#a3e635', stroke: '#4d7c0f', vein: '#65a30d', highlight: '#d9f99d' }, // Lime Green
  { fill: '#fbbf24', stroke: '#b45309', vein: '#d97706', highlight: '#fef08a' }, // Ginkgo Gold
  { fill: '#f97316', stroke: '#c2410c', vein: '#ea580c', highlight: '#ffedd5' }, // Autumn Amber
  { fill: '#ef4444', stroke: '#b91c1c', vein: '#dc2626', highlight: '#fecaca' }, // Maple Crimson
];

// Rock color palettes: [fill, shadow, highlight, speckle]
const rockPalettes = [
  { fill: '#94a3b8', stroke: '#475569', highlight: '#cbd5e1', speckle: '#64748b' }, // Slate Gray
  { fill: '#a8a29e', stroke: '#57534e', highlight: '#d6d3d1', speckle: '#78716c' }, // Warm Stone
  { fill: '#64748b', stroke: '#334155', highlight: '#94a3b8', speckle: '#1e293b' }, // Deep Mountain
  { fill: '#cbd5e1', stroke: '#64748b', highlight: '#f1f5f9', speckle: '#94a3b8' }, // River Pebble
  { fill: '#78716c', stroke: '#44403c', highlight: '#a8a29e', speckle: '#292524' }, // Granite Earth
];

export const FallingObject: React.FC<FallingObjectProps> = ({ item, onClick, isTarget }) => {
  const leafColor = leafPalettes[item.colorIndex % leafPalettes.length];
  const rockColor = rockPalettes[item.colorIndex % rockPalettes.length];

  // Calculate current horizontal sway
  const swayX = Math.sin((item.yPercent + item.swayOffset) * item.swayFrequency) * item.swayAmplitude;

  const renderLeaf = () => {
    switch (item.variant) {
      case 'maple':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md transition-transform duration-200">
            {/* Maple leaf */}
            <path
              d="M 50 12 C 55 22, 68 20, 72 26 C 68 32, 75 38, 86 42 C 78 48, 82 58, 70 60 C 64 62, 60 70, 53 74 L 54 90 L 46 90 L 47 74 C 40 70, 36 62, 30 60 C 18 58, 22 48, 14 42 C 25 38, 32 32, 28 26 C 32 20, 45 22, 50 12 Z"
              fill={leafColor.fill}
              stroke={leafColor.stroke}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Highlights */}
            <path
              d="M 50 18 C 53 25, 62 25, 65 30 C 60 33, 67 40, 74 44 C 68 47, 68 52, 60 55 C 55 57, 52 64, 50 68"
              fill="none"
              stroke={leafColor.highlight}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Main vein */}
            <line x1="50" y1="18" x2="50" y2="76" stroke={leafColor.vein} strokeWidth="3" strokeLinecap="round" />
            {/* Side veins */}
            <line x1="50" y1="36" x2="68" y2="28" stroke={leafColor.vein} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="36" x2="32" y2="28" stroke={leafColor.vein} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="72" y2="45" stroke={leafColor.vein} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="28" y2="45" stroke={leafColor.vein} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="62" x2="64" y2="60" stroke={leafColor.vein} strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="62" x2="36" y2="60" stroke={leafColor.vein} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'ginkgo':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md transition-transform duration-200">
            {/* Ginkgo fan leaf */}
            <path
              d="M 50 78 C 50 84, 52 92, 53 96 L 47 96 C 48 92, 50 84, 50 78 C 42 76, 22 68, 14 50 C 6 32, 22 18, 48 24 C 49 24, 50 25, 51 25 C 52 25, 53 24, 54 24 C 80 18, 96 32, 88 50 C 80 68, 60 76, 50 78 Z"
              fill={leafColor.fill}
              stroke={leafColor.stroke}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Top notch */}
            <path
              d="M 51 24 C 50 32, 50 40, 50 48"
              fill="none"
              stroke={leafColor.stroke}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Fan ribs */}
            <path
              d="M 50 75 Q 38 55 24 38 M 50 75 Q 44 50 36 28 M 50 75 Q 56 50 64 28 M 50 75 Q 64 55 78 38"
              fill="none"
              stroke={leafColor.vein}
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Soft top highlight */}
            <path
              d="M 22 28 C 34 22, 44 26, 48 26"
              fill="none"
              stroke={leafColor.highlight}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
        );

      case 'oak':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md transition-transform duration-200">
            {/* Oak lobed leaf */}
            <path
              d="M 50 10 C 56 12, 60 18, 64 22 C 60 25, 74 28, 76 36 C 70 39, 78 48, 78 56 C 70 57, 72 68, 64 74 L 54 92 L 46 92 L 36 74 C 28 68, 30 57, 22 56 C 22 48, 30 39, 24 36 C 26 28, 40 25, 36 22 C 40 18, 44 12, 50 10 Z"
              fill={leafColor.fill}
              stroke={leafColor.stroke}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Central vein */}
            <line x1="50" y1="14" x2="50" y2="78" stroke={leafColor.vein} strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="30" x2="66" y2="28" stroke={leafColor.vein} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="30" x2="34" y2="28" stroke={leafColor.vein} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="46" x2="70" y2="44" stroke={leafColor.vein} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="46" x2="30" y2="44" stroke={leafColor.vein} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="62" x2="64" y2="62" stroke={leafColor.vein} strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="62" x2="36" y2="62" stroke={leafColor.vein} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'oval':
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md transition-transform duration-200">
            {/* Classic pointed oval leaf */}
            <path
              d="M 50 10 C 72 24, 85 50, 78 72 C 70 82, 56 82, 50 82 L 50 94 L 46 94 L 46 82 C 40 82, 28 80, 22 72 C 15 50, 28 24, 50 10 Z"
              fill={leafColor.fill}
              stroke={leafColor.stroke}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Curved side highlight */}
            <path
              d="M 48 18 C 32 30, 26 48, 28 65"
              fill="none"
              stroke={leafColor.highlight}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.75"
            />
            {/* Center vein */}
            <path
              d="M 50 12 Q 50 50 49 82"
              fill="none"
              stroke={leafColor.vein}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Lateral veins */}
            <line x1="50" y1="28" x2="68" y2="34" stroke={leafColor.vein} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="50" y1="36" x2="32" y2="42" stroke={leafColor.vein} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="50" y1="46" x2="69" y2="54" stroke={leafColor.vein} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="50" y1="56" x2="33" y2="64" stroke={leafColor.vein} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="50" y1="66" x2="62" y2="72" stroke={leafColor.vein} strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );
    }
  };

  const renderRock = () => {
    switch (item.variant) {
      case 'boulder':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg transition-transform duration-200">
            {/* Chubby boulder */}
            <path
              d="M 32 20 C 52 14, 76 22, 84 38 C 92 54, 88 74, 74 84 C 60 94, 34 92, 22 82 C 10 72, 12 50, 18 36 C 22 28, 26 22, 32 20 Z"
              fill={rockColor.fill}
              stroke={rockColor.stroke}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Inner facet / 3D shadow contour */}
            <path
              d="M 34 32 C 50 30, 68 34, 74 46 C 78 56, 74 72, 62 78"
              fill="none"
              stroke={rockColor.speckle}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
            />
            {/* Smooth top highlight */}
            <path
              d="M 32 24 C 48 19, 66 24, 74 34"
              fill="none"
              stroke={rockColor.highlight}
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Cute texture dots/speckles */}
            <circle cx="42" cy="46" r="2.5" fill={rockColor.speckle} />
            <circle cx="58" cy="56" r="3" fill={rockColor.speckle} />
            <circle cx="36" cy="64" r="2" fill={rockColor.speckle} />
            <circle cx="68" cy="66" r="2.2" fill={rockColor.speckle} />
          </svg>
        );

      case 'granite':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg transition-transform duration-200">
            {/* Angular faceted granite stone */}
            <polygon
              points="35,16 68,20 86,45 78,82 46,88 20,74 16,42"
              fill={rockColor.fill}
              stroke={rockColor.stroke}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Facet lines */}
            <line x1="35" y1="16" x2="52" y2="48" stroke={rockColor.stroke} strokeWidth="2.5" />
            <line x1="68" y1="20" x2="52" y2="48" stroke={rockColor.stroke} strokeWidth="2.5" />
            <line x1="86" y1="45" x2="52" y2="48" stroke={rockColor.stroke} strokeWidth="2.5" />
            <line x1="78" y1="82" x2="52" y2="48" stroke={rockColor.stroke} strokeWidth="2.5" />
            <line x1="46" y1="88" x2="52" y2="48" stroke={rockColor.stroke} strokeWidth="2.5" />
            <line x1="20" y1="74" x2="52" y2="48" stroke={rockColor.stroke} strokeWidth="2.5" />
            {/* Highlight edge */}
            <line x1="36" y1="19" x2="66" y2="22" stroke={rockColor.highlight} strokeWidth="3" strokeLinecap="round" />
            <circle cx="38" cy="38" r="2" fill={rockColor.highlight} opacity="0.8" />
          </svg>
        );

      case 'pebble':
      case 'round':
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg transition-transform duration-200">
            {/* Smooth river pebble */}
            <ellipse
              cx="50"
              cy="52"
              rx="38"
              ry="28"
              transform="rotate(-8 50 52)"
              fill={rockColor.fill}
              stroke={rockColor.stroke}
              strokeWidth="4"
            />
            {/* Upper shine */}
            <path
              d="M 28 40 C 38 34, 60 33, 72 38"
              fill="none"
              stroke={rockColor.highlight}
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Gentle depth contour */}
            <path
              d="M 32 60 C 46 68, 64 66, 74 58"
              fill="none"
              stroke={rockColor.speckle}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Little cute shine star / sparkle */}
            <circle cx="38" cy="38" r="2.5" fill="#ffffff" opacity="0.9" />
            <circle cx="48" cy="36" r="1.5" fill="#ffffff" opacity="0.7" />
          </svg>
        );
    }
  };

  const triggeredRef = React.useRef(false);

  const handleTrigger = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    onClick(item);
    setTimeout(() => {
      triggeredRef.current = false;
    }, 300);
  };

  return (
    <div
      id={`falling-${item.type}-${item.id}`}
      role="button"
      tabIndex={0}
      onPointerDown={handleTrigger}
      onClick={handleTrigger}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleTrigger(e);
        }
      }}
      aria-label={`${item.type}`}
      style={{
        position: 'absolute',
        top: `${item.yPercent}%`,
        left: `calc(${item.xPercent}% + ${swayX}px)`,
        width: `${item.size}px`,
        height: `${item.size}px`,
        transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
        transition: 'transform 0.08s linear',
        touchAction: 'manipulation',
      }}
      className={`cursor-pointer focus:outline-none select-none z-10 active:scale-95 group p-2 touch-manipulation ${
        isTarget ? 'hover:scale-105' : ''
      }`}
    >
      {/* Invisible expanded hit padding to ensure child fingers easily register hits */}
      <div className="absolute -inset-3.5 pointer-events-auto" />

      <div className="w-full h-full relative flex items-center justify-center pointer-events-auto">
        {item.type === 'leaf' ? renderLeaf() : renderRock()}

        {/* Highlight halo indicator on target objects */}
        {isTarget && (
          <div className="absolute inset-0 pointer-events-none rounded-full ring-2 ring-amber-300/60 opacity-20 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </div>
  );
};
