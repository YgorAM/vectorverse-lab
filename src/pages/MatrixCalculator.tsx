import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type Size = 2 | 3;
type Op = "add" | "sub" | "mul" | "scalar";

const makeMatrix = (size: Size, fill: number[][] | null = null): number[][] =>
  Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => fill?.[i]?.[j] ?? 0));

const DEFAULT_A: Record<Size, number[][]> = {
  2: [[1, 2], [3, 4]],
  3: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
};
const DEFAULT_B: Record<Size, number[][]> = {
  2: [[2, 0], [1, 2]],
  3: [[9, 8, 7], [6, 5, 4], [3, 2, 1]],
};

function matAdd(a: number[][], b: number[][]): number[][] {
  return a.map((r, i) => r.map((v, j) => v + b[i][j]));
}
function matSub(a: number[][], b: number[][]): number[][] {
  return a.map((r, i) => r.map((v, j) => v - b[i][j]));
}
function matMul(a: number[][], b: number[][]): number[][] {
  const n = a.length;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) =>
      a[i].reduce((s, v, k) => s + v * b[k][j], 0)
    )
  );
}
function matScalar(a: number[][], s: number): number[][] {
  return a.map(r => r.map(v => v * s));
}

export default function MatrixCalculator() {
  const { t } = useI18n();
  const [size, setSize] = useState<Size>(2);
  const [op, setOp] = useState<Op>("mul");
  const [matA, setMatA] = useState(DEFAULT_A[2]);
  const [matB, setMatB] = useState(DEFAULT_B[2]);
  const [scalar, setScalar] = useState(3);
  const [resultKey, setResultKey] = useState(0);

  const changeSize = (s: Size) => {
    setSize(s);
    setMatA(DEFAULT_A[s]);
    setMatB(DEFAULT_B[s]);
  };

  const compute = (): number[][] => {
    switch (op) {
      case "add": return matAdd(matA, matB);
      case "sub": return matSub(matA, matB);
      case "mul": return matMul(matA, matB);
      case "scalar": return matScalar(matA, scalar);
    }
  };

  const result = compute();

  const opSymbol: Record<Op, string> = { add: "+", sub: "−", mul: "×", scalar: `${scalar} ×` };

  const MatInput = ({ label, mat, onChange }: { label: string; mat: number[][]; onChange: (m: number[][]) => void }) => (
    <div>
      <label className="text-xs font-mono text-muted-foreground mb-1.5 block">{label}</label>
      <div className="inline-flex flex-col gap-1 bg-muted/50 rounded-md p-2 border border-border">
        {mat.map((row, i) => (
          <div key={i} className="flex gap-1">
            {row.map((v, j) => (
              <input
                key={j}
                type="number"
                value={v}
                onChange={e => {
                  const next = mat.map(r => [...r]);
                  next[i][j] = Number(e.target.value) || 0;
                  onChange(next);
                  setResultKey(k => k + 1);
                }}
                className="w-14 bg-background border border-border rounded px-1.5 py-1 text-sm font-mono text-foreground text-center focus:border-primary focus:outline-none"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const MatDisplay = ({ mat }: { mat: number[][] }) => (
    <div className="inline-flex flex-col gap-1">
      {mat.map((row, i) => (
        <div key={i} className="flex gap-2">
          {row.map((v, j) => (
            <span key={j} className="w-14 text-center font-mono text-lg font-semibold text-foreground">{v}</span>
          ))}
        </div>
      ))}
    </div>
  );

  const ops: { id: Op; label: string }[] = [
    { id: "add", label: t("mcalc_add") },
    { id: "sub", label: t("mcalc_sub") },
    { id: "mul", label: t("mcalc_mul") },
    { id: "scalar", label: t("mcalc_scalar") },
  ];

  return (
    <div>
      <p className="font-mono text-xs text-primary mb-2">{t("mcalc_comment")}</p>
      <h1 className="text-3xl font-bold mb-2">{t("mcalc_title")}</h1>
      <p className="text-muted-foreground mb-6">{t("mcalc_subtitle")}</p>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        {([2, 3] as Size[]).map(s => (
          <button key={s} onClick={() => changeSize(s)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${size === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
            {s}×{s}
          </button>
        ))}
        <span className="w-px bg-border mx-1" />
        {ops.map(o => (
          <button key={o.id} onClick={() => setOp(o.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${op === o.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
            {o.label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="bg-card border border-border rounded-lg p-5 mb-4">
        <h3 className="font-mono text-xs text-muted-foreground mb-4">// {t("mcalc_input")}</h3>
        <div className="flex flex-wrap items-start gap-6">
          <MatInput label="Matrix A" mat={matA} onChange={setMatA} />
          {op === "scalar" ? (
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Scalar</label>
              <input
                type="number"
                value={scalar}
                onChange={e => { setScalar(Number(e.target.value) || 0); setResultKey(k => k + 1); }}
                className="w-14 bg-background border border-border rounded px-1.5 py-1 text-sm font-mono text-foreground text-center focus:border-primary focus:outline-none"
              />
            </div>
          ) : (
            <MatInput label="Matrix B" mat={matB} onChange={setMatB} />
          )}
        </div>
      </div>

      {/* Result */}
      <motion.div
        key={resultKey}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-primary/30 rounded-lg p-5"
      >
        <h3 className="font-mono text-xs text-primary mb-3">
          // A {opSymbol[op]} {op === "scalar" ? "" : "B"} =
        </h3>
        <MatDisplay mat={result} />
      </motion.div>
    </div>
  );
}
