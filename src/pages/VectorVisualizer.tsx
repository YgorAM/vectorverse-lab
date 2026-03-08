import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const GRID_SIZE = 320;
const SCALE = 32;
const ORIGIN = GRID_SIZE / 2;

// High-contrast vector colors that work on all backgrounds
const V1_COLOR = "#00D4FF"; // bright cyan
const V2_COLOR = "#A855F7"; // vivid purple
const RES_COLOR = "#22C55E"; // bright green

function toCanvas(x: number, y: number): [number, number] {
  return [ORIGIN + x * SCALE, ORIGIN - y * SCALE];
}

function Arrow({ from, to, color, label, animate = false, thick = false }: { from: [number, number]; to: [number, number]; color: string; label: string; animate?: boolean; thick?: boolean }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return null;
  const ux = dx / len;
  const uy = dy / len;
  const headLen = thick ? 12 : 10;
  const tipX = to[0];
  const tipY = to[1];
  const leftX = tipX - headLen * ux + headLen * 0.45 * uy;
  const leftY = tipY - headLen * uy - headLen * 0.45 * ux;
  const rightX = tipX - headLen * ux - headLen * 0.45 * uy;
  const rightY = tipY - headLen * uy + headLen * 0.45 * ux;

  const strokeW = thick ? 3.5 : 3;
  const labelOffset = 16;

  const content = (
    <g>
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth={strokeW} strokeLinecap="round" />
      <polygon points={`${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`} fill={color} />
      {/* Label with background for readability */}
      <rect
        x={to[0] + ux * labelOffset - 16}
        y={to[1] + uy * labelOffset - 8}
        width={32}
        height={16}
        rx={3}
        fill="hsl(var(--background) / 0.8)"
      />
      <text x={to[0] + ux * labelOffset} y={to[1] + uy * labelOffset + 1} fill={color} fontSize={12} fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
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
  const { theme } = useTheme();
  const [v1, setV1] = useState({ x: 2, y: 3 });
  const [v2, setV2] = useState({ x: 1, y: 2 });
  const [showResultant, setShowResultant] = useState(false);

  const isLight = theme === "light" || theme === "notion";
  const resultant = { x: v1.x + v2.x, y: v1.y + v2.y };

  const handleShowResultant = useCallback(() => {
    setShowResultant(false);
    setTimeout(() => setShowResultant(true), 50);
  }, []);

  const gridLines = useMemo(() => {
    const lines: JSX.Element[] = [];
    const range = Math.floor(GRID_SIZE / SCALE / 2);
    const gridColor = isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.1)";
    const labelColor = isLight ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.5)";

    for (let i = -range; i <= range; i++) {
      const [gx] = toCanvas(i, 0);
      const [, gy] = toCanvas(0, i);
      if (i !== 0) {
        lines.push(
          <line key={`vl-${i}`} x1={gx} y1={0} x2={gx} y2={GRID_SIZE} stroke={gridColor} strokeWidth={0.5} />,
          <line key={`hl-${i}`} x1={0} y1={gy} x2={GRID_SIZE} y2={gy} stroke={gridColor} strokeWidth={0.5} />
        );
        lines.push(
          <text key={`xl-${i}`} x={gx} y={ORIGIN + 14} fontSize={9} fill={labelColor} textAnchor="middle">{i}</text>,
          <text key={`yl-${i}`} x={ORIGIN - 12} y={gy + 3} fontSize={9} fill={labelColor} textAnchor="middle">{i}</text>
        );
      }
    }
    return lines;
  }, [isLight]);

  const axisColor = isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.35)";
  const axisLabelColor = isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)";
  const dashColor = isLight ? "rgba(100,100,100,0.4)" : "rgba(255,255,255,0.3)";

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
                <p className="text-sm font-semibold mb-2" style={{ color: V1_COLOR }}>v1 = ({v1.x}, {v1.y})</p>
                <div className="flex gap-3">
                  <NumInput label="x" value={v1.x} onChange={x => setV1(p => ({ ...p, x }))} />
                  <NumInput label="y" value={v1.y} onChange={y => setV1(p => ({ ...p, y }))} />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: V2_COLOR }}>v2 = ({v2.x}, {v2.y})</p>
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
              className="bg-card border border-border rounded-lg p-5"
              style={{ borderColor: RES_COLOR + "44" }}
            >
              <h3 className="font-mono text-xs mb-2" style={{ color: RES_COLOR }}>// {t("vizr_resultant")}</h3>
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
            <line x1={0} y1={ORIGIN} x2={GRID_SIZE} y2={ORIGIN} stroke={axisColor} strokeWidth={1.5} />
            <line x1={ORIGIN} y1={0} x2={ORIGIN} y2={GRID_SIZE} stroke={axisColor} strokeWidth={1.5} />
            <text x={GRID_SIZE - 8} y={ORIGIN - 8} fontSize={12} fill={axisLabelColor} fontWeight="bold">x</text>
            <text x={ORIGIN + 10} y={14} fontSize={12} fill={axisLabelColor} fontWeight="bold">y</text>

            <Arrow from={origin} to={v1End} color={V1_COLOR} label="v1" />
            <Arrow from={origin} to={v2End} color={V2_COLOR} label="v2" />

            <AnimatePresence>
              {showResultant && (
                <>
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 0.4 }}
                    x1={v1End[0]} y1={v1End[1]} x2={resEnd[0]} y2={resEnd[1]}
                    stroke={dashColor} strokeWidth={1.5} strokeDasharray="5 4"
                  />
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 0.4 }}
                    x1={v2End[0]} y1={v2End[1]} x2={resEnd[0]} y2={resEnd[1]}
                    stroke={dashColor} strokeWidth={1.5} strokeDasharray="5 4"
                  />
                  <Arrow from={origin} to={resEnd} color={RES_COLOR} label="v1+v2" animate thick />
                </>
              )}
            </AnimatePresence>
          </svg>
        </div>
      </div>
    </div>
  );
}