import React from 'react';

export const SkyBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100/50">
      {/* Sun glow in corner */}
      <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full bg-yellow-200/50 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-16 w-28 h-28 rounded-full bg-amber-100/80 border-4 border-yellow-200/70 shadow-lg shadow-yellow-200/50 flex items-center justify-center opacity-90">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-100" />
      </div>

      {/* Distant mountains / ground far down to reinforce "high in the sky" (半空中) */}
      <div className="absolute -bottom-10 left-0 right-0 h-40 opacity-30">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M 0 300 L 0 160 Q 200 80, 400 180 T 800 120 T 1200 170 L 1200 300 Z"
            fill="#0284c7"
          />
          <path
            d="M 0 300 L 0 200 Q 300 140, 600 220 T 1200 190 L 1200 300 Z"
            fill="#0369a1"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Floating Clouds Layer 1 (Slow distant clouds) */}
      <div className="absolute top-14 left-[-15%] w-72 h-24 bg-white/75 rounded-full blur-xs animate-cloud-slow" />
      <div className="absolute top-28 right-[10%] w-80 h-28 bg-white/70 rounded-full blur-xs animate-cloud-medium" />

      {/* Layer 2 Mid-altitude clouds with fluffy SVG shapes */}
      <div className="absolute top-44 left-[15%] opacity-80 animate-float-gentle">
        <svg width="180" height="70" viewBox="0 0 180 70">
          <path
            d="M 25 50 A 20 20 0 0 1 50 30 A 28 28 0 0 1 95 20 A 24 24 0 0 1 135 32 A 20 20 0 0 1 155 50 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="absolute top-80 right-[22%] opacity-75 animate-float-slow">
        <svg width="150" height="60" viewBox="0 0 150 60">
          <path
            d="M 20 45 A 16 16 0 0 1 40 28 A 22 22 0 0 1 76 20 A 18 18 0 0 1 110 30 A 16 16 0 0 1 130 45 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Distant Hot Air Balloon for mid-air whimsical atmosphere */}
      <div className="absolute top-24 left-[75%] opacity-85 animate-balloon">
        <svg width="60" height="85" viewBox="0 0 60 85">
          {/* Balloon envelope */}
          <path
            d="M 12 30 C 12 10, 48 10, 48 30 C 48 42, 38 52, 34 58 L 26 58 C 22 52, 12 42, 12 30 Z"
            fill="#f43f5e"
            stroke="#e11d48"
            strokeWidth="1.5"
          />
          {/* Stripes */}
          <path d="M 22 14 C 18 25, 20 45, 27 58" fill="none" stroke="#fbbf24" strokeWidth="3" />
          <path d="M 38 14 C 42 25, 40 45, 33 58" fill="none" stroke="#38bdf8" strokeWidth="3" />
          {/* Basket ropes */}
          <line x1="26" y1="58" x2="25" y2="68" stroke="#78716c" strokeWidth="1" />
          <line x1="34" y1="58" x2="35" y2="68" stroke="#78716c" strokeWidth="1" />
          {/* Basket */}
          <rect x="23" y="68" width="14" height="10" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="1" />
        </svg>
      </div>

      {/* Little flying bird silhouettes */}
      <div className="absolute top-36 left-[8%] opacity-60 animate-fly-across">
        <svg width="40" height="24" viewBox="0 0 40 24">
          <path
            d="M 2 12 Q 10 2, 20 12 Q 30 2, 38 12"
            fill="none"
            stroke="#0369a1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="absolute top-44 left-[13%] opacity-40 animate-fly-across" style={{ animationDelay: '1.5s' }}>
        <svg width="28" height="18" viewBox="0 0 40 24">
          <path
            d="M 2 12 Q 10 2, 20 12 Q 30 2, 38 12"
            fill="none"
            stroke="#0369a1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
