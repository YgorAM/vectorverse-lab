import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Trash2 } from "lucide-react";
import { generateSession, type Question } from "@/lib/questionBank";
import { useBestScore } from "@/hooks/useBestScore";

const SESSION_SIZE = 10;
const POINTS_PER_CORRECT = 10;

export default function Practice() {
  const { t } = useI18n();
  const { bestScore, playerName, submitScore, setPlayerName, reset: resetBest } = useBestScore("practice");
  const [session, setSession] = useState<Question[]>(() => generateSession());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [nameInput, setNameInput] = useState(playerName);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const q = session[currentIndex];
  const isCorrect = selected === q.correctIndex;
  const progress = (currentIndex / SESSION_SIZE) * 100;

  const options: string[] = useMemo(() => t(q.optionsKey).split("|"), [q.optionsKey, t]);
  const levelLabel = useMemo(() => t(`prac_level_${q.level}`), [q.level, t]);

  const handleSelect = useCallback((i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correctIndex) setScore(s => s + POINTS_PER_CORRECT);
  }, [selected, q.correctIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < SESSION_SIZE - 1) {
      setCurrentIndex(i => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }, [currentIndex]);

  // Submit score when finished
  useEffect(() => {
    if (finished) {
      setIsNewRecord(score > bestScore);
      submitScore(score);
    }
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRestart = useCallback(() => {
    setSession(generateSession());
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setIsNewRecord(false);
  }, []);

  const handleSaveName = () => {
    setPlayerName(nameInput.trim());
  };

  if (finished) {
    const pct = Math.round((score / (SESSION_SIZE * POINTS_PER_CORRECT)) * 100);
    return (
      <div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">🎉 {t("prac_complete")}</h1>
          <p className="text-xl text-muted-foreground mb-2">{t("prac_score")}: {score} {t("prac_points")}</p>
          <p className="text-muted-foreground mb-4">{pct}%</p>

          {isNewRecord && (
            <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-primary font-bold text-lg mb-4">
              🎊 {t("prac_new_record")}
            </motion.p>
          )}

          {/* Best score display */}
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 mb-4">
            <Trophy className="text-yellow-400" size={18} />
            <span className="text-sm font-mono">
              {playerName ? `${playerName} — ` : ""}{t("prac_best_score")}: {Math.max(score, bestScore)}
            </span>
          </div>

          {/* Name input */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Input
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSaveName()}
              placeholder={t("prac_name_placeholder")}
              className="max-w-[180px] font-mono text-sm"
            />
            <Button variant="outline" size="sm" onClick={handleSaveName}>{t("prac_save_name")}</Button>
          </div>

          <p className="text-sm text-muted-foreground mb-6">{t("prac_session_note")}</p>

          <div className="flex items-center justify-center gap-3">
            <Button onClick={handleRestart} className="gap-2">
              <RotateCcw size={14} />
              {t("prac_restart")}
            </Button>
            <Button variant="ghost" size="sm" onClick={resetBest} className="text-muted-foreground gap-1">
              <Trash2 size={12} />
              {t("prac_reset_score")}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-mono text-xs text-primary mb-2">{t("prac_comment")}</p>
        <h1 className="text-3xl font-bold mb-2">{t("prac_title")}</h1>
        <p className="text-muted-foreground mb-4">{t("prac_subtitle")}</p>
      </motion.div>

      {/* Best score banner */}
      {bestScore > 0 && (
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-4">
          <Trophy className="text-yellow-400" size={14} />
          {playerName ? `${playerName} — ` : ""}{t("prac_best_score")}: {bestScore}
        </div>
      )}

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>{t("prac_question")} {currentIndex + 1} / {SESSION_SIZE}</span>
          <span>{t("prac_score")}: {score}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Level badge */}
      <div className="mb-4">
        <span className={`inline-block text-xs font-mono px-2 py-1 rounded border ${
          q.level === "beginner" ? "border-green-500/30 text-green-400 bg-green-500/10" :
          q.level === "intermediate" ? "border-yellow-500/30 text-yellow-400 bg-yellow-500/10" :
          "border-red-500/30 text-red-400 bg-red-500/10"
        }`}>
          {levelLabel}
        </span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="bg-card border border-border rounded-lg p-6 mb-4">
            <p className="font-medium mb-3">{t(q.questionKey)}</p>
            {q.codeBlock && (
              <pre className="bg-secondary rounded-md p-3 font-mono text-sm text-foreground border border-border">
                {q.codeBlock}
              </pre>
            )}
          </div>

          <div className="space-y-2 mb-4">
            {options.map((opt, i) => {
              let style = "border-border bg-card hover:border-primary/50";
              if (selected !== null) {
                if (i === q.correctIndex) style = "border-green-500 bg-green-500/10";
                else if (i === selected) style = "border-red-500 bg-red-500/10";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`w-full text-left p-3 rounded-lg border transition-colors font-mono text-sm ${style} disabled:cursor-default`}
                >
                  <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + i)})</span>
                  {opt.trim()}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
              <div className={`flex items-start gap-2 p-4 rounded-lg border ${isCorrect ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"}`}>
                {isCorrect ? <CheckCircle2 className="text-green-400 mt-0.5" size={18} /> : <XCircle className="text-red-400 mt-0.5" size={18} />}
                <div>
                  <p className={`font-medium text-sm ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? t("prac_correct") : t("prac_incorrect")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{t(q.explanationKey)}</p>
                </div>
              </div>
              <Button onClick={handleNext} className="mt-4 gap-2">
                {currentIndex < SESSION_SIZE - 1 ? t("prac_next") : t("prac_finish")}
                <ArrowRight size={14} />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
