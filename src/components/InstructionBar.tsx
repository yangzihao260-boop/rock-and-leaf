import React from 'react';
import { Volume2, Sparkles, PlusCircle } from 'lucide-react';
import { GameMode } from '../types';
import { sound } from '../utils/sound';

interface InstructionBarProps {
  mode: GameMode;
  onSpawnManual: () => void;
  itemsCount: number;
}

export const InstructionBar: React.FC<InstructionBarProps> = ({
  mode,
  onSpawnManual,
  itemsCount,
}) => {
  const isLeaf = mode === 'leaf';

  const handleSpeakCurrent = () => {
    sound.playButtonClick();
    sound.speakWord(isLeaf ? 'leaf' : 'rock');
  };

  const handleSpawn = () => {
    sound.playButtonClick();
    onSpawnManual();
  };

  return (
    <footer className="relative z-30 w-full px-4 py-2.5 bg-white/90 backdrop-blur-md border-t border-sky-200/80 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Current Prompt */}
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl shadow-xs ${
              isLeaf ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}
          >
            {isLeaf ? '🍃' : '🪨'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span className="font-['Fredoka'] font-bold text-slate-800 text-base md:text-lg">
                {isLeaf ? '目标单词：leaf (树叶)' : '目标单词：rock (石头)'}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                  isLeaf
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {isLeaf ? '点击石头无反应' : '点击树叶无反应'}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              空中飘落物数量: {itemsCount} 个 · 点击正确即可跟读发音并收集星标
            </p>
          </div>
        </div>

        {/* Teacher Interactive Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Speak button for teacher's choral reading */}
          <button
            id="btn-teacher-speak"
            type="button"
            onClick={handleSpeakCurrent}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-1.5 shadow-xs transition-all transform active:scale-95 cursor-pointer ${
              isLeaf
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/30'
                : 'bg-amber-700 hover:bg-amber-800 text-white shadow-amber-700/30'
            }`}
            title="教师领读示范发音"
          >
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span>示范读音: {isLeaf ? 'leaf' : 'rock'}</span>
          </button>

          {/* Manual spawn drop button */}
          <button
            id="btn-teacher-spawn-drop"
            type="button"
            onClick={handleSpawn}
            className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs md:text-sm flex items-center gap-1.5 shadow-xs shadow-sky-400/30 transition-all transform active:scale-95 cursor-pointer"
            title="手动掉落一批树叶和石头"
          >
            <PlusCircle className="w-4 h-4" />
            <span>掉落一波</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
