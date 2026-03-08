import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Zap, Trophy, Trash2, RotateCcw, ArrowLeft, Clock, Target, Lightbulb } from "lucide-react";
import { useBestScore, saveLastLevel, loadGameProgress } from "@/hooks/useBestScore";
import { GameTutorial, shouldShowTutorial } from "@/components/GameTutorial";
import { GameHintButton } from "@/components/GameHint";
import { getChallenges, MAX_HINTS, SCORE_BY_HINTS, type GameDifficulty } from "@/lib/gameChallenges";

function normalize(s: string): string {
  return s.replace(/\s/g, "");
}

const LEVEL_META: Record<GameDifficulty, { badge: string; colorClass: string; labelKey: string }> = {
  1: { badge: "🟢", colorClass: "border-green-500/40 bg-green-500/10 text-green-400", labelKey: "game_lvl_beginner" },
  2: { badge: "🔵", colorClass: "border-blue-500/40 bg-blue-500/10 text-blue-400", labelKey: "game_lvl_intermediate" },
  3: { badge: "🟣", colorClass: "border-purple-500/40 bg-purple-500/10 text-purple-400", labelKey: "game_lvl_advanced" },
};

/* ─── Level Selector ─── */
function LevelSelector({ onSelect, t }: { onSelect: (d: GameDifficulty) => void; t: (k: string) => string }) {
  const levels: GameDifficulty[] = [1, 2, 3];
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-mono text-xs text-primary mb-2">{t("game_comment")}</p>
        <h1 className="text-3xl font-bold mb-2">{t("game_title")}</h1>
        <p className="text-muted-foreground mb-6">{t("game_select_level")}</p>
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-3">
        {levels.map((lv, i) => {
          const meta = LEVEL_META[lv];
          return (
            <motion.button
              key={lv}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(lv)}
              className={`flex flex-col items-start gap-2 p-5 rounded-lg border ${meta.colorClass} hover:scale-[1.03] transition-transform text-left`}
            >
              <span className="text-2xl">{meta.badge}</span>
              <span className="font-bold text-foreground">{t(meta.labelKey)}</span>
              <span className="text-xs text-muted-foreground">{t(`game_lvl${lv}_desc`)}</span>
              <span className="text-[10px] font-mono text-muted-foreground">
                {t("game_hint_btn")}: {MAX_HINTS[lv]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Completion Screen ─── */
function CompletionScreen({
  difficulty, score, correctCount, total, totalHints, elapsed, t,
  bestScore, playerName, nameInput, setNameInput, onSaveName, onRestart, onBackToLevels, onResetBest,
  isNewRecord,
}: {
  difficulty: GameDifficulty; score: number; correctCount: number; total: number;
  totalHints: number; elapsed: number; t: (k: string) => string;
  bestScore: number; playerName: string; nameInput: string; setNameInput: (v: string) => void;
  onSaveName: () => void; onRestart: () => void; onBackToLevels: () => void; onResetBest: () => void;
  isNewRecord: boolean;
}) {
  const meta = LEVEL_META[difficulty];
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
        <span className={`inline-block text-xs font-mono px-3 py-1 rounded-full border mb-4 ${meta.colorClass}`}>
          {meta.badge} {t(meta.labelKey)}
        </span>
        <h1 className="text-3xl font-bold mb-4">🏆 {t("game_level_complete")}</h1>
        <p className="text-4xl font-bold text-primary mb-2">{score} {t("game_points")}</p>

        {isNewRecord && (
          <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-primary font-bold text-lg mb-4">
            🎊 {t("game_new_record")}
          </motion.p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Target size={14} /> {accuracy}% {t("game_accuracy")}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Lightbulb size={14} /> {totalHints} {totalHints === 1 ? t("game_hint_single") : t("game_hint_plural")}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock size={14} /> {mins > 0 ? `${mins}m ` : ""}{secs}s
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 mb-4">
          <Trophy className="text-yellow-400" size={18} />
          <span className="text-sm font-mono">
            {playerName ? `${playerName} — ` : ""}{t("game_best_score")}: {Math.max(score, bestScore)}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <Input
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onSaveName()}
            placeholder={t("game_name_placeholder")}
            className="max-w-[180px] font-mono text-sm"
          />
          <Button variant="outline" size="sm" onClick={onSaveName}>{t("game_save_name")}</Button>
        </div>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button onClick={onRestart} className="gap-2">
            <RotateCcw size={14} />
            {t("game_play_again")}
          </Button>
          <Button variant="outline" onClick={onBackToLevels} className="gap-2">
            <ArrowLeft size={14} />
            {t("game_back_levels")}
          </Button>
          <Button variant="ghost" size="sm" onClick={onResetBest} className="text-muted-foreground gap-1">
            <Trash2 size={12} />
            {t("game_reset_score")}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main Game ─── */
export default function MiniGame() {
  const { t } = useI18n();

  const [phase, setPhase] = useState<"levels" | "tutorial" | "playing" | "finished">("levels");
  const [difficulty, setDifficulty] = useState<GameDifficulty | null>(null);

  // Derived from difficulty
  const activeDifficulty = difficulty ?? 1;
  const { bestScore, playerName, submitScore, setPlayerName, reset: resetBest } = useBestScore("game", activeDifficulty);
  const challenges = useMemo(() => getChallenges(activeDifficulty, t), [activeDifficulty, t]);
  const maxHints = MAX_HINTS[activeDifficulty];
  const scoreTable = SCORE_BY_HINTS[activeDifficulty];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [lastPoints, setLastPoints] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [nameInput, setNameInput] = useState(playerName);
  const [isNewRecord, setIsNewRecord] = useState(false);

  // Timer
  const startTimeRef = useRef<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);

  const c = challenges[currentIndex];
  const progress = ((currentIndex + (checked ? 1 : 0)) / challenges.length) * 100;

  const currentHints = useMemo(() =>
    c.hintKeys.map(k => t(k)),
    [c.hintKeys, t]
  );

  const handleSelectLevel = (lv: GameDifficulty) => {
    setDifficulty(lv);
    saveLastLevel(lv);
    setGameStarted(true);
    startTimeRef.current = Date.now();
    // Reset game state
    setCurrentIndex(0);
    setUserAnswer("");
    setChecked(false);
    setIsCorrect(false);
    setScore(0);
    setLastPoints(0);
    setHintsUsed(0);
    setTotalHintsUsed(0);
    setCorrectCount(0);
    setFinished(false);
    setIsNewRecord(false);
  };

  const handleCheck = useCallback(() => {
    if (!userAnswer.trim()) return;
    const correct = normalize(userAnswer) === normalize(c.answer);
    setIsCorrect(correct);
    setChecked(true);
    if (correct) {
      const pts = scoreTable[Math.min(hintsUsed, scoreTable.length - 1)];
      setLastPoints(pts);
      setScore(s => s + pts);
      setCorrectCount(cc => cc + 1);
    } else {
      setLastPoints(0);
    }
    setTotalHintsUsed(th => th + hintsUsed);
  }, [userAnswer, c.answer, hintsUsed, scoreTable]);

  const handleRevealHint = useCallback(() => {
    setHintsUsed(h => Math.min(h + 1, maxHints));
  }, [maxHints]);

  const handleNext = () => {
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex(i => i + 1);
      setUserAnswer("");
      setChecked(false);
      setHintsUsed(0);
      setLastPoints(0);
    } else {
      setElapsed(Math.round((Date.now() - startTimeRef.current) / 1000));
      setFinished(true);
    }
  };

  useEffect(() => {
    if (finished) {
      setIsNewRecord(score > bestScore);
      submitScore(score);
    }
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRestart = () => {
    handleSelectLevel(activeDifficulty);
  };

  const handleBackToLevels = () => {
    setDifficulty(null);
    setGameStarted(false);
  };

  const handleSaveName = () => {
    setPlayerName(nameInput.trim());
  };

  // Tutorial
  if (showTutorial) {
    return <GameTutorial onStart={() => setShowTutorial(false)} />;
  }

  // Level selector
  if (!gameStarted) {
    return <LevelSelector onSelect={handleSelectLevel} t={t} />;
  }

  // Completion
  if (finished) {
    return (
      <CompletionScreen
        difficulty={activeDifficulty}
        score={score}
        correctCount={correctCount}
        total={challenges.length}
        totalHints={totalHintsUsed}
        elapsed={elapsed}
        t={t}
        bestScore={bestScore}
        playerName={playerName}
        nameInput={nameInput}
        setNameInput={setNameInput}
        onSaveName={handleSaveName}
        onRestart={handleRestart}
        onBackToLevels={handleBackToLevels}
        onResetBest={resetBest}
        isNewRecord={isNewRecord}
      />
    );
  }

  // Game play
  const meta = LEVEL_META[activeDifficulty];
  const hintFeedback = hintsUsed > 0
    ? ` (${hintsUsed} ${hintsUsed === 1 ? t("game_hint_single") : t("game_hint_plural")})`
    : "";

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="sm" onClick={handleBackToLevels} className="gap-1 text-muted-foreground px-2">
            <ArrowLeft size={14} />
          </Button>
          <p className="font-mono text-xs text-primary">{t("game_comment")}</p>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{t("game_title")}</h1>
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${meta.colorClass}`}>
            {meta.badge} {t(meta.labelKey)}
          </span>
        </div>
        <p className="text-muted-foreground mb-4">{t("game_subtitle")}</p>
      </motion.div>

      {bestScore > 0 && (
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-4">
          <Trophy className="text-yellow-400" size={14} />
          {playerName ? `${playerName} — ` : ""}{t("game_best_score")}: {bestScore}
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-sm text-primary font-mono">
          <Zap size={14} /> {score} {t("game_pts")}
        </div>
        <span className="text-xs text-muted-foreground">{currentIndex + 1}/{challenges.length}</span>
      </div>
      <Progress value={progress} className="h-2 mb-6" />

      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="bg-card border border-border rounded-lg p-6 mb-4">
            <span className="inline-block text-xs font-mono px-2 py-1 rounded border border-primary/30 text-primary bg-primary/10 mb-3">
              {c.type}
            </span>
            <pre className="font-mono text-lg text-foreground whitespace-pre-wrap">{c.question}</pre>
          </div>

          <GameHintButton
            hints={currentHints}
            revealedCount={hintsUsed}
            onRevealNext={handleRevealHint}
            disabled={checked}
          />

          <div className="flex gap-2 mb-4">
            <Input
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !checked && handleCheck()}
              placeholder={t("game_placeholder")}
              disabled={checked}
              className="font-mono"
            />
            {!checked && (
              <Button onClick={handleCheck} disabled={!userAnswer.trim()}>
                {t("game_check")}
              </Button>
            )}
          </div>

          {checked && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`flex items-start gap-2 p-4 rounded-lg border ${isCorrect ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"}`}>
                {isCorrect ? <CheckCircle2 className="text-green-400 mt-0.5" size={18} /> : <XCircle className="text-red-400 mt-0.5" size={18} />}
                <div>
                  <p className={`font-medium text-sm ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect
                      ? `${t("game_right")} +${lastPoints} ${t("game_pts")}${hintFeedback}`
                      : t("game_wrong")
                    }
                  </p>
                  {!isCorrect && <p className="text-xs text-muted-foreground mt-1">{t("game_answer")}: <span className="font-mono text-foreground">{c.answer}</span></p>}
                  <p className="text-xs text-muted-foreground mt-1">{c.explanation}</p>
                </div>
              </div>
              <Button onClick={handleNext} className="mt-4">
                {currentIndex < challenges.length - 1 ? t("game_next") : t("game_finish")}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
