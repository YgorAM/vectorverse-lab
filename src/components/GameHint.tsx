import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

interface Props {
  hints: string[];
  revealedCount: number;
  onRevealNext: () => void;
  disabled: boolean;
}

export function GameHintButton({ hints, revealedCount, onRevealNext, disabled }: Props) {
  const { t } = useI18n();
  const maxHints = hints.length;
  const allRevealed = revealedCount >= maxHints;

  return (
    <div className="mb-4">
      {!disabled && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRevealNext}
          disabled={allRevealed || disabled}
          className="gap-1.5 mb-3 border-primary/30 text-primary hover:bg-primary/10"
        >
          <Lightbulb size={14} />
          {t("game_hint_btn")} ({revealedCount}/{maxHints})
        </Button>
      )}

      <AnimatePresence>
        {hints.slice(0, revealedCount).map((hint, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex items-start gap-2 p-3 rounded-lg border border-primary/20 bg-primary/5 mb-2 shadow-[0_0_12px_-4px_hsl(var(--primary)/0.15)]"
          >
            <Lightbulb className="text-primary mt-0.5 shrink-0" size={14} />
            <p className="text-xs text-muted-foreground">{hint}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
