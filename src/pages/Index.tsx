import { Link } from "react-router-dom";
import { ArrowRight, Grid3X3, Gamepad2, Terminal, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Index() {
  const { t } = useI18n();

  const sections = [
    { to: "/vectors", icon: ArrowRight, titleKey: "home_sec_vectors", descKey: "home_sec_vectors_desc" },
    { to: "/matrices", icon: Grid3X3, titleKey: "home_sec_matrices", descKey: "home_sec_matrices_desc" },
    { to: "/playground", icon: Gamepad2, titleKey: "home_sec_playground", descKey: "home_sec_playground_desc" },
    { to: "/console", icon: Terminal, titleKey: "home_sec_console", descKey: "home_sec_console_desc" },
    { to: "/examples", icon: BookOpen, titleKey: "home_sec_examples", descKey: "home_sec_examples_desc" },
  ];

  const whyItems = [t("home_game_dev"), t("home_3d"), t("home_ml"), t("home_ds")];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="grid-bg rounded-lg border border-border p-8 mb-10">
          <p className="font-mono text-xs text-primary mb-3">{t("home_comment")}</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home_title_1")}<br />
            <span className="text-primary glow-text">{t("home_title_2")}</span>
          </h1>
          <p className="text-muted-foreground max-w-lg leading-relaxed">{t("home_desc")}</p>
        </div>
      </motion.div>

      <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">{t("home_explore")}</h2>
      <div className="grid gap-3">
        {sections.map(({ to, icon: Icon, titleKey, descKey }, i) => (
          <motion.div key={to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
            <Link to={to} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-secondary/50 transition-all group">
              <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">{t(titleKey)}</h3>
                <p className="text-xs text-muted-foreground">{t(descKey)}</p>
              </div>
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 p-4 rounded-lg border border-border bg-card">
        <p className="font-mono text-xs text-muted-foreground mb-2">{t("home_why")}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {whyItems.map(item => (
            <div key={item} className="bg-secondary rounded-md px-3 py-2 text-center text-secondary-foreground">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
