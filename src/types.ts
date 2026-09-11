export type GameMode = 'leaf' | 'rock';

export type FallingSpeed = 'slow' | 'medium' | 'fast';

export type FallingItemType = 'leaf' | 'rock';

export type LeafVariant = 'maple' | 'oval' | 'ginkgo' | 'oak';
export type RockVariant = 'pebble' | 'boulder' | 'granite' | 'round';

export interface FallingItem {
  id: string;
  type: FallingItemType;
  variant: LeafVariant | RockVariant;
  colorIndex: number;
  xPercent: number; // 5% to 92%
  yPercent: number; // -15% to 110%
  baseSpeed: number; // pixel per frame
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
  rotation: number;
  rotationSpeed: number;
  size: number; // px width/height
  isPopped: boolean;
}

export interface WordData {
  word: string;
  phonetic: string;
  chinese: string;
  phonics: string[];
  example: string;
  exampleCn: string;
  color: string;
  badge: string;
}
