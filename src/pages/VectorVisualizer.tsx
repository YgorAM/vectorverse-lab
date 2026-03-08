import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface Vec2 {
  x: number;
  y: number;
  color: string;
  label: string;
}

const GRID_SIZE = 300;
const SCALE = 30;
const ORIGIN = GRID_SIZE / 2;

function toCanvas(x: number, y: number): [number, number] {
  return [ORIGIN + x * SCALE, ORIGIN - y * SCALE];
}

function Arrow({ from, to, color, label, animate = false }: { from: [number, number]; to: [number, number]; color: string; label: string; animate?: boolean }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return null;
  const ux = dx / len;
  const uy = dy / len;
  const headLen = 8;
  const tipX = to[0];
  const tipY = to[1];
  const leftX = tipX - headLen * ux + headLen * 0.4 * uy;
  const leftY = tipY - headLen * uy - headLen * 0.4 * ux;
  const rightX = tipX - headLen * ux - headLen * 0.4 * uy;
  const rightY = tipY - headLen * uy + headLen * 0.4 * ux;

  const content = (
    <g>
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <polygon points={`${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`} fill={color} />
      <text x={to[0] + ux * 12} y={to[1] + uy * 12} fill={color} fontSize={12} fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
        {label}
      </text>
    </g>
  );

  if (animate) {
    return (
      <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        {content}
      </motion.g>
    );
  }
  return content;
}

export default function VectorVisualizer() {
  const { t } = useI18n();
  const [v1, setV1] = useState({ x: 2, y: 3 });
  const [v2, setV2] = useState({ x: 1, y: 2 });
  const [showResultant, setShowResultant] = useState(false);

  const resultant = { x: v1.x + v2.x, y: v1.y + v2.y };

  const handleShowResultant = useCallback(() => {
    setShowResultant(false);
    setTimeout(() => setShowResultant(true), 50);
  }, []);

  const gridLines = [];
  const range = Math.floor(GRID_SIZE / SCALE / 2);
  for (let i = -range; i <= range; i++) {
    const [gx] = toCanvas(i, 0);
    const [, gy] = toCanvas(0, i);
    gridLines.push(
      <line key={`vl-${i}`} x1={gx} y1={0} x2={gx} y2={GRID_SIZE} stroke="hsl(var(--border))" strokeWidth={i === 0 ? 0 : 0.5} opacity={0.4} />,
      <line key={`hl-${i}`} x1={0} y1={gy} x2={GRID_SIZE} y2={gy} stroke="hsl(var(--border))" strokeWidth={i === 0 ? 0 : 0.5} opacity={0.4} />
    );
    if (i !== 0) {
      gridLines.push(
        <text key={`xl-${i}`} x={gx} y={ORIGIN + 14} fontSize={9} fill="hsl(var(--muted-foreground))" textAnchor="middle">{i}</text>,
        <text key={`yl-${i}`} x={ORIGIN - 12} y={gy + 3} fontSize={9} fill="hsl(var(--muted-foreground))" textAnchor="middle">{i}</text>
      );
    }
  }

  const origin: [number, number] = [ORIGIN, ORIGIN];
  const v1End = toCanvas(v1.x, v1.y);
  const v2End = toCanvas(v2.x, v2.y);
  const resEnd = toCanvas(resultant.x, resultant.y);

  const NumInput = ({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) => (
    <div className="flex items-center gap-2">
      <label className="text-xs font-mono text-muted-foreground w-4">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => { onChange(Number(e.target.value) || 0); setShowResultant(false); }}
        className="w-16 bg-muted border border-border rounded px-2 py-1.5 text-sm font-mono text-foreground focus:border-primary focus:outline-none"
      />
    </div>
  );

  return (
    <div>
      <p className="font-mono text-xs text-primary mb-2">{t("vizr_comment")}</p>
      <h1 className="text-3xl font-bold mb-2">{t("vizr_title")}</h1>
      <p className="text-muted-foreground mb-6">{t("vizr_subtitle")}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-mono text-xs text-muted-foreground mb-3">// {t("vizr_input")}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "hsl(var(--chart-1))" }}>v1 = ({v1.x}, {v1.y})</p>
                <div className="flex gap-3">
                  <NumInput label="x" value={v1.x} onChange={x => setV1(p => ({ ...p, x }))} />
                  <NumInput label="y" value={v1.y} onChange={y => setV1(p => ({ ...p, y }))} />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "hsl(var(--chart-2))" }}>v2 = ({v2.x}, {v2.y})</p>
                <div className="flex gap-3">
                  <NumInput label="x" value={v2.x} onChange={x => setV2(p => ({ ...p, x }))} />
                  <NumInput label="y" value={v2.y} onChange={y => setV2(p => ({ ...p, y }))} />
                </div>
              </div>
            </div>
            <button
              onClick={handleShowResultant}
              className="mt-4 w-full px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t("vizr_show_resultant")}
            </button>
          </div>

          {showResultant && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-primary/30 rounded-lg p-5"
            >
              <h3 className="font-mono text-xs text-primary mb-2">// {t("vizr_resultant")}</h3>
              <p className="font-mono text-lg text-foreground">
                v1 + v2 = ({resultant.x}, {resultant.y})
              </p>
            </motion.div>
          )}
        </div>

        {/* Graph */}
        <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-center">
          <svg width={GRID_SIZE} height={GRID_SIZE} className="overflow-visible">
            {gridLines}
            {/* Axes */}
            <line x1={0} y1={ORIGIN} x2={GRID_SIZE} y2={ORIGIN} stroke="hsl(var(--muted-foreground))" strokeWidth={1} opacity={0.6} />
            <line x1={ORIGIN} y1={0} x2={ORIGIN} y2={GRID_SIZE} stroke="hsl(var(--muted-foreground))" strokeWidth={1} opacity={0.6} />
            <text x={GRID_SIZE - 8} y={ORIGIN - 6} fontSize={11} fill="hsl(var(--muted-foreground))" fontWeight="bold">x</text>
            <text x={ORIGIN + 8} y={12} fontSize={11} fill="hsl(var(--muted-foreground))" fontWeight="bold">y</text>

            <Arrow from={origin} to={v1End} color="hsl(var(--chart-1))" label="v1" />
            <Arrow from={origin} to={v2End} color="hsl(var(--chart-2))" label="v2" />

            <AnimatePresence>
              {showResultant && (
                <>
                  {/* Dashed parallelogram guides */}
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 0.4 }}
                    x1={v1End[0]} y1={v1End[1]} x2={resEnd[0]} y2={resEnd[1]}
                    stroke="hsl(var(--chart-5))" strokeWidth={1} strokeDasharray="4 3"
                  />
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 0.4 }}
                    x1={v2End[0]} y1={v2End[1]} x2={resEnd[0]} y2={resEnd[1]}
                    stroke="hsl(var(--chart-5))" strokeWidth={1} strokeDasharray="4 3"
                  />
                  <Arrow from={origin} to={resEnd} color="hsl(var(--chart-5))" label="v1+v2" animate />
                </>
              )}
            </AnimatePresence>
          </svg>
        </div>
      </div>
    </div>
  );
}
