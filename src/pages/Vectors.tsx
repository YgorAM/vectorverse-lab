import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.section initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
    <h2 className="text-xl font-bold mb-3 text-foreground">{title}</h2>
    {children}
  </motion.section>
);

const CodeBlock = ({ code }: { code: string }) => (
  <pre className="bg-muted rounded-md p-4 font-mono text-xs overflow-x-auto border border-border mb-4">
    <code>{code}</code>
  </pre>
);

const VectorDiagram = ({ label, values, color }: { label: string; values: number[]; color: string }) => (
  <div className={`inline-flex items-center gap-1 font-mono text-sm mr-4 mb-2`}>
    <span className="text-muted-foreground">{label} =</span>
    <span className={color}>[{values.join(", ")}]</span>
  </div>
);

export default function Vectors() {
  const { t } = useI18n();

  return (
    <div>
      <p className="font-mono text-xs text-primary mb-2">{t("vec_comment")}</p>
      <h1 className="text-3xl font-bold mb-2">{t("vec_title")}</h1>
      <p className="text-muted-foreground mb-8">{t("vec_subtitle")}</p>

      <Section title={t("vec_what_title")}>
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t("vec_what_desc") }} />
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <p className="text-xs text-muted-foreground mb-3">{t("vec_2d3d")}</p>
          <VectorDiagram label="v₂" values={[3, 5]} color="text-primary" />
          <VectorDiagram label="v₃" values={[1, 4, 2]} color="text-accent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs font-mono text-primary mb-1">{t("vec_gamedev_comment")}</p>
            <p className="text-xs text-muted-foreground">{t("vec_gamedev")} <span className="text-foreground font-mono">[x, y, z]</span></p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs font-mono text-primary mb-1">{t("vec_ml_comment")}</p>
            <p className="text-xs text-muted-foreground">{t("vec_ml")} <span className="text-foreground font-mono">[height, weight, age]</span></p>
          </div>
        </div>
      </Section>

      <Section title={t("vec_add_title")}>
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4">{t("vec_add_desc")}</p>
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <div className="font-mono text-sm space-y-1">
            <p><span className="text-muted-foreground">A</span> <span className="text-primary">= [3, 5, 2]</span></p>
            <p><span className="text-muted-foreground">B</span> <span className="text-accent">= [1, 4, 6]</span></p>
            <div className="border-t border-border my-2" />
            <p><span className="text-muted-foreground">A + B</span> <span className="text-success">= [4, 9, 8]</span></p>
          </div>
        </div>
        <CodeBlock code={`// component-wise addition\nconst add = (a, b) => a.map((v, i) => v + b[i]);\nadd([3, 5, 2], [1, 4, 6]); // [4, 9, 8]`} />
      </Section>

      <Section title={t("vec_scalar_title")}>
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4">{t("vec_scalar_desc")}</p>
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <div className="font-mono text-sm space-y-1">
            <p><span className="text-muted-foreground">v</span> <span className="text-primary">= [2, 3]</span></p>
            <p><span className="text-muted-foreground">scalar</span> <span className="text-warning">= 3</span></p>
            <div className="border-t border-border my-2" />
            <p><span className="text-muted-foreground">3 × v</span> <span className="text-success">= [6, 9]</span></p>
          </div>
        </div>
        <CodeBlock code={`const scale = (v, s) => v.map(x => x * s);\nscale([2, 3], 3); // [6, 9]`} />
      </Section>

      <Section title={t("vec_dot_title")}>
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t("vec_dot_desc") }} />
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <div className="font-mono text-sm space-y-1">
            <p><span className="text-muted-foreground">A</span> <span className="text-primary">= [2, 3, 5]</span></p>
            <p><span className="text-muted-foreground">B</span> <span className="text-accent">= [4, 1, 2]</span></p>
            <div className="border-t border-border my-2" />
            <p className="text-xs text-muted-foreground">2×4 + 3×1 + 5×2</p>
            <p><span className="text-muted-foreground">A · B</span> <span className="text-success">= 21</span></p>
          </div>
        </div>
        <CodeBlock code={`const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);\ndot([2, 3, 5], [4, 1, 2]); // 21`} />
        <div className="bg-secondary/50 border border-border rounded-md p-3">
          <p className="text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: t("vec_dot_usecase") }} />
        </div>
      </Section>
    </div>
  );
}
