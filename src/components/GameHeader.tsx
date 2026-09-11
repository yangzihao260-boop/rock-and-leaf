import React from 'react';
import {
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Play,
  Pause
} from 'lucide-react';
import { GameMode, FallingSpeed } from '../types';
import { sound } from '../utils/sound';

interface GameHeaderProps {
  mode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  speed: FallingSpeed;
  onSelectSpeed: (speed: FallingSpeed) => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
  bgmVolume: number;
  onChangeVolume: (vol: number) => void;
  leafScore: number;
  rockScore: number;
  onResetScore: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  mode,
  onSelectMode,
  speed,
  onSelectSpeed,
  isBgmPlaying,
  onToggleBgm,
  bgmVolume,
  onChangeVolume,
  leafScore,
  rockScore,
  onResetScore,
  isPaused,
  onTogglePause,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const handleModeChange = (newMode: GameMode) => {
    if (newMode !== mode) {
      sound.playButtonClick();
      onSelectMode(newMode);
    }
  };

  const handleSpeedChange = (newSpeed: FallingSpeed) => {
    if (newSpeed !== speed) {
      sound.playButtonClick();
      onSelectSpeed(newSpeed);
    }
  };

  return (
    <header className="relative z-30 w-full px-4 py-3 md:px-6 md:py-4 bg-white/85 backdrop-blur-md border-b border-sky-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Title & Teacher Branding */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-400 p-2 shadow-md flex items-center justify-center text-white font-bold">
              🍃🪨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-['Fredoka'] text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                  Leaf & Rock 探空落物
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  小学英语互动课堂
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                当前任务：{mode === 'leaf' ? '找到树叶 (leaf) 点击发音！' : '找到石头 (rock) 点击发音！'}
              </p>
            </div>
          </div>

          {/* Quick Stats on Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
              🍃 {leafScore}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-300 rounded-xl text-xs font-bold text-stone-800">
              🪨 {rockScore}
            </div>
          </div>
        </div>

        {/* Central Controls: Mode & Speed */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Learning Mode Switcher */}
          <div
            id="mode-selector-group"
            className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner"
          >
            <button
              id="mode-btn-leaf"
              type="button"
              onClick={() => handleModeChange('leaf')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-['Fredoka'] text-sm md:text-base font-bold transition-all cursor-pointer ${
                mode === 'leaf'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>🍃 找树叶模式</span>
              <span className="text-xs font-normal opacity-90 hidden sm:inline">(leaf)</span>
            </button>

            <button
              id="mode-btn-rock"
              type="button"
              onClick={() => handleModeChange('rock')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-['Fredoka'] text-sm md:text-base font-bold transition-all cursor-pointer ${
                mode === 'rock'
                  ? 'bg-amber-700 text-white shadow-md shadow-amber-800/30 scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>🪨 找石头模式</span>
              <span className="text-xs font-normal opacity-90 hidden sm:inline">(rock)</span>
            </button>
          </div>

          {/* Falling Speed Switcher (3 modes: Slow, Medium, Fast) */}
          <div
            id="speed-selector-group"
            className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner"
          >
            <span className="text-xs font-bold text-slate-500 px-2 hidden lg:inline">掉落速度:</span>
            <button
              id="speed-btn-slow"
              type="button"
              onClick={() => handleSpeedChange('slow')}
              className={`px-3 py-1 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                speed === 'slow'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="慢速：适合初学认知与跟读"
            >
              🐢 慢速
            </button>
            <button
              id="speed-btn-medium"
              type="button"
              onClick={() => handleSpeedChange('medium')}
              className={`px-3 py-1 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                speed === 'medium'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="中速：标准练习模式"
            >
              🚶 中速
            </button>
            <button
              id="speed-btn-fast"
              type="button"
              onClick={() => handleSpeedChange('fast')}
              className={`px-3 py-1 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                speed === 'fast'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="快速：挑战孩子眼明手快"
            >
              🚀 快速
            </button>
          </div>
        </div>

        {/* Right Tools: BGM, Sound, Score & Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Score Counter on Desktop */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100/90 border border-slate-200 px-3 py-1 rounded-2xl">
            <div className="flex items-center gap-1 text-sm font-bold text-emerald-700" title="已点击树叶数">
              <span>🍃</span>
              <span>{leafScore}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-sm font-bold text-stone-700" title="已点击石头数">
              <span>🪨</span>
              <span>{rockScore}</span>
            </div>
            <button
              id="btn-reset-score"
              type="button"
              onClick={onResetScore}
              title="重置计数"
              className="ml-1 p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* BGM Toggle Button */}
          <button
            id="btn-toggle-bgm"
            type="button"
            onClick={onToggleBgm}
            title={isBgmPlaying ? '关闭背景音乐' : '开启轻松背景音乐'}
            className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isBgmPlaying
                ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-xs'
                : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
            }`}
          >
            {isBgmPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Pause / Resume Button */}
          <button
            id="btn-toggle-pause"
            type="button"
            onClick={onTogglePause}
            title={isPaused ? '恢复游戏' : '暂停游戏'}
            className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isPaused
                ? 'bg-rose-100 text-rose-700 border-rose-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5" />}
          </button>

          {/* Fullscreen Toggle Button */}
          <button
            id="btn-toggle-fullscreen"
            type="button"
            onClick={onToggleFullscreen}
            title={isFullscreen ? '退出全屏' : '投影全屏模式'}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
