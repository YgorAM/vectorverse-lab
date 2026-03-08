import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type Topic = "vec-add" | "mat-mul" | "dot-product";

interface Step {
  highlight: string;
  description: string;
}

function StepAnimation({ steps, active }: { steps: Step[]; active: number }) {
  return (
    <div className="space-y-2">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: i <= active ? 1 : 0.25, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className={`flex items-start gap-3 px-3 py-2 rounded-md font-mono text-sm transition-colors ${
            i === active ? "bg-primary/10 border border-primary/30" : "border border-transparent"
          }`}
        >
          <span className="text-primary font-bold shrink-0">{step.highlight}</span>
          <span className="text-muted-foreground">{step.description}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function VisualExplanations() {
  const { t } = useI18n();
  const [topic, setTopic] = useState<Topic>("vec-add");
  const [step, setStep] = useState(0);

  const topics: { id: Topic; label: string }[] = [
    { id: "vec-add", label: t("vexp_vec_add") },
    { id: "mat-mul", label: t("vexp_mat_mul") },
    { id: "dot-product", label: t("vexp_dot_product") },
  ];

  const vecAddSteps: Step[] = [
    { highlight: "v1 = [2, 4]", description: t("vexp_va_step1") },
    { highlight: "v2 = [1, 3]", description: t("vexp_va_step2") },
    { highlight: "2 + 1 → 3", description: t("vexp_va_step3") },
    { highlight: "4 + 3 → 7", description: t("vexp_va_step4") },
    { highlight: "= [3, 7]", description: t("vexp_va_step5") },
  ];

  const matMulSteps: Step[] = [
    { highlight: "A = [[1,2],[3,4]]", description: t("vexp_mm_step1") },
    { highlight: "B = [[5,6],[7,8]]", description: t("vexp_mm_step2") },
    { highlight: "R[0][0] = 1×5 + 2×7 = 19", description: t("vexp_mm_step3") },
    { highlight: "R[0][1] = 1×6 + 2×8 = 22", description: t("vexp_mm_step4") },
    { highlight: "R[1][0] = 3×5 + 4×7 = 43", description: t("vexp_mm_step5") },
    { highlight: "R[1][1] = 3×6 + 4×8 = 50", description: t("vexp_mm_step6") },
    { highlight: "= [[19,22],[43,50]]", description: t("vexp_mm_step7") },
  ];

  const dotSteps: Step[] = [
    { highlight: "a = [3, 4]", description: t("vexp_dp_step1") },
    { highlight: "b = [2, 5]", description: t("vexp_dp_step2") },
    { highlight: "3 × 2 = 6", description: t("vexp_dp_step3") },
    { highlight: "4 × 5 = 20", description: t("vexp_dp_step4") },
    { highlight: "6 + 20 = 26", description: t("vexp_dp_step5") },
  ];

  const stepsMap: Record<Topic, Step[]> = {
    "vec-add": vecAddSteps,
    "mat-mul": matMulSteps,
    "dot-product": dotSteps,
  };

  const currentSteps = stepsMap[topic];
  const maxStep = currentSteps.length - 1;

  const changeTopic = (t: Topic) => {
    setTopic(t);
    setStep(0);
  };

  return (
    <div>
      <p className="font-mono text-xs text-primary mb-2">{t("vexp_comment")}</p>
      <h1 className="text-3xl font-bold mb-2">{t("vexp_title")}</h1>
      <p className="text-muted-foreground mb-6">{t("vexp_subtitle")}</p>

      {/* Topic selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {topics.map(tp => (
          <button key={tp.id} onClick={() => changeTopic(tp.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
              topic === tp.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}>
            {tp.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Steps */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-mono text-xs text-muted-foreground mb-4">// {t("vexp_steps")}</h3>
          <AnimatePresence mode="wait">
            <motion.div key={topic} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <StepAnimation steps={currentSteps} active={step} />
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-4 py-1.5 rounded-md text-xs font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-40 transition-colors"
            >
              ← {t("vexp_prev")}
            </button>
            <button
              onClick={() => setStep(s => Math.min(maxStep, s + 1))}
              disabled={step === maxStep}
              className="px-4 py-1.5 rounded-md text-xs font-mono bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors"
            >
              {t("vexp_next")} →
            </button>
            <button
              onClick={() => setStep(0)}
              className="px-4 py-1.5 rounded-md text-xs font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors ml-auto"
            >
              {t("vexp_reset")}
            </button>
          </div>
        </div>

        {/* Result preview */}
        <motion.div
          key={`${topic}-${step}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-primary/30 rounded-lg p-5 flex flex-col justify-center"
        >
          <h3 className="font-mono text-xs text-primary mb-3">// {t("vexp_preview")}</h3>

          {topic === "vec-add" && (
            <div className="space-y-3 font-mono">
              <div className="flex gap-4 items-center">
                <span style={{ color: "hsl(var(--chart-1))" }}>v1 = [2, 4]</span>
                <span className="text-muted-foreground">+</span>
                <span style={{ color: "hsl(var(--chart-2))" }}>v2 = [1, 3]</span>
              </div>
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-8 text-lg">
                    <span className="text-primary">[</span>
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="font-bold text-foreground">
                      {step >= 2 ? "3" : "_"}
                    </motion.span>
                    <span className="text-muted-foreground">,</span>
                    <motion.span initial={{ scale: 0 }} animate={{ scale: step >= 3 ? 1 : 0 }} className="font-bold text-foreground">
                      {step >= 3 ? "7" : "_"}
                    </motion.span>
                    <span className="text-primary">]</span>
                  </motion.div>
                )}
              </AnimatePresence>
              {step === maxStep && (
                <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-primary font-semibold">
                  ✓ {t("vexp_result")}: [3, 7]
                </motion.p>
              )}
            </div>
          )}

          {topic === "mat-mul" && (
            <div className="space-y-3 font-mono text-sm">
              <div className="grid grid-cols-2 gap-2">
                {[[19, 22], [43, 50]].map((row, i) => (
                  <div key={i} className="contents">
                    {row.map((v, j) => {
                      const cellStep = i * 2 + j + 2;
                      return (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0.2 }}
                          animate={{ opacity: step >= cellStep ? 1 : 0.2, scale: step === cellStep ? 1.1 : 1 }}
                          className={`w-16 h-10 flex items-center justify-center rounded border font-bold text-lg ${
                            step === cellStep ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground"
                          }`}
                        >
                          {step >= cellStep ? v : "?"}
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
              {step === maxStep && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary font-semibold">
                  ✓ {t("vexp_result")}: [[19,22],[43,50]]
                </motion.p>
              )}
            </div>
          )}

          {topic === "dot-product" && (
            <div className="space-y-3 font-mono">
              <div className="flex gap-4 items-center">
                <span style={{ color: "hsl(var(--chart-1))" }}>a = [3, 4]</span>
                <span className="text-muted-foreground">·</span>
                <span style={{ color: "hsl(var(--chart-2))" }}>b = [2, 5]</span>
              </div>
              <div className="flex gap-3 items-center text-lg">
                {step >= 2 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-foreground font-bold">6</motion.span>
                )}
                {step >= 3 && (
                  <>
                    <span className="text-muted-foreground">+</span>
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-foreground font-bold">20</motion.span>
                  </>
                )}
                {step >= 4 && (
                  <>
                    <span className="text-muted-foreground">=</span>
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-primary font-bold text-2xl">26</motion.span>
                  </>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
