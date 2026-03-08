import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Zap } from "lucide-react";

interface Challenge {
  type: string;
  question: string;
  answer: string;
  explanation: string;
  level: number;
}

function generateChallenges(t: (k: string) => string): Challenge[] {
  return [
    // Level 1 - Vector basics
    { type: t("game_type_vec_add"), question: "[1, 2] + [3, 4] = ?", answer: "[4, 6]", explanation: "[1+3, 2+4] = [4, 6]", level: 1 },
    { type: t("game_type_vec_add"), question: "[5, 0] + [0, 3] = ?", answer: "[5, 3]", explanation: "[5+0, 0+3] = [5, 3]", level: 1 },
    { type: t("game_type_scalar"), question: "2 × [3, 5] = ?", answer: "[6, 10]", explanation: "[2×3, 2×5] = [6, 10]", level: 1 },
    // Level 2 - Vector operations
    { type: t("game_type_scalar"), question: "3 × [1, 4] = ?", answer: "[3, 12]", explanation: "[3×1, 3×4] = [3, 12]", level: 2 },
    { type: t("game_type_dot"), question: "[1, 2] · [3, 4] = ?", answer: "11", explanation: "1×3 + 2×4 = 3 + 8 = 11", level: 2 },
    { type: t("game_type_dot"), question: "[2, 0] · [0, 5] = ?", answer: "0", explanation: "2×0 + 0×5 = 0", level: 2 },
    // Level 3 - Matrix basics
    { type: t("game_type_mat_add"), question: "[[1, 0], [0, 1]] + [[1, 1], [1, 1]] = ?", answer: "[[2, 1], [1, 2]]", explanation: "[[1+1, 0+1], [0+1, 1+1]]", level: 3 },
    { type: t("game_type_mat_add"), question: "[[2, 3], [4, 5]] + [[1, 1], [1, 1]] = ?", answer: "[[3, 4], [5, 6]]", explanation: "[[2+1, 3+1], [4+1, 5+1]]", level: 3 },
    // Level 4 - Matrix operations
    { type: t("game_type_mat_mul"), question: "[[1, 0], [0, 1]] × [[5, 6], [7, 8]] = ?", answer: "[[5, 6], [7, 8]]", explanation: t("game_identity_exp"), level: 4 },
    { type: t("game_type_mat_mul"), question: "[[1, 2], [0, 1]] × [[1, 0], [1, 1]] = ?", answer: "[[3, 2], [1, 1]]", explanation: "[[1×1+2×1, 1×0+2×1], [0×1+1×1, 0×0+1×1]]", level: 4 },
  ];
}

function normalize(s: string): string {
  return s.replace(/\s/g, "");
}

export default function MiniGame() {
  const { t } = useI18n();
  const challenges = useMemo(() => generateChallenges(t), [t]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const c = challenges[currentIndex];
  const currentLevel = c.level;
  const progress = (currentIndex / challenges.length) * 100;

  const handleCheck = useCallback(() => {
    if (!userAnswer.trim()) return;
    const correct = normalize(userAnswer) === normalize(c.answer);
    setIsCorrect(correct);
    setChecked(true);
    if (correct) setScore(s => s + 10 * currentLevel);
  }, [userAnswer, c.answer, currentLevel]);

  const handleNext = () => {
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex(i => i + 1);
      setUserAnswer("");
      setChecked(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswer("");
    setChecked(false);
    setIsCorrect(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">🏆 {t("game_complete")}</h1>
          <p className="text-4xl font-bold text-primary mb-2">{score} {t("game_points")}</p>
          <p className="text-muted-foreground mb-6">{t("game_out_of")} {challenges.reduce((acc, ch) => acc + 10 * ch.level, 0)}</p>
          <Button onClick={handleRestart}>{t("game_play_again")}</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-mono text-xs text-primary mb-2">{t("game_comment")}</p>
        <h1 className="text-3xl font-bold mb-2">{t("game_title")}</h1>
        <p className="text-muted-foreground mb-6">{t("game_subtitle")}</p>
      </motion.div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-sm text-primary font-mono">
          <Zap size={14} /> {score} {t("game_pts")}
        </div>
        <span className="text-xs text-muted-foreground">{t("game_level")} {currentLevel}</span>
        <span className="text-xs text-muted-foreground">{currentIndex + 1}/{challenges.length}</span>
      </div>
      <Progress value={progress} className="h-2 mb-6" />

      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          {/* Challenge card */}
          <div className="bg-card border border-border rounded-lg p-6 mb-4">
            <span className="inline-block text-xs font-mono px-2 py-1 rounded border border-primary/30 text-primary bg-primary/10 mb-3">
              {c.type}
            </span>
            <pre className="font-mono text-lg text-foreground">{c.question}</pre>
          </div>

          {/* Input */}
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

          {/* Feedback */}
          {checked && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`flex items-start gap-2 p-4 rounded-lg border ${isCorrect ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"}`}>
                {isCorrect ? <CheckCircle2 className="text-green-400 mt-0.5" size={18} /> : <XCircle className="text-red-400 mt-0.5" size={18} />}
                <div>
                  <p className={`font-medium text-sm ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? t("game_right") : t("game_wrong")}
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
