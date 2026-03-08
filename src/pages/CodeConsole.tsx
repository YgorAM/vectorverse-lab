import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw } from "lucide-react";
import { type Language, defaultCode, codeExamples } from "@/lib/codeExamples";
import { useI18n } from "@/lib/i18n";

const exampleTitleKeys: Record<string, string> = {
  'vector-addition': 'ex_vector_addition',
  'dot-product': 'ex_dot_product',
  'matrix-multiplication': 'ex_matrix_multiplication',
  'scalar-multiplication': 'ex_scalar_multiplication',
  'matrix-transpose': 'ex_matrix_transpose',
};

export default function CodeConsole() {
  const { t } = useI18n();
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(defaultCode.javascript);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    setCode(defaultCode[lang]);
    setOutput('');
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
    }
  };

  const monacoLang = language === 'java' ? 'java' : language === 'python' ? 'python' : 'javascript';

  return (
    <div>
      <p className="font-mono text-xs text-primary mb-2">{t("console_comment")}</p>
      <h1 className="text-3xl font-bold mb-2">{t("console_title")}</h1>
      <p className="text-muted-foreground mb-6">{t("console_subtitle")}</p>

      <div className="grid lg:grid-cols-[200px_1fr] gap-4">
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="font-mono text-xs text-muted-foreground mb-2">{t("console_examples")}</p>
          <div className="space-y-1">
            {codeExamples.map(ex => (
              <button key={ex.id} onClick={() => loadExample(ex.id)}
                className="w-full text-left px-2 py-1.5 rounded text-xs text-secondary-foreground hover:bg-secondary transition-colors">
                {t(exampleTitleKeys[ex.id] || ex.id)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
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
              <button onClick={() => { setCode(defaultCode[language]); setOutput(''); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                <RotateCcw size={12} /> {t("console_reset")}
              </button>
              <button onClick={runCode} disabled={running}
                className="flex items-center gap-1 px-4 py-1.5 rounded-md text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium">
                <Play size={12} /> {running ? t("console_running") : t("console_run")}
              </button>
            </div>
          </div>

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

          <div className="bg-muted border border-border rounded-lg">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="font-mono text-xs text-muted-foreground">{t("console_output")}</span>
            </div>
            <pre className="p-4 font-mono text-xs text-foreground min-h-[80px] whitespace-pre-wrap">
              {output || t("console_placeholder")}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
