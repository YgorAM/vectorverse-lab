import { useState, useCallback } from "react";

const PRACTICE_KEY = "linalg-practice-best";
const GAME_KEY_PREFIX = "linalg-game-best";

interface BestScore {
  playerName: string;
  bestScore: number;
}

interface GameProgress {
  lastLevel: number;
}

function load(key: string): BestScore {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { playerName: "", bestScore: 0 };
}

function save(key: string, data: BestScore) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function useBestScore(mode: "practice" | "game", level?: number) {
  const key = mode === "practice"
    ? PRACTICE_KEY
    : level ? `${GAME_KEY_PREFIX}-l${level}` : `${GAME_KEY_PREFIX}`;
  const [data, setData] = useState<BestScore>(() => load(key));

  const submitScore = useCallback((score: number) => {
    setData(prev => {
      if (score > prev.bestScore) {
        const next = { ...prev, bestScore: score };
        save(key, next);
        return next;
      }
      return prev;
    });
  }, [key]);

  const setPlayerName = useCallback((name: string) => {
    setData(prev => {
      const next = { ...prev, playerName: name };
      save(key, next);
      return next;
    });
  }, [key]);

  const reset = useCallback(() => {
    const next = { playerName: "", bestScore: 0 };
    save(key, next);
    setData(next);
  }, [key]);

  return { bestScore: data.bestScore, playerName: data.playerName, submitScore, setPlayerName, reset };
}

const PROGRESS_KEY = "linalg-game-progress";

export function loadGameProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { lastLevel: 1 };
}

export function saveLastLevel(level: number) {
  const prev = loadGameProgress();
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({ ...prev, lastLevel: level }));
}
