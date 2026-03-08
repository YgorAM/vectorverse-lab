import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Lightbulb, Wrench, Layers, Target } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const stackItems = [
  { name: "Lovable", descKey: "about_stack_lovable" },
  { name: "ChatGPT", descKey: "about_stack_chatgpt" },
  { name: "JavaScript", descKey: "about_stack_js" },
  { name: "CSS", descKey: "about_stack_css" },
];

export default function About() {
  const { t } = useI18n();

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div {...fadeUp()}>
        <div className="grid-bg rounded-lg border border-border p-8">
          <p className="font-mono text-xs text-primary mb-3">{"// about"}</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t("about_page_title")}
          </h1>
          <p className="text-muted-foreground max-w-lg leading-relaxed">
            {t("about_page_subtitle")}
          </p>
        </div>
      </motion.div>

      {/* Section 1 — Why */}
      <motion.section {...fadeUp(0.1)} className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center text-primary">
            <Lightbulb size={18} />
          </div>
          <h2 className="text-xl font-semibold">{t("about_why_title")}</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {t("about_why_text")}
        </p>
      </motion.section>

      {/* Section 2 — How */}
      <motion.section {...fadeUp(0.2)} className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center text-primary">
            <Wrench size={18} />
          </div>
          <h2 className="text-xl font-semibold">{t("about_how_title")}</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {t("about_how_text")}
        </p>
      </motion.section>

      {/* Section 3 — Stack */}
      <motion.section {...fadeUp(0.3)} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center text-primary">
            <Layers size={18} />
          </div>
          <h2 className="text-xl font-semibold">{t("about_stack_title")}</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {stackItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.08 }}
              className="rounded-lg border border-border bg-card p-4"
            >
              <p className="font-medium text-sm text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{t(item.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Section 4 — Goal */}
      <motion.section {...fadeUp(0.4)} className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center text-primary">
            <Target size={18} />
          </div>
          <h2 className="text-xl font-semibold">{t("about_goal_title")}</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {t("about_goal_text")}
        </p>
      </motion.section>
    </div>
  );
}
