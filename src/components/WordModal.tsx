import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Play, Sparkles, Award } from 'lucide-react';
import { FallingItemType } from '../types';
import { sound } from '../utils/sound';

interface WordModalProps {
  type: FallingItemType;
  onContinue: () => void;
  count: number;
}

export const WordModal: React.FC<WordModalProps> = ({ type, onContinue, count }) => {
  const isLeaf = type === 'leaf';

  const data = isLeaf
    ? {
        word: 'leaf',
        phonetic: '/liːf/',
        plural: 'leaves (复数)',
        chinese: '树叶',
        phonics: ['l', 'ea', 'f'],
        example: 'A pretty leaf is dancing in the air!',
        exampleCn: '一片漂亮的树叶在半空中跳舞！',
        accentBg: 'from-emerald-500 to-green-600',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        buttonBg: 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-emerald-300/50',
      }
    : {
        word: 'rock',
        phonetic: '/rɒk/',
        plural: 'rocks (复数)',
        chinese: '石头',
        phonics: ['r', 'o', 'ck'],
        example: 'A little rock is strong and hard!',
        exampleCn: '一块坚硬强壮的小石头！',
        accentBg: 'from-amber-600 to-stone-700',
        badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
        buttonBg: 'bg-gradient-to-r from-amber-600 to-stone-700 hover:from-amber-700 hover:to-stone-800 shadow-amber-500/50',
      };

  useEffect(() => {
    // 1. Speak word aloud automatically on modal pop
    sound.speakWord(data.word);

    // 2. Kid-friendly light confetti burst
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: isLeaf ? ['#22c55e', '#84cc16', '#eab308', '#10b981'] : ['#a8a29e', '#f59e0b', '#78716c', '#60a5fa'],
      });
    } catch {
      // safe fallback
    }

    // 3. Allow pressing Space or Enter to continue
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        sound.playContinueSound();
        onContinue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data.word, isLeaf, onContinue]);

  const handleSpeakAgain = () => {
    sound.playButtonClick();
    sound.speakWord(data.word);
  };

  const handleContinueClick = () => {
    sound.playContinueSound();
    onContinue();
  };

  return (
    <div
      id="word-popup-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        id="word-popup-card"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-amber-200 overflow-hidden transform animate-scaleUp"
      >
        {/* Top Header Ribbon */}
        <div className={`py-4 px-6 bg-gradient-to-r ${data.accentBg} text-white flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 animate-spin-slow text-yellow-300" />
            <span className="font-['Fredoka'] text-xl font-bold tracking-wide">
              {isLeaf ? 'Great Job! 发现了树叶' : 'Great Job! 发现了石头'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-xs">
            <Award className="w-4 h-4 text-yellow-300" />
            <span>已收集: {count}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-8 flex flex-col items-center text-center">
          {/* Animated Illustration Badge */}
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-3xl bg-amber-50 border-2 border-amber-200/80 flex items-center justify-center p-4 shadow-inner">
              {isLeaf ? (
                <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md animate-bounce-gentle">
                  {/* Cute smiling green leaf */}
                  <path
                    d="M 50 12 C 76 26, 88 52, 78 76 C 70 86, 56 86, 50 86 L 50 96 L 46 96 L 46 86 C 40 86, 26 84, 18 76 C 10 52, 24 26, 50 12 Z"
                    fill="#4ade80"
                    stroke="#16a34a"
                    strokeWidth="4"
                  />
                  <line x1="50" y1="18" x2="50" y2="86" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
                  {/* Cute eyes */}
                  <circle cx="40" cy="50" r="3.5" fill="#0f172a" />
                  <circle cx="60" cy="50" r="3.5" fill="#0f172a" />
                  <circle cx="41.5" cy="48.5" r="1.2" fill="#ffffff" />
                  <circle cx="61.5" cy="48.5" r="1.2" fill="#ffffff" />
                  {/* Smiling mouth */}
                  <path d="M 45 58 Q 50 64 55 58" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Rosy cheeks */}
                  <circle cx="34" cy="54" r="3" fill="#f87171" opacity="0.6" />
                  <circle cx="66" cy="54" r="3" fill="#f87171" opacity="0.6" />
                </svg>
              ) : (
                <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md animate-bounce-gentle">
                  {/* Cute smiling pebble boulder */}
                  <path
                    d="M 28 24 C 48 16, 76 20, 84 38 C 92 56, 88 76, 74 84 C 58 92, 34 90, 22 80 C 10 68, 12 48, 18 36 C 22 28, 24 24, 28 24 Z"
                    fill="#a8a29e"
                    stroke="#57534e"
                    strokeWidth="4"
                  />
                  <path d="M 30 28 C 46 22, 68 26, 74 36" fill="none" stroke="#e7e5e4" strokeWidth="4" strokeLinecap="round" />
                  {/* Cute eyes */}
                  <circle cx="42" cy="52" r="3.5" fill="#0f172a" />
                  <circle cx="62" cy="52" r="3.5" fill="#0f172a" />
                  <circle cx="43.5" cy="50.5" r="1.2" fill="#ffffff" />
                  <circle cx="63.5" cy="50.5" r="1.2" fill="#ffffff" />
                  {/* Smiling mouth */}
                  <path d="M 47 60 Q 52 66 57 60" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Rosy cheeks */}
                  <circle cx="36" cy="56" r="3" fill="#fb923c" opacity="0.6" />
                  <circle cx="68" cy="56" r="3" fill="#fb923c" opacity="0.6" />
                </svg>
              )}
            </div>
          </div>

          {/* Big English Word & Meaning */}
          <div className="flex flex-col items-center gap-1 mb-3">
            <div className="flex items-center gap-3">
              <h2 className="text-5xl md:text-6xl font-extrabold font-['Fredoka'] text-slate-800 tracking-wider">
                {data.word}
              </h2>
              {/* Audio Listen Button */}
              <button
                id="btn-pronounce-word"
                type="button"
                onClick={handleSpeakAgain}
                title="再次听读音 (Listen pronunciation)"
                className="p-3.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-2xl shadow-sm transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
              >
                <Volume2 className="w-7 h-7 animate-pulse text-amber-700" />
              </button>
            </div>

            {/* Phonetic & Chinese translation */}
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xl font-mono text-slate-500 font-semibold">{data.phonetic}</span>
              <span className="text-2xl font-bold text-slate-700">·</span>
              <span className="text-2xl font-bold text-amber-700">{data.chinese}</span>
            </div>
          </div>

          {/* Phonics Chunking for Primary School Kids */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-4 flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Natural Phonics 自然拼读
            </span>
            <div className="flex items-center gap-2">
              {data.phonics.map((chunk, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 bg-white border-2 border-slate-200 rounded-xl font-['Fredoka'] text-2xl font-bold text-slate-700 shadow-xs"
                >
                  {chunk}
                </span>
              ))}
              <span className="text-slate-400 font-bold text-xl">=</span>
              <span className="px-4 py-1.5 bg-amber-100 border-2 border-amber-300 rounded-xl font-['Fredoka'] text-2xl font-extrabold text-amber-800 shadow-xs">
                {data.word}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{data.plural}</p>
          </div>

          {/* Example Classroom Sentence */}
          <div className="w-full bg-amber-50/70 border border-amber-100 rounded-2xl p-3.5 mb-6 text-left">
            <p className="text-base md:text-lg font-medium text-slate-800">
              &ldquo;{data.example}&rdquo;
            </p>
            <p className="text-sm text-slate-500 mt-1">{data.exampleCn}</p>
          </div>

          {/* Large Continue Button */}
          <button
            id="btn-continue-game"
            type="button"
            onClick={handleContinueClick}
            className={`w-full py-4 px-6 rounded-2xl text-white font-['Fredoka'] text-2xl font-bold tracking-wide shadow-lg flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${data.buttonBg}`}
          >
            <Play className="w-6 h-6 fill-current" />
            <span>继续游戏 (Continue)</span>
            <span className="text-xs font-normal opacity-80 border border-white/40 px-2 py-0.5 rounded-md hidden sm:inline-block">
              按空格键 Space
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
