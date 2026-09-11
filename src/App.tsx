/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameMode, FallingSpeed, FallingItem, LeafVariant, RockVariant } from './types';
import { sound } from './utils/sound';
import { SkyBackground } from './components/SkyBackground';
import { FallingObject } from './components/FallingObject';
import { GameHeader } from './components/GameHeader';
import { InstructionBar } from './components/InstructionBar';
import { WordModal } from './components/WordModal';

const LEAF_VARIANTS: LeafVariant[] = ['maple', 'oval', 'ginkgo', 'oak'];
const ROCK_VARIANTS: RockVariant[] = ['pebble', 'boulder', 'granite', 'round'];

export default function App() {
  const [mode, setMode] = useState<GameMode>('leaf');
  const [speed, setSpeed] = useState<FallingSpeed>('medium');
  const [items, setItems] = useState<FallingItem[]>([]);
  const [activeModal, setActiveModal] = useState<'leaf' | 'rock' | null>(null);
  const [leafScore, setLeafScore] = useState<number>(0);
  const [rockScore, setRockScore] = useState<number>(0);
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);
  const [bgmVolume, setBgmVolume] = useState<number>(0.25);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Speed multiplier constant based on user selection
  const getSpeedMultiplier = useCallback(() => {
    switch (speed) {
      case 'slow':
        return 0.16; // calm and slow for young elementary learners
      case 'fast':
        return 0.52; // brisk challenge
      case 'medium':
      default:
        return 0.30; // standard balanced speed
    }
  }, [speed]);

  // Helper to generate a single random falling item
  const createFallingItem = useCallback((): FallingItem => {
    const isLeaf = Math.random() < 0.5;
    const type = isLeaf ? 'leaf' : 'rock';
    const variant = isLeaf
      ? LEAF_VARIANTS[Math.floor(Math.random() * LEAF_VARIANTS.length)]
      : ROCK_VARIANTS[Math.floor(Math.random() * ROCK_VARIANTS.length)];

    // Spread horizontally (4% to 94%)
    const xPercent = 4 + Math.random() * 90;
    // Initial Y slightly above viewport
    const yPercent = -16 - Math.random() * 15;

    // Size variation: 90px to 132px (large, adorable and easy for kids to touch)
    const size = Math.floor(90 + Math.random() * 42);

    return {
      id: `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type,
      variant,
      colorIndex: Math.floor(Math.random() * 5),
      xPercent,
      yPercent,
      baseSpeed: 0.85 + Math.random() * 0.45,
      swayAmplitude: isLeaf ? 22 + Math.random() * 26 : 5 + Math.random() * 7,
      swayFrequency: isLeaf ? 0.045 + Math.random() * 0.03 : 0.02,
      swayOffset: Math.random() * 100,
      rotation: Math.random() * 360,
      rotationSpeed: isLeaf ? (Math.random() - 0.5) * 0.8 : (Math.random() - 0.5) * 0.3,
      size,
      isPopped: false,
    };
  }, []);

  // Spawn a batch of random items (2 to 3 items at a time)
  const spawnBatch = useCallback(
    (count = Math.floor(2 + Math.random() * 2)) => {
      const newItems: FallingItem[] = [];
      for (let i = 0; i < count; i++) {
        newItems.push(createFallingItem());
      }
      setItems((prev) => [...prev, ...newItems]);
    },
    [createFallingItem]
  );

  // Manual drop trigger for teacher
  const handleManualSpawn = () => {
    spawnBatch(5);
  };

  // Initial populate with lively batch of items floating across the sky
  useEffect(() => {
    const initialBatch: FallingItem[] = [];
    for (let i = 0; i < 8; i++) {
      const item = createFallingItem();
      item.yPercent = 4 + i * 11; // Stagger across vertical sky
      initialBatch.push(item);
    }
    setItems(initialBatch);
  }, [createFallingItem]);

  // Periodic automatic spawner with higher density and frequent drops
  useEffect(() => {
    if (isPaused || activeModal !== null) return;

    // Fast and frequent spawn intervals to keep the sky filled with leaves and rocks
    const intervalTime = speed === 'slow' ? 1200 : speed === 'fast' ? 550 : 800;

    const timer = setInterval(() => {
      // Allow up to 26 active items concurrently across the screen
      setItems((prev) => {
        if (prev.length >= 26) return prev;
        const count = Math.floor(2 + Math.random() * 2);
        const added: FallingItem[] = [];
        for (let i = 0; i < count; i++) {
          added.push(createFallingItem());
        }
        return [...prev, ...added];
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, activeModal, speed, createFallingItem]);

  // Physics animation loop using requestAnimationFrame
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.666, 2.5); // frame delta normalized
      lastTime = time;

      // Only update physics if game is active and no modal is open
      if (!isPaused && activeModal === null) {
        const mult = getSpeedMultiplier();

        setItems((prevItems) => {
          if (prevItems.length === 0) return prevItems;

          const updated: FallingItem[] = [];
          for (const item of prevItems) {
            const nextY = item.yPercent + item.baseSpeed * mult * delta;
            const nextRot = item.rotation + item.rotationSpeed * delta;

            // Discard items that have fallen completely out of screen (> 112%)
            if (nextY <= 112) {
              updated.push({
                ...item,
                yPercent: nextY,
                rotation: nextRot,
              });
            }
          }
          return updated;
        });
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPaused, activeModal, getSpeedMultiplier]);

  // Item click handler conforming to user specification:
  // - Mode 1 (Leaf Mode): click leaf -> trigger sound & word modal with pronunciation. Click rock -> no reaction.
  // - Mode 2 (Rock Mode): click rock -> trigger sound & word modal with pronunciation. Click leaf -> no reaction.
  const handleItemClick = (item: FallingItem) => {
    if (isPaused || activeModal !== null) return;

    if (mode === 'leaf') {
      if (item.type === 'leaf') {
        // Target clicked! Trigger reward sound effect & pronunciation immediately
        sound.playSuccessSound();
        sound.speakWord('leaf');
        setLeafScore((prev) => prev + 1);
        setActiveModal('leaf');
        // Remove the clicked item from sky
        setItems((prev) => prev.filter((i) => i.id !== item.id));
      } else {
        // Click rock in leaf mode: NO REACTION as requested
      }
    } else if (mode === 'rock') {
      if (item.type === 'rock') {
        // Target clicked! Trigger reward sound effect & pronunciation immediately
        sound.playSuccessSound();
        sound.speakWord('rock');
        setRockScore((prev) => prev + 1);
        setActiveModal('rock');
        // Remove the clicked item from sky
        setItems((prev) => prev.filter((i) => i.id !== item.id));
      } else {
        // Click leaf in rock mode: NO REACTION as requested
      }
    }
  };

  // Continue button handler
  const handleContinue = () => {
    setActiveModal(null);
  };

  // BGM control
  const handleToggleBgm = () => {
    const newState = sound.toggleBgm();
    setIsBgmPlaying(newState);
  };

  const handleChangeVolume = (vol: number) => {
    setBgmVolume(vol);
    sound.setBgmVolume(vol);
  };

  // Fullscreen support for classroom whiteboards
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col justify-between overflow-hidden select-none bg-sky-100">
      {/* 1. Sky & Mid-air Animated Background */}
      <SkyBackground />

      {/* 2. Top Header & Game Control Bar */}
      <GameHeader
        mode={mode}
        onSelectMode={(newMode) => {
          setMode(newMode);
          // If modal open, close it cleanly
          setActiveModal(null);
        }}
        speed={speed}
        onSelectSpeed={setSpeed}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
        bgmVolume={bgmVolume}
        onChangeVolume={handleChangeVolume}
        leafScore={leafScore}
        rockScore={rockScore}
        onResetScore={() => {
          sound.playButtonClick();
          setLeafScore(0);
          setRockScore(0);
        }}
        isPaused={isPaused}
        onTogglePause={() => {
          sound.playButtonClick();
          setIsPaused((prev) => !prev);
        }}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* 3. Main Falling Objects Stage (半空中) */}
      <main
        id="falling-sky-stage"
        className="relative flex-1 w-full h-full overflow-hidden"
        role="region"
        aria-label="天空落物游戏区"
      >
        {/* Pause Overlay indicator */}
        {isPaused && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs pointer-events-none">
            <div className="px-6 py-3 bg-white/90 rounded-2xl shadow-xl border-2 border-slate-200 text-slate-800 font-['Fredoka'] text-xl font-bold flex items-center gap-2">
              <span>⏸️ 游戏已暂停 (Paused)</span>
            </div>
          </div>
        )}

        {/* Falling Leaves and Rocks */}
        {items.map((item) => (
          <FallingObject
            key={item.id}
            item={item}
            onClick={handleItemClick}
            isTarget={
              (mode === 'leaf' && item.type === 'leaf') ||
              (mode === 'rock' && item.type === 'rock')
            }
          />
        ))}
      </main>

      {/* 4. Bottom Classroom Instruction & Prompt Bar */}
      <InstructionBar
        mode={mode}
        onSpawnManual={handleManualSpawn}
        itemsCount={items.length}
      />

      {/* 5. Word Modal with Pronunciation & Phonics (Pops when target item is clicked) */}
      {activeModal && (
        <WordModal
          type={activeModal}
          onContinue={handleContinue}
          count={activeModal === 'leaf' ? leafScore : rockScore}
        />
      )}
    </div>
  );
}
