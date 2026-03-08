import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, SkipForward } from "lucide-react";

const TUTORIAL_SKIP_KEY = "linalg-game-tutorial-skipped";

interface Props {
  onStart: () => void;
}

function VectorAddAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 4), 1200);
    return () => clearInterval(id);
  }, []);

  const v1 = [2, 4];
  const v2 = [1, 3];
  const result = [3, 7];

  return (
    <div className="flex flex-col items-center gap-3 font-mono text-sm">
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground">v1 =</span>
        <div className="flex gap-1">
          {v1.map((n, i) => (
            <span key={i} className={`inline-flex items-center justify-center w-8 h-8 rounded border ${step === i + 1 ? "border-primary bg-primary/20 text-primary" : "border-border bg-card text-foreground"} transition-all duration-300`}>
              {n}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground">v2 =</span>
        <div className="flex gap-1">
          {v2.map((n, i) => (
            <span key={i} className={`inline-flex items-center justify-center w-8 h-8 rounded border ${step === i + 1 ? "border-primary bg-primary/20 text-primary" : "border-border bg-card text-foreground"} transition-all duration-300`}>
              {n}
            </span>
          ))}
        </div>
      </div>
      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-xs text-muted-foreground">
          {step >= 1 && <span className={step === 1 ? "text-primary font-bold" : ""}>{v1[0]}+{v2[0]}→{result[0]}</span>}
          {step >= 2 && <span className={step === 2 ? "text-primary font-bold" : ""}>{v1[1]}+{v2[1]}→{result[1]}</span>}
        </motion.div>
      )}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
          <span className="text-muted-foreground">=</span>
          <div className="flex gap-1">
            {result.map((n, i) => (
              <span key={i} className="inline-flex items-center justify-center w-8 h-8 rounded border border-primary bg-primary/20 text-primary font-bold">
                {n}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function MatrixMulAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 6), 1000);
    return () => clearInterval(id);
  }, []);

  const A = [[1, 2], [5, 6]];
  const B = [[3, 4], [7, 8]];
  const R = [[17, 20], [57, 68]];

  const highlightA = step >= 1 && step <= 4 ? (step <= 2 ? 0 : 1) : -1;
  const highlightBCol = step >= 1 && step <= 4 ? ((step - 1) % 2) : -1;
  const resultCell = step >= 1 && step <= 4 ? [step <= 2 ? 0 : 1, (step - 1) % 2] : null;

  return (
    <div className="flex flex-col items-center gap-3 font-mono text-xs">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          {A.map((row, r) => (
            <div key={r} className="flex gap-1">
              {row.map((n, c) => (
                <span key={c} className={`inline-flex items-center justify-center w-7 h-7 rounded border text-[11px] ${highlightA === r ? "border-primary bg-primary/20 text-primary" : "border-border bg-card text-foreground"} transition-all duration-300`}>
                  {n}
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className="text-muted-foreground">×</span>
        <div className="flex flex-col gap-1">
          {B.map((row, r) => (
            <div key={r} className="flex gap-1">
              {row.map((n, c) => (
                <span key={c} className={`inline-flex items-center justify-center w-7 h-7 rounded border text-[11px] ${highlightBCol === c ? "border-primary bg-primary/20 text-primary" : "border-border bg-card text-foreground"} transition-all duration-300`}>
                  {n}
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className="text-muted-foreground">=</span>
        <div className="flex flex-col gap-1">
          {R.map((row, r) => (
            <div key={r} className="flex gap-1">
              {row.map((n, c) => (
                <span key={c} className={`inline-flex items-center justify-center w-7 h-7 rounded border text-[11px] ${resultCell && resultCell[0] === r && resultCell[1] === c ? "border-primary bg-primary/20 text-primary font-bold" : step === 5 ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"} transition-all duration-300`}>
                  {(step >= 1 && (r < (resultCell?.[0] ?? 99) || (r === resultCell?.[0] && c <= (resultCell?.[1] ?? -1)))) || step === 5 ? n : "_"}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreTable({ t }: { t: (k: string) => string }) {
  const rows = [
    { hints: 0, pts: 30, key: "tut_score_row0" },
    { hints: 1, pts: 25, key: "tut_score_row1" },
    { hints: 2, pts: 18, key: "tut_score_row2" },
    { hints: 3, pts: 13, key: "tut_score_row3" },
  ];

  return (
    <div className="space-y-1.5">
      {rows.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
          className="flex items-center justify-between px-3 py-1.5 rounded border border-border bg-card font-mono text-xs"
        >
          <span className="text-muted-foreground">{t(r.key)}</span>
          <span className="text-primary font-bold">+{r.pts}</span>
        </motion.div>
      ))}
    </div>
  );
}

function LevelCards({ t }: { t: (k: string) => string }) {
  const levels = [
    { emoji: "🟢", labelKey: "game_lvl_beginner", descKey: "tut_lvl1_short", colorClass: "border-green-500/40 bg-green-500/10" },
    { emoji: "🔵", labelKey: "game_lvl_intermediate", descKey: "tut_lvl2_short", colorClass: "border-blue-500/40 bg-blue-500/10" },
    { emoji: "🟣", labelKey: "game_lvl_advanced", descKey: "tut_lvl3_short", colorClass: "border-purple-500/40 bg-purple-500/10" },
  ];

  return (
    <div className="space-y-2">
      {levels.map((lv, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border ${lv.colorClass}`}
        >
          <span className="text-lg">{lv.emoji}</span>
          <div>
            <p className="text-sm font-bold text-foreground">{t(lv.labelKey)}</p>
            <p className="text-xs text-muted-foreground">{t(lv.descKey)}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function GameTutorial({ onStart }: Props) {
  const { t } = useI18n();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: t("tut_step1_title"),
      desc: t("tut_step1_desc"),
      content: <VectorAddAnimation />,
    },
    {
      title: t("tut_step2_title"),
      desc: t("tut_step2_desc"),
      content: (
        <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm text-center">
          <p className="text-muted-foreground mb-2">[2, 4] + [1, 3] = ?</p>
          <div className="inline-flex items-center border border-primary/30 rounded px-3 py-1.5 bg-primary/5 text-primary">
            [3, 7]
          </div>
        </div>
      ),
    },
    {
      title: t("tut_step3_title"),
      desc: t("tut_step3_desc"),
      content: (
        <div className="flex justify-center">
          <Button size="sm" className="pointer-events-none">{t("game_check")}</Button>
        </div>
      ),
    },
    {
      title: t("tut_step4_title"),
      desc: t("tut_step4_desc"),
      content: <ScoreTable t={t} />,
    },
    {
      title: t("tut_step5_title"),
      desc: t("tut_step5_desc"),
      content: <MatrixMulAnimation />,
    },
    {
      title: t("tut_step6_title"),
      desc: t("tut_step6_desc"),
      content: <LevelCards t={t} />,
    },
  ];

  const handleSkip = () => {
    localStorage.setItem(TUTORIAL_SKIP_KEY, "true");
    onStart();
  };

  const handleStart = () => {
    onStart();
  };

  const isLast = step === steps.length - 1;
  const current = steps[step];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-mono text-xs text-primary mb-2">{t("game_comment")}</p>
        <h1 className="text-3xl font-bold mb-2">{t("tut_title")}</h1>
        <p className="text-muted-foreground mb-6">{t("tut_subtitle")}</p>
      </motion.div>

      <div className="flex items-center gap-2 mb-6">
        {steps.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= step ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold mb-2 text-foreground">{current.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{current.desc}</p>
            <div className="py-2">{current.content}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground gap-1">
          <SkipForward size={14} />
          {t("tut_skip")}
        </Button>
        <div className="flex items-center gap-2">
          {step > 0 && (
            <Button variant="outline" size="sm" onClick={() => setStep(s => s - 1)} className="gap-1">
              <ChevronLeft size={14} />
              {t("tut_prev")}
            </Button>
          )}
          {isLast ? (
            <Button onClick={handleStart} className="gap-1">
              <Play size={14} />
              {t("tut_start")}
            </Button>
          ) : (
            <Button onClick={() => setStep(s => s + 1)} className="gap-1">
              {t("tut_next")}
              <ChevronRight size={14} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function shouldShowTutorial(): boolean {
  return localStorage.getItem(TUTORIAL_SKIP_KEY) !== "true";
}
