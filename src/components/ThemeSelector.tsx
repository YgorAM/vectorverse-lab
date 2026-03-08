import { useTheme, type Theme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { Palette } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

const themes: { id: Theme; labelKey: string; preview: string }[] = [
  { id: "default-dark", labelKey: "theme_default", preview: "bg-[hsl(220,20%,7%)]" },
  { id: "midnight-blue", labelKey: "theme_midnight", preview: "bg-[hsl(225,40%,8%)]" },
  { id: "purple-matrix", labelKey: "theme_purple", preview: "bg-[hsl(270,30%,8%)]" },
  { id: "light", labelKey: "theme_light", preview: "bg-[hsl(210,20%,96%)]" },
  { id: "matrix", labelKey: "theme_matrix", preview: "bg-[hsl(120,10%,4%)]" },
  { id: "github-dark", labelKey: "theme_github", preview: "bg-[hsl(215,15%,10%)]" },
  { id: "notion", labelKey: "theme_notion", preview: "bg-[hsl(40,20%,96%)]" },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggle = useCallback(() => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // dropdown is ~7 items * 36px ≈ 260px
      setOpenUp(spaceBelow < 280);
    }
    setOpen(o => !o);
  }, [open]);

  const current = themes.find((t) => t.id === theme)!;

  return (
    <div ref={ref} className="relative">
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <Palette size={13} />
        <span>{t(current.labelKey)}</span>
      </button>
      {open && (
        <div
          className={`absolute left-0 z-50 bg-card border border-border rounded-md shadow-lg w-[calc(var(--sidebar-w,256px)-24px)] max-w-[232px] ${
            openUp ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {themes.map((th) => (
            <button
              key={th.id}
              onClick={() => { setTheme(th.id); setOpen(false); }}
              className={`w-full text-left px-3 py-2.5 text-xs flex items-center gap-2.5 transition-colors first:rounded-t-md last:rounded-b-md ${
                theme === th.id ? "bg-secondary text-primary" : "text-secondary-foreground hover:bg-secondary/50"
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded-full border border-border shrink-0 ${th.preview}`} />
              <span>{t(th.labelKey)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
