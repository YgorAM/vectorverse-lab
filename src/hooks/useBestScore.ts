import { useState, useCallback } from "react";

const PRACTICE_KEY = "linalg-practice-best";
const GAME_KEY = "linalg-game-best";

interface BestScore {
  playerName: string;
  bestScore: number;
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

export function useBestScore(mode: "practice" | "game") {
  const key = mode === "practice" ? PRACTICE_KEY : GAME_KEY;
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
