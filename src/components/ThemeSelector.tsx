import { useTheme, type Theme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { Palette } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const themes: { id: Theme; labelKey: string; preview: string }[] = [
  { id: "default-dark", labelKey: "theme_default", preview: "bg-[hsl(220,20%,7%)]" },
  { id: "midnight-blue", labelKey: "theme_midnight", preview: "bg-[hsl(225,40%,8%)]" },
  { id: "purple-matrix", labelKey: "theme_purple", preview: "bg-[hsl(270,30%,8%)]" },
  { id: "light", labelKey: "theme_light", preview: "bg-[hsl(210,20%,96%)]" },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = themes.find((t) => t.id === theme)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <Palette size={13} />
        <span>{t(current.labelKey)}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden min-w-[170px]">
          {themes.map((th) => (
            <button
              key={th.id}
              onClick={() => { setTheme(th.id); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 transition-colors ${
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
