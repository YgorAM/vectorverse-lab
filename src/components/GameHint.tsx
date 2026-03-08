import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Props {
  challengeIndex: number;
  questionType: string;
}

const HINT_LIMIT = 3;

export function GameHint({ challengeIndex, questionType }: Props) {
  const { t } = useI18n();

  if (challengeIndex >= HINT_LIMIT) return null;

  const hintKey = questionType.includes("Addition") || questionType.includes("Adição")
    ? "hint_vec_add"
    : questionType.includes("Scalar") || questionType.includes("Escalar")
    ? "hint_scalar"
    : "hint_general";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-start gap-2 p-3 rounded-lg border border-primary/20 bg-primary/5 mb-4"
    >
      <Lightbulb className="text-primary mt-0.5 shrink-0" size={16} />
      <p className="text-xs text-muted-foreground">{t(hintKey)}</p>
    </motion.div>
  );
}
