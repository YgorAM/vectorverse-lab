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

const MatrixDisplay = ({ label, values, color }: { label: string; values: number[][]; color: string }) => (
  <div className="mb-3">
    <span className="text-xs text-muted-foreground font-mono">{label} =</span>
    <div className={`inline-block ml-2 font-mono text-sm ${color}`}>
      [{values.map((row, i) => (
        <span key={i}>{i > 0 && " "} [{row.join(", ")}]{i < values.length - 1 && ","}</span>
      ))}]
    </div>
  </div>
);

export default function Matrices() {
  const { t } = useI18n();

  return (
    <div>
      <p className="font-mono text-xs text-primary mb-2">{t("mat_comment")}</p>
      <h1 className="text-3xl font-bold mb-2">{t("mat_title")}</h1>
      <p className="text-muted-foreground mb-8">{t("mat_subtitle")}</p>

      <Section title={t("mat_what_title")}>
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t("mat_what_desc") }} />
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <p className="text-xs text-muted-foreground mb-2">{t("mat_what_example")}</p>
          <div className="font-mono text-sm text-primary">
            <div>⎡ 1  2  3 ⎤</div>
            <div>⎣ 4  5  6 ⎦</div>
          </div>
        </div>
        <CodeBlock code={`// In code, a matrix is an array of arrays\nconst matrix = [[1, 2, 3], [4, 5, 6]]; // 2×3`} />
      </Section>

      <Section title={t("mat_add_title")}>
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4">{t("mat_add_desc")}</p>
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <MatrixDisplay label="A" values={[[1, 2], [3, 4]]} color="text-primary" />
          <MatrixDisplay label="B" values={[[5, 6], [7, 8]]} color="text-accent" />
          <div className="border-t border-border my-2" />
          <MatrixDisplay label="A+B" values={[[6, 8], [10, 12]]} color="text-success" />
        </div>
        <CodeBlock code={`const addMatrices = (a, b) =>\n  a.map((row, i) => row.map((v, j) => v + b[i][j]));`} />
      </Section>

      <Section title={t("mat_mul_title")}>
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t("mat_mul_desc") }} />
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <MatrixDisplay label="A" values={[[1, 2], [3, 4]]} color="text-primary" />
          <MatrixDisplay label="B" values={[[5, 6], [7, 8]]} color="text-accent" />
          <div className="border-t border-border my-2" />
          <p className="text-xs text-muted-foreground font-mono mb-1">
            [0][0] = 1×5 + 2×7 = 19, [0][1] = 1×6 + 2×8 = 22
          </p>
          <p className="text-xs text-muted-foreground font-mono mb-2">
            [1][0] = 3×5 + 4×7 = 43, [1][1] = 3×6 + 4×8 = 50
          </p>
          <MatrixDisplay label="A×B" values={[[19, 22], [43, 50]]} color="text-success" />
        </div>
        <div className="bg-secondary/50 border border-border rounded-md p-3 mb-4">
          <p className="text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: t("mat_mul_order") }} />
        </div>
      </Section>

      <Section title={t("mat_identity_title")}>
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t("mat_identity_desc") }} />
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <div className="font-mono text-sm text-primary">
            <div>⎡ <span className="text-success">1</span>  0  0 ⎤</div>
            <div>⎢ 0  <span className="text-success">1</span>  0 ⎥</div>
            <div>⎣ 0  0  <span className="text-success">1</span> ⎦</div>
          </div>
        </div>
        <CodeBlock code={`const identity = (n) =>\n  Array.from({ length: n }, (_, i) =>\n    Array.from({ length: n }, (_, j) => i === j ? 1 : 0)\n  );\n\nidentity(3); // [[1,0,0],[0,1,0],[0,0,1]]`} />
      </Section>

      <Section title={t("mat_det_title")}>
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t("mat_det_desc") }} />
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <div className="font-mono text-sm mb-3">
            <span className="text-muted-foreground">{t("mat_det_for")}</span> <span className="text-primary">[[a, b], [c, d]]</span>
          </div>
          <div className="font-mono text-sm">
            <span className="text-muted-foreground">det =</span> <span className="text-success">a×d - b×c</span>
          </div>
          <div className="border-t border-border my-3" />
          <div className="font-mono text-sm">
            <p className="text-muted-foreground">Example: [[3, 7], [1, 5]]</p>
            <p><span className="text-muted-foreground">det =</span> 3×5 - 7×1 = <span className="text-success">8</span></p>
          </div>
        </div>
        <CodeBlock code={`const det2x2 = (m) => m[0][0] * m[1][1] - m[0][1] * m[1][0];\ndet2x2([[3, 7], [1, 5]]); // 8`} />
      </Section>
    </div>
  );
}
