import { useState, useCallback, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, BookOpen, Eye, EyeOff } from "lucide-react";
import { type Language, defaultCode, codeExamples } from "@/lib/codeExamples";
import { useI18n } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

const exampleTitleKeys: Record<string, string> = {
  'create-vector': 'ex_create_vector',
  'create-matrix': 'ex_create_matrix',
  'access-elements': 'ex_access_elements',
  'fill-vector-loop': 'ex_fill_vector_loop',
  'fill-matrix-loops': 'ex_fill_matrix_loops',
  'print-matrix': 'ex_print_matrix',
  'vector-addition': 'ex_vector_addition',
  'dot-product': 'ex_dot_product',
  'matrix-multiplication': 'ex_matrix_multiplication',
  'scalar-multiplication': 'ex_scalar_multiplication',
  'matrix-transpose': 'ex_matrix_transpose',
};

function MatrixGrid({ matrix, highlightCell }: { matrix: number[][]; highlightCell?: [number, number] | null }) {
  return (
    <div className="inline-flex flex-col gap-0.5 font-mono text-xs">
      {matrix.map((row, i) => (
        <div key={i} className="flex gap-0.5">
          {row.map((val, j) => {
            const isHighlighted = highlightCell && highlightCell[0] === i && highlightCell[1] === j;
            return (
              <motion.div
                key={`${i}-${j}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  backgroundColor: isHighlighted ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                }}
                transition={{ duration: 0.3, delay: i * 0.1 + j * 0.05 }}
                className="w-9 h-9 flex items-center justify-center rounded border border-border text-foreground font-medium"
              >
                {val}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function MatrixFillingAnimation({ matrix }: { matrix: number[][] }) {
  const [step, setStep] = useState(0);
  const totalCells = matrix.length * matrix[0].length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [playing, setPlaying] = useState(false);

  const startAnimation = () => {
    setStep(0);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      setStep(prev => {
        if (prev >= totalCells) {
          setPlaying(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, totalCells]);

  const displayMatrix = matrix.map((row, i) =>
    row.map((val, j) => {
      const cellIndex = i * row.length + j;
      return cellIndex < step ? val : null;
    })
  );

  const currentCell: [number, number] | null = step > 0 && step <= totalCells
    ? [Math.floor((step - 1) / matrix[0].length), (step - 1) % matrix[0].length]
    : null;

  return (
    <div className="space-y-2">
      <div className="inline-flex flex-col gap-0.5 font-mono text-xs">
        {displayMatrix.map((row, i) => (
          <div key={i} className="flex gap-0.5">
            {row.map((val, j) => {
              const isActive = currentCell && currentCell[0] === i && currentCell[1] === j;
              return (
                <motion.div
                  key={`${i}-${j}`}
                  animate={{
                    backgroundColor: isActive ? 'hsl(var(--primary))' : val !== null ? 'hsl(var(--muted))' : 'transparent',
                    borderColor: val !== null ? 'hsl(var(--border))' : 'hsl(var(--border) / 0.3)',
                  }}
                  className="w-9 h-9 flex items-center justify-center rounded border text-foreground font-medium"
                >
                  {val !== null ? val : '_'}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={startAnimation}
          className="px-3 py-1 rounded text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {playing ? `Step ${step}/${totalCells}` : step >= totalCells ? '↻ Replay' : '▶ Animate'}
        </button>
        {step > 0 && step <= totalCells && currentCell && (
          <span className="text-xs text-muted-foreground font-mono">
            matrix[{currentCell[0]}][{currentCell[1]}] = {matrix[currentCell[0]][currentCell[1]]}
          </span>
        )}
      </div>
    </div>
  );
}

export default function CodeConsole() {
  const { t, locale } = useI18n();
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(defaultCode.javascript);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeExample, setActiveExample] = useState<string | null>(null);

  const currentExample = activeExample ? codeExamples.find(e => e.id === activeExample) : null;

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    if (activeExample) {
      const ex = codeExamples.find(e => e.id === activeExample);
      if (ex) setCode(ex.code[lang]);
    } else {
      setCode(defaultCode[lang]);
    }
    setOutput('');
    setShowExplanation(false);
  };

  const runCode = useCallback(() => {
    setRunning(true);
    setOutput('');

    if (language === 'javascript') {
      try {
        const logs: string[] = [];
        const mockConsole = {
          log: (...args: unknown[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        };
        const fn = new Function('console', code);
        fn(mockConsole);
        setOutput(logs.join('\n') || t("console_no_output"));
      } catch (e) {
        setOutput(`Error: ${(e as Error).message}`);
      }
    } else {
      const matchingExample = codeExamples.find(ex => code.trim() === ex.code[language].trim());
      if (matchingExample) {
        setTimeout(() => setOutput(matchingExample.output[language]), 300);
      } else {
        setTimeout(() => setOutput(`[Simulated ${language} output]\n\n${t("console_sim_warning")}`), 300);
      }
    }

    setTimeout(() => setRunning(false), 400);
  }, [code, language, t]);

  const loadExample = (id: string) => {
    const ex = codeExamples.find(e => e.id === id);
    if (ex) {
      setCode(ex.code[language]);
      setOutput('');
      setActiveExample(id);
      setShowExplanation(false);
    }
  };

  const monacoLang = language === 'java' ? 'java' : language === 'python' ? 'python' : 'javascript';

  const beginnerExamples = codeExamples.filter(e => e.category === 'beginner');
  const intermediateExamples = codeExamples.filter(e => e.category === 'intermediate');

  const explanationLocale = locale === 'pt-BR' ? 'ptBR' : 'en';

  return (
    <div>
      <p className="font-mono text-xs text-primary mb-2">{t("console_comment")}</p>
      <h1 className="text-3xl font-bold mb-2">{t("console_title")}</h1>
      <p className="text-muted-foreground mb-6">{t("console_subtitle")}</p>

      <div className="grid lg:grid-cols-[220px_1fr] gap-4">
        {/* Sidebar */}
        <div className="bg-card border border-border rounded-lg p-3 space-y-4">
          <div>
            <p className="font-mono text-xs text-primary mb-2">📚 {t("console_beginner")}</p>
            <div className="space-y-1">
              {beginnerExamples.map(ex => (
                <button key={ex.id} onClick={() => loadExample(ex.id)}
                  className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                    activeExample === ex.id ? "bg-primary/20 text-primary" : "text-secondary-foreground hover:bg-secondary"
                  }`}>
                  {t(exampleTitleKeys[ex.id] || ex.id)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs text-primary mb-2">⚡ {t("console_intermediate")}</p>
            <div className="space-y-1">
              {intermediateExamples.map(ex => (
                <button key={ex.id} onClick={() => loadExample(ex.id)}
                  className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                    activeExample === ex.id ? "bg-primary/20 text-primary" : "text-secondary-foreground hover:bg-secondary"
                  }`}>
                  {t(exampleTitleKeys[ex.id] || ex.id)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="space-y-3">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex gap-1">
              {(['javascript', 'python', 'java'] as Language[]).map(lang => (
                <button key={lang} onClick={() => switchLanguage(lang)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono capitalize transition-colors ${
                    language === lang ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}>
                  {lang}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {currentExample && (
                <button onClick={() => setShowExplanation(v => !v)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs bg-accent text-accent-foreground hover:bg-accent/80 transition-colors">
                  <BookOpen size={12} /> {t("console_explain")}
                </button>
              )}
              <button onClick={() => { setCode(defaultCode[language]); setOutput(''); setActiveExample(null); setShowExplanation(false); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                <RotateCcw size={12} /> {t("console_reset")}
              </button>
              <button onClick={runCode} disabled={running}
                className="flex items-center gap-1 px-4 py-1.5 rounded-md text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium">
                <Play size={12} /> {running ? t("console_running") : t("console_run")}
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="border border-border rounded-lg overflow-hidden">
            <Editor
              height="320px"
              language={monacoLang}
              value={code}
              onChange={v => setCode(v || '')}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                minimap: { enabled: false },
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                padding: { top: 12 },
                automaticLayout: true,
              }}
            />
          </div>

          {/* Line-by-line explanation */}
          <AnimatePresence>
            {showExplanation && currentExample && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
                  <BookOpen size={14} className="text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">{t("console_line_explain")}</span>
                </div>
                <div className="p-3 space-y-2">
                  {currentExample.explanations[language]?.map((exp, idx) => (
                    <div key={idx} className="flex gap-3 text-xs">
                      <code className="text-primary font-mono whitespace-nowrap shrink-0 max-w-[220px] truncate">
                        {exp.line}
                      </code>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-foreground">
                        {explanationLocale === 'ptBR' ? exp.ptBR : exp.en}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Output */}
          <div className="bg-muted border border-border rounded-lg">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-xs text-muted-foreground">{t("console_output")}</span>
            </div>
            <pre className="p-4 font-mono text-xs text-foreground min-h-[80px] whitespace-pre-wrap">
              {output || t("console_placeholder")}
            </pre>
          </div>

          {/* Visual matrix representation */}
          {currentExample?.matrixResult && (
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-primary" />
                <span className="font-mono text-xs text-muted-foreground">{t("console_visual")}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">{t("console_matrix_grid")}</p>
                  <MatrixGrid matrix={currentExample.matrixResult} />
                </div>

                {(currentExample.id === 'fill-matrix-loops' || currentExample.id === 'create-matrix') && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">{t("console_fill_animation")}</p>
                    <MatrixFillingAnimation matrix={currentExample.matrixResult} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
