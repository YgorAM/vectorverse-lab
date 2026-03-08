import { motion } from "framer-motion";

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
  return (
    <div>
      <p className="font-mono text-xs text-primary mb-2">// vectors</p>
      <h1 className="text-3xl font-bold mb-2">Vectors</h1>
      <p className="text-muted-foreground mb-8">Understanding direction and magnitude in code.</p>

      <Section title="What is a Vector?">
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4">
          A vector is an ordered list of numbers that represents a <strong className="text-foreground">direction</strong> and <strong className="text-foreground">magnitude</strong> in space. 
          In programming, vectors are simply arrays of numbers.
        </p>
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <p className="text-xs text-muted-foreground mb-3">2D and 3D vectors:</p>
          <VectorDiagram label="v₂" values={[3, 5]} color="text-primary" />
          <VectorDiagram label="v₃" values={[1, 4, 2]} color="text-accent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs font-mono text-primary mb-1">// game dev</p>
            <p className="text-xs text-muted-foreground">Player position: <span className="text-foreground font-mono">[x, y, z]</span></p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs font-mono text-primary mb-1">// ML</p>
            <p className="text-xs text-muted-foreground">Feature vector: <span className="text-foreground font-mono">[height, weight, age]</span></p>
          </div>
        </div>
      </Section>

      <Section title="Vector Addition">
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4">
          Add vectors by adding corresponding components. Both vectors must have the same dimension.
        </p>
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

      <Section title="Scalar Multiplication">
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4">
          Multiply each component of a vector by a single number (scalar). This scales the vector's magnitude.
        </p>
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

      <Section title="Dot Product">
        <p className="text-sm text-secondary-foreground leading-relaxed mb-4">
          The dot product multiplies corresponding components and sums them. It measures how much two vectors point in the same direction. 
          A result of <strong className="text-foreground">0</strong> means the vectors are perpendicular.
        </p>
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
          <p className="text-xs text-muted-foreground">💡 <strong className="text-foreground">Use case:</strong> In game dev, the dot product checks if an enemy is in front of or behind the player.</p>
        </div>
      </Section>
    </div>
  );
}
