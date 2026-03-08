import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { type Language, codeExamples } from "@/lib/codeExamples";
import { useI18n } from "@/lib/i18n";

const exampleKeys: Record<string, { title: string; desc: string }> = {
  'vector-addition': { title: 'ex_vector_addition', desc: 'ex_vector_addition_desc' },
  'dot-product': { title: 'ex_dot_product', desc: 'ex_dot_product_desc' },
  'matrix-multiplication': { title: 'ex_matrix_multiplication', desc: 'ex_matrix_multiplication_desc' },
  'scalar-multiplication': { title: 'ex_scalar_multiplication', desc: 'ex_scalar_multiplication_desc' },
  'matrix-transpose': { title: 'ex_matrix_transpose', desc: 'ex_matrix_transpose_desc' },
};

export default function Examples() {
  const { t } = useI18n();
  const [language, setLanguage] = useState<Language>('javascript');

  return (
    <div>
      <p className="font-mono text-xs text-primary mb-2">{t("ex_comment")}</p>
      <h1 className="text-3xl font-bold mb-2">{t("ex_title")}</h1>
      <p className="text-muted-foreground mb-6">{t("ex_subtitle")}</p>

      <div className="flex gap-1 mb-6">
        {(['javascript', 'python', 'java'] as Language[]).map(lang => (
          <button key={lang} onClick={() => setLanguage(lang)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono capitalize transition-colors ${
              language === lang ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}>
            {lang}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {codeExamples.map((ex, i) => {
          const keys = exampleKeys[ex.id];
          return (
            <motion.div key={ex.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div>
                  <h3 className="text-sm font-medium text-foreground">{keys ? t(keys.title) : ex.title}</h3>
                  <p className="text-xs text-muted-foreground">{keys ? t(keys.desc) : ex.description}</p>
                </div>
                <Link to="/console" className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                  <Terminal size={12} /> {t("ex_try")}
                </Link>
              </div>
              <pre className="p-4 font-mono text-xs overflow-x-auto text-foreground">
                <code>{ex.code[language]}</code>
              </pre>
              <div className="border-t border-border px-4 py-2 bg-muted">
                <span className="font-mono text-xs text-muted-foreground">{t("ex_output")} </span>
                <span className="font-mono text-xs text-success">{ex.output[language].split('\n')[ex.output[language].split('\n').length - 1]}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
