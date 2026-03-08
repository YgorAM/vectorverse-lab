import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, ArrowRight, Grid3X3, Gamepad2, Terminal, BookOpen, Menu, X, GraduationCap, Trophy, Sparkles, Info, Eye, Calculator, Lightbulb } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { AnimatePresence, motion } from "framer-motion";

const navGroups = [
  {
    labelKey: "nav_group_learn",
    items: [
      { to: "/", labelKey: "nav_home", icon: Home },
      { to: "/fundamentals", labelKey: "nav_fundamentals", icon: GraduationCap },
      { to: "/vectors", labelKey: "nav_vectors", icon: ArrowRight },
      { to: "/matrices", labelKey: "nav_matrices", icon: Grid3X3 },
      { to: "/examples", labelKey: "nav_examples", icon: BookOpen },
      { to: "/playground", labelKey: "nav_playground", icon: Gamepad2 },
      { to: "/console", labelKey: "nav_console", icon: Terminal },
    ],
  },
  {
    labelKey: "nav_group_practice",
    items: [
      { to: "/practice", labelKey: "nav_practice", icon: Trophy },
      { to: "/minigame", labelKey: "nav_minigame", icon: Sparkles },
    ],
  },
  {
    labelKey: "nav_group_info",
    items: [
      { to: "/about", labelKey: "nav_about", icon: Info },
    ],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen">
      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 py-3 lg:hidden">
        <span className="font-mono text-sm font-bold text-primary flex items-center gap-1.5">▦ <span className="text-foreground">Matrix Academy</span></span>
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <LanguageSelector />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-muted-foreground">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-sidebar flex flex-col
        transition-transform duration-200
        lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:shrink-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="font-mono text-lg font-bold text-primary flex items-center gap-2">▦ <span className="text-foreground">Matrix Academy</span></span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{t("nav_subtitle")}</p>
          <div className="mt-3 hidden lg:flex gap-2 flex-wrap">
            <LanguageSelector />
            <ThemeSelector />
          </div>
        </div>
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.labelKey} className="mb-4">
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                {t(group.labelKey)}
              </p>
              <div className="space-y-0.5">
                {group.items.map(({ to, labelKey, icon: Icon }) => {
                  const isActive = location.pathname === to;
                  return (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={`group relative flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150 ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
                      )}
                      <Icon size={15} className={`shrink-0 transition-transform duration-150 group-hover:scale-110 ${isActive ? "text-primary" : ""}`} />
                      <span>{t(labelKey)}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-border space-y-1">
          <p className="text-xs text-muted-foreground">{t("nav_footer")}</p>
          <p className="text-xs text-muted-foreground/70">{t("about_built_by")}</p>
        </div>
      </aside>

      {/* Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-background/80 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main content with page transition */}
      <main className="flex-1 lg:ml-0 mt-14 lg:mt-0 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-6 py-10"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
