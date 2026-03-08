import { useState } from "react";
import { motion } from "framer-motion";

type Operation = 'vec-add' | 'vec-dot' | 'vec-scalar' | 'mat-add' | 'mat-mul';

const ops: { id: Operation; label: string; cat: string }[] = [
  { id: 'vec-add', label: 'Addition', cat: 'Vectors' },
  { id: 'vec-dot', label: 'Dot Product', cat: 'Vectors' },
  { id: 'vec-scalar', label: 'Scalar ×', cat: 'Vectors' },
  { id: 'mat-add', label: 'Addition', cat: 'Matrices' },
  { id: 'mat-mul', label: 'Multiply', cat: 'Matrices' },
];

export default function Playground() {
  const [op, setOp] = useState<Operation>('vec-add');
  const [vecA, setVecA] = useState([3, 5, 2]);
  const [vecB, setVecB] = useState([1, 4, 6]);
  const [scalar, setScalar] = useState(3);
  const [matA, setMatA] = useState([[1, 2], [3, 4]]);
  const [matB, setMatB] = useState([[5, 6], [7, 8]]);

  const compute = () => {
    switch (op) {
      case 'vec-add': return vecA.map((v, i) => v + vecB[i]);
      case 'vec-dot': return vecA.reduce((s, v, i) => s + v * vecB[i], 0);
      case 'vec-scalar': return vecA.map(v => v * scalar);
      case 'mat-add': return matA.map((r, i) => r.map((v, j) => v + matB[i][j]));
      case 'mat-mul': {
        const result = [[0, 0], [0, 0]];
        for (let i = 0; i < 2; i++)
          for (let j = 0; j < 2; j++)
            for (let k = 0; k < 2; k++)
              result[i][j] += matA[i][k] * matB[k][j];
        return result;
      }
    }
  };

  const result = compute();
  const isVec = op.startsWith('vec');

  const VecInput = ({ label, values, onChange }: { label: string; values: number[]; onChange: (v: number[]) => void }) => (
    <div className="mb-3">
      <label className="text-xs font-mono text-muted-foreground mb-1 block">{label}</label>
      <div className="flex gap-2">
        {values.map((v, i) => (
          <input key={i} type="number" value={v} onChange={e => {
            const next = [...values];
            next[i] = Number(e.target.value) || 0;
            onChange(next);
          }} className="w-16 bg-muted border border-border rounded px-2 py-1.5 text-sm font-mono text-foreground focus:border-primary focus:outline-none" />
        ))}
      </div>
    </div>
  );

  const MatInput = ({ label, values, onChange }: { label: string; values: number[][]; onChange: (m: number[][]) => void }) => (
    <div className="mb-3">
      <label className="text-xs font-mono text-muted-foreground mb-1 block">{label}</label>
      {values.map((row, i) => (
        <div key={i} className="flex gap-2 mb-1">
          {row.map((v, j) => (
            <input key={j} type="number" value={v} onChange={e => {
              const next = values.map(r => [...r]);
              next[i][j] = Number(e.target.value) || 0;
              onChange(next);
            }} className="w-16 bg-muted border border-border rounded px-2 py-1.5 text-sm font-mono text-foreground focus:border-primary focus:outline-none" />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <p className="font-mono text-xs text-primary mb-2">// playground</p>
      <h1 className="text-3xl font-bold mb-2">Interactive Playground</h1>
      <p className="text-muted-foreground mb-6">Modify values and see results instantly.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {ops.map(o => (
          <button key={o.id} onClick={() => setOp(o.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
              op === o.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}>
            {o.cat}: {o.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-mono text-xs text-muted-foreground mb-3">// input</h3>
          {isVec ? (
            <>
              <VecInput label="Vector A" values={vecA} onChange={setVecA} />
              {op === 'vec-scalar' ? (
                <div className="mb-3">
                  <label className="text-xs font-mono text-muted-foreground mb-1 block">Scalar</label>
                  <input type="number" value={scalar} onChange={e => setScalar(Number(e.target.value) || 0)}
                    className="w-16 bg-muted border border-border rounded px-2 py-1.5 text-sm font-mono text-foreground focus:border-primary focus:outline-none" />
                </div>
              ) : (
                <VecInput label="Vector B" values={vecB} onChange={setVecB} />
              )}
            </>
          ) : (
            <>
              <MatInput label="Matrix A" values={matA} onChange={setMatA} />
              <MatInput label="Matrix B" values={matB} onChange={setMatB} />
            </>
          )}
        </div>

        <motion.div key={JSON.stringify(result)} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-primary/30 rounded-lg p-5 glow-primary">
          <h3 className="font-mono text-xs text-primary mb-3">// result</h3>
          <pre className="font-mono text-lg text-foreground">
            {typeof result === 'number' ? result : JSON.stringify(result, null, 2)}
          </pre>
        </motion.div>
      </div>
    </div>
  );
}
