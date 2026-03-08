import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-secondary rounded-md p-4 text-sm font-mono text-foreground overflow-x-auto border border-border">
    {children}
  </pre>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-10"
  >
    <h2 className="text-xl font-bold mb-3 text-primary">{title}</h2>
    {children}
  </motion.section>
);

export default function Fundamentals() {
  const { t, td } = useI18n();

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-mono text-xs text-primary mb-2">{t("fund_comment")}</p>
        <h1 className="text-3xl font-bold mb-2">{t("fund_title")}</h1>
        <p className="text-muted-foreground mb-8">{t("fund_subtitle")}</p>
      </motion.div>

      {/* What is an Index */}
      <Section title={t("fund_index_title")}>
        <p className="text-muted-foreground mb-4">{t("fund_index_desc")}</p>
        <div className="bg-card border border-border rounded-lg p-4 mb-4">
          <p className="font-mono text-sm text-muted-foreground mb-2">vector = [10, 20, 30]</p>
          <div className="flex gap-2 mt-3">
            {[10, 20, 30].map((val, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-md bg-secondary border border-border flex items-center justify-center font-mono text-lg text-foreground font-bold">
                  {val}
                </div>
                <span className="font-mono text-xs text-primary mt-1">[{i}]</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{t("fund_index_note")}</p>
      </Section>

      {/* What is a Vector */}
      <Section title={t("fund_vector_title")}>
        <p className="text-muted-foreground mb-4">{t("fund_vector_desc")}</p>
        <div className="space-y-3">
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-1">JavaScript</p>
            <CodeBlock>{"let v = [1, 2, 3];"}</CodeBlock>
          </div>
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-1">Python</p>
            <CodeBlock>{"v = [1, 2, 3]"}</CodeBlock>
          </div>
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-1">Java</p>
            <CodeBlock>{"int[] v = {1, 2, 3};"}</CodeBlock>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {[1, 2, 3].map((val, i) => (
            <div key={i} className="w-14 h-14 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center font-mono text-lg text-primary font-bold">
              {val}
            </div>
          ))}
        </div>
      </Section>

      {/* Accessing Elements */}
      <Section title={t("fund_access_title")}>
        <p className="text-muted-foreground mb-4">{t("fund_access_desc")}</p>
        <CodeBlock>{`v = [10, 20, 30]\nv[0]  → 10\nv[1]  → 20\nv[2]  → 30`}</CodeBlock>
        <div className="mt-4 bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">{td("fund_access_try")}</p>
          <div className="flex gap-2">
            {[10, 20, 30].map((val, i) => (
              <div key={i} className="group relative">
                <div className="w-14 h-14 rounded-md bg-secondary border border-border flex items-center justify-center font-mono text-lg text-foreground font-bold hover:border-primary hover:bg-primary/10 transition-colors cursor-pointer">
                  {val}
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  v[{i}] = {val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What is a Matrix */}
      <Section title={t("fund_matrix_title")}>
        <p className="text-muted-foreground mb-4">{t("fund_matrix_desc")}</p>
        <div className="bg-card border border-border rounded-lg p-4 mb-4">
          <div className="inline-grid grid-cols-2 gap-2">
            {[[1, 2], [3, 4]].map((row, r) =>
              row.map((val, c) => (
                <div key={`${r}-${c}`} className="w-14 h-14 rounded-md bg-secondary border border-border flex items-center justify-center font-mono text-lg text-foreground font-bold">
                  {val}
                </div>
              ))
            )}
          </div>
          <div className="mt-3 flex gap-4 text-xs font-mono text-muted-foreground">
            <span>{t("fund_matrix_row")} 0: [1, 2]</span>
            <span>{t("fund_matrix_row")} 1: [3, 4]</span>
          </div>
          <div className="mt-1 flex gap-4 text-xs font-mono text-muted-foreground">
            <span>{t("fund_matrix_col")} 0: [1, 3]</span>
            <span>{t("fund_matrix_col")} 1: [2, 4]</span>
          </div>
        </div>
      </Section>

      {/* Accessing Matrix Elements */}
      <Section title={t("fund_matrix_access_title")}>
        <p className="text-muted-foreground mb-4">{t("fund_matrix_access_desc")}</p>
        <CodeBlock>{`matrix = [[1, 2],\n          [3, 4]]\n\nmatrix[0][0] → 1\nmatrix[0][1] → 2\nmatrix[1][0] → 3\nmatrix[1][1] → 4`}</CodeBlock>
        <div className="mt-4 bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">{t("fund_matrix_access_try")}</p>
          <div className="inline-grid grid-cols-2 gap-2">
            {[[1, 2], [3, 4]].map((row, r) =>
              row.map((val, c) => (
                <div key={`${r}-${c}`} className="group relative">
                  <div className="w-14 h-14 rounded-md bg-secondary border border-border flex items-center justify-center font-mono text-lg text-foreground font-bold hover:border-primary hover:bg-primary/10 transition-colors cursor-pointer">
                    {val}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    [{r}][{c}] = {val}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
