import { useI18n, type Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const languages: { id: Locale; label: string; flag: string }[] = [
  { id: "en", label: "English", flag: "🇺🇸" },
  { id: "pt-BR", label: "Português (BR)", flag: "🇧🇷" },
];

export default function LanguageSelector() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = languages.find(l => l.id === locale)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <Globe size={13} />
        <span>{current.flag} {current.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden min-w-[160px]">
          {languages.map(lang => (
            <button
              key={lang.id}
              onClick={() => { setLocale(lang.id); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors ${
                locale === lang.id ? "bg-secondary text-primary" : "text-secondary-foreground hover:bg-secondary/50"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
