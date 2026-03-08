export type GameDifficulty = 1 | 2 | 3;

export interface Challenge {
  type: string;
  question: string;
  answer: string;
  explanation: string;
  hintKeys: string[];
}

export const MAX_HINTS: Record<GameDifficulty, number> = { 1: 3, 2: 2, 3: 1 };

export const SCORE_BY_HINTS: Record<GameDifficulty, number[]> = {
  1: [30, 25, 18, 13],
  2: [30, 22, 15],
  3: [30, 20],
};

export function getChallenges(difficulty: GameDifficulty, t: (k: string) => string): Challenge[] {
  if (difficulty === 1) {
    return [
      { type: t("game_type_vec_add"), question: "[1, 2] + [3, 4] = ?", answer: "[4, 6]", explanation: "[1+3, 2+4] = [4, 6]", hintKeys: ["l1c0_h1", "l1c0_h2", "l1c0_h3"] },
      { type: t("game_type_vec_add"), question: "[5, 0] + [0, 3] = ?", answer: "[5, 3]", explanation: "[5+0, 0+3] = [5, 3]", hintKeys: ["l1c1_h1", "l1c1_h2", "l1c1_h3"] },
      { type: t("game_type_vec_sub"), question: "[5, 7] - [2, 3] = ?", answer: "[3, 4]", explanation: "[5-2, 7-3] = [3, 4]", hintKeys: ["l1c2_h1", "l1c2_h2", "l1c2_h3"] },
      { type: t("game_type_vec_sub"), question: "[8, 1] - [3, 1] = ?", answer: "[5, 0]", explanation: "[8-3, 1-1] = [5, 0]", hintKeys: ["l1c3_h1", "l1c3_h2", "l1c3_h3"] },
      { type: t("game_type_vec_add"), question: "[2, 3] + [1, 4] = ?", answer: "[3, 7]", explanation: "[2+1, 3+4] = [3, 7]", hintKeys: ["l1c4_h1", "l1c4_h2", "l1c4_h3"] },
      { type: t("game_type_mat_add"), question: "[[1, 0], [0, 1]] + [[1, 1], [1, 1]] = ?", answer: "[[2, 1], [1, 2]]", explanation: "[[1+1, 0+1], [0+1, 1+1]]", hintKeys: ["l1c5_h1", "l1c5_h2", "l1c5_h3"] },
      { type: t("game_type_mat_add"), question: "[[2, 3], [4, 5]] + [[1, 1], [1, 1]] = ?", answer: "[[3, 4], [5, 6]]", explanation: "[[2+1, 3+1], [4+1, 5+1]]", hintKeys: ["l1c6_h1", "l1c6_h2", "l1c6_h3"] },
      { type: t("game_type_vec_sub"), question: "[10, 6] - [4, 2] = ?", answer: "[6, 4]", explanation: "[10-4, 6-2] = [6, 4]", hintKeys: ["l1c7_h1", "l1c7_h2", "l1c7_h3"] },
    ];
  }
  if (difficulty === 2) {
    return [
      { type: t("game_type_scalar"), question: "2 × [3, 5] = ?", answer: "[6, 10]", explanation: "[2×3, 2×5] = [6, 10]", hintKeys: ["l2c0_h1", "l2c0_h2"] },
      { type: t("game_type_scalar"), question: "3 × [1, 4] = ?", answer: "[3, 12]", explanation: "[3×1, 3×4] = [3, 12]", hintKeys: ["l2c1_h1", "l2c1_h2"] },
      { type: t("game_type_scalar"), question: "4 × [2, 3] = ?", answer: "[8, 12]", explanation: "[4×2, 4×3] = [8, 12]", hintKeys: ["l2c2_h1", "l2c2_h2"] },
      { type: t("game_type_mat_add"), question: "[[5, 2], [3, 1]] + [[1, 3], [2, 4]] = ?", answer: "[[6, 5], [5, 5]]", explanation: "[[5+1, 2+3], [3+2, 1+4]]", hintKeys: ["l2c3_h1", "l2c3_h2"] },
      { type: t("game_type_mat_sub"), question: "[[5, 3], [4, 2]] - [[1, 1], [2, 1]] = ?", answer: "[[4, 2], [2, 1]]", explanation: "[[5-1, 3-1], [4-2, 2-1]]", hintKeys: ["l2c4_h1", "l2c4_h2"] },
      { type: t("game_type_mat_mul"), question: "[[1, 2], [3, 4]] × [[2, 0], [1, 3]] = ?", answer: "[[4, 6], [10, 12]]", explanation: "[[1×2+2×1, 1×0+2×3], [3×2+4×1, 3×0+4×3]]", hintKeys: ["l2c5_h1", "l2c5_h2"] },
      { type: t("game_type_mat_mul"), question: "[[1, 0], [0, 1]] × [[5, 6], [7, 8]] = ?", answer: "[[5, 6], [7, 8]]", explanation: t("game_identity_exp"), hintKeys: ["l2c6_h1", "l2c6_h2"] },
      { type: t("game_type_scalar"), question: "5 × [1, 0, 3] = ?", answer: "[5, 0, 15]", explanation: "[5×1, 5×0, 5×3] = [5, 0, 15]", hintKeys: ["l2c7_h1", "l2c7_h2"] },
    ];
  }
  // difficulty === 3
  return [
    { type: t("game_type_dot"), question: "[1, 2] · [3, 4] = ?", answer: "11", explanation: "1×3 + 2×4 = 3 + 8 = 11", hintKeys: ["l3c0_h1"] },
    { type: t("game_type_dot"), question: "[2, 0] · [0, 5] = ?", answer: "0", explanation: "2×0 + 0×5 = 0", hintKeys: ["l3c1_h1"] },
    { type: t("game_type_dot"), question: "[1, 2, 3] · [4, 5, 6] = ?", answer: "32", explanation: "1×4 + 2×5 + 3×6 = 4 + 10 + 18 = 32", hintKeys: ["l3c2_h1"] },
    { type: t("game_type_mixed"), question: "2×[1, 2, 3] + [4, 1, 5] = ?", answer: "[6, 5, 11]", explanation: "[2, 4, 6] + [4, 1, 5] = [6, 5, 11]", hintKeys: ["l3c3_h1"] },
    { type: t("game_type_mixed"), question: "3×[2, 1] - [1, 2] = ?", answer: "[5, 1]", explanation: "[6, 3] - [1, 2] = [5, 1]", hintKeys: ["l3c4_h1"] },
    { type: t("game_type_mat_mul"), question: "[[1, 2], [0, 1]] × [[1, 0], [1, 1]] = ?", answer: "[[3, 2], [1, 1]]", explanation: "[[1×1+2×1, 1×0+2×1], [0×1+1×1, 0×0+1×1]]", hintKeys: ["l3c5_h1"] },
    { type: t("game_type_dot"), question: "[5, 2] · [1, 4] = ?", answer: "13", explanation: "5×1 + 2×4 = 5 + 8 = 13", hintKeys: ["l3c6_h1"] },
    { type: t("game_type_mixed"), question: "[1, 2, 3] + [3, 2, 1] - [2, 2, 2] = ?", answer: "[2, 2, 2]", explanation: "[4, 4, 4] - [2, 2, 2] = [2, 2, 2]", hintKeys: ["l3c7_h1"] },
  ];
}
