import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface Question {
  questionKey: string;
  codeBlock?: string;
  options: string[];
  correctIndex: number;
  explanationKey: string;
  level: "beginner" | "intermediate" | "advanced";
}

const questions: Question[] = [
  // Beginner
  { questionKey: "prac_q1", codeBlock: "vector = [5, 8, 2]", options: ["8", "5", "2", "0"], correctIndex: 1, explanationKey: "prac_q1_exp", level: "beginner" },
  { questionKey: "prac_q2", codeBlock: "v = [10, 20, 30]", options: ["10", "20", "30", "0"], correctIndex: 1, explanationKey: "prac_q2_exp", level: "beginner" },
  { questionKey: "prac_q3", codeBlock: "v = [7, 3, 9]", options: ["1", "2", "3", "0"], correctIndex: 2, explanationKey: "prac_q3_exp", level: "beginner" },
  { questionKey: "prac_q4", codeBlock: "matrix = [[1, 2], [3, 4]]", options: ["2", "3", "1", "4"], correctIndex: 0, explanationKey: "prac_q4_exp", level: "beginner" },
  { questionKey: "prac_q5", codeBlock: "matrix = [[5, 6], [7, 8]]", options: ["2 rows, 2 columns", "1 row, 4 columns", "4 rows, 1 column", "2 rows, 1 column"], correctIndex: 0, explanationKey: "prac_q5_exp", level: "beginner" },
  // Intermediate
  { questionKey: "prac_q6", codeBlock: "[1, 2] + [3, 4]", options: ["[4, 6]", "[3, 8]", "[1, 2, 3, 4]", "[5, 5]"], correctIndex: 0, explanationKey: "prac_q6_exp", level: "intermediate" },
  { questionKey: "prac_q7", codeBlock: "3 × [2, 5]", options: ["[6, 15]", "[5, 8]", "[6, 5]", "[2, 15]"], correctIndex: 0, explanationKey: "prac_q7_exp", level: "intermediate" },
  { questionKey: "prac_q8", codeBlock: "[1, 2, 3] · [4, 5, 6]", options: ["32", "15", "21", "12"], correctIndex: 0, explanationKey: "prac_q8_exp", level: "intermediate" },
  // Advanced
  { questionKey: "prac_q9", codeBlock: "[[1, 0], [0, 1]] + [[2, 3], [4, 5]]", options: ["[[3, 3], [4, 6]]", "[[2, 3], [4, 5]]", "[[3, 3], [5, 6]]", "[[1, 3], [4, 1]]"], correctIndex: 0, explanationKey: "prac_q9_exp", level: "advanced" },
  { questionKey: "prac_q10", codeBlock: "[[1, 2], [3, 4]] × [[5, 6], [7, 8]]", options: ["[[19, 22], [43, 50]]", "[[5, 12], [21, 32]]", "[[12, 16], [36, 48]]", "[[19, 50], [22, 43]]"], correctIndex: 0, explanationKey: "prac_q10_exp", level: "advanced" },
];

export default function Practice() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentIndex];
  const isCorrect = selected === q.correctIndex;
  const progress = ((currentIndex) / questions.length) * 100;

  const levelLabel = useMemo(() => {
    return t(`prac_level_${q.level}`);
  }, [q.level, t]);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setAnswered(a => a + 1);
    if (i === q.correctIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">🎉 {t("prac_complete")}</h1>
          <p className="text-xl text-muted-foreground mb-2">{t("prac_score")}: {score} / {questions.length}</p>
          <p className="text-muted-foreground mb-6">{Math.round((score / questions.length) * 100)}%</p>
          <Button onClick={handleRestart}>{t("prac_restart")}</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-mono text-xs text-primary mb-2">{t("prac_comment")}</p>
        <h1 className="text-3xl font-bold mb-2">{t("prac_title")}</h1>
        <p className="text-muted-foreground mb-6">{t("prac_subtitle")}</p>
      </motion.div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>{t("prac_question")} {currentIndex + 1} / {questions.length}</span>
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
        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="bg-card border border-border rounded-lg p-6 mb-4">
            <p className="font-medium mb-3">{t(q.questionKey)}</p>
            {q.codeBlock && (
              <pre className="bg-secondary rounded-md p-3 font-mono text-sm text-foreground border border-border">
                {q.codeBlock}
              </pre>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2 mb-4">
            {q.options.map((opt, i) => {
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
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
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
                {currentIndex < questions.length - 1 ? t("prac_next") : t("prac_finish")}
                <ArrowRight size={14} />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
