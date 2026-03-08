export interface Question {
  id: number;
  questionKey: string;
  codeBlock?: string;
  optionsKey: string;
  correctIndex: number;
  explanationKey: string;
  level: "beginner" | "intermediate" | "advanced";
}

export const questionBank: Question[] = [
  // ===== BEGINNER (20) =====
  { id: 1, questionKey: "qb_q1", codeBlock: "vector = [5, 8, 2]", optionsKey: "qb_q1_opts", correctIndex: 1, explanationKey: "qb_q1_exp", level: "beginner" },
  { id: 2, questionKey: "qb_q2", codeBlock: "v = [10, 20, 30]", optionsKey: "qb_q2_opts", correctIndex: 1, explanationKey: "qb_q2_exp", level: "beginner" },
  { id: 3, questionKey: "qb_q3", codeBlock: "v = [7, 3, 9]", optionsKey: "qb_q3_opts", correctIndex: 2, explanationKey: "qb_q3_exp", level: "beginner" },
  { id: 4, questionKey: "qb_q4", codeBlock: "v = [4, 1, 6, 2]", optionsKey: "qb_q4_opts", correctIndex: 3, explanationKey: "qb_q4_exp", level: "beginner" },
  { id: 5, questionKey: "qb_q5", codeBlock: "v = [100, 200]", optionsKey: "qb_q5_opts", correctIndex: 0, explanationKey: "qb_q5_exp", level: "beginner" },
  { id: 6, questionKey: "qb_q6", codeBlock: "v = [3, 7, 11, 5, 9]", optionsKey: "qb_q6_opts", correctIndex: 2, explanationKey: "qb_q6_exp", level: "beginner" },
  { id: 7, questionKey: "qb_q7", codeBlock: "v = [15, 25, 35]", optionsKey: "qb_q7_opts", correctIndex: 0, explanationKey: "qb_q7_exp", level: "beginner" },
  { id: 8, questionKey: "qb_q8", codeBlock: "v = [8]", optionsKey: "qb_q8_opts", correctIndex: 0, explanationKey: "qb_q8_exp", level: "beginner" },
  { id: 9, questionKey: "qb_q9", codeBlock: "v = [2, 4, 6, 8, 10]", optionsKey: "qb_q9_opts", correctIndex: 3, explanationKey: "qb_q9_exp", level: "beginner" },
  { id: 10, questionKey: "qb_q10", codeBlock: "v = [0, 0, 0]", optionsKey: "qb_q10_opts", correctIndex: 1, explanationKey: "qb_q10_exp", level: "beginner" },
  { id: 11, questionKey: "qb_q11", codeBlock: "matrix = [[1, 2], [3, 4]]", optionsKey: "qb_q11_opts", correctIndex: 0, explanationKey: "qb_q11_exp", level: "beginner" },
  { id: 12, questionKey: "qb_q12", codeBlock: "matrix = [[5, 6], [7, 8]]", optionsKey: "qb_q12_opts", correctIndex: 0, explanationKey: "qb_q12_exp", level: "beginner" },
  { id: 13, questionKey: "qb_q13", codeBlock: "matrix = [[1, 2, 3], [4, 5, 6]]", optionsKey: "qb_q13_opts", correctIndex: 1, explanationKey: "qb_q13_exp", level: "beginner" },
  { id: 14, questionKey: "qb_q14", codeBlock: "matrix = [[9, 8], [7, 6], [5, 4]]", optionsKey: "qb_q14_opts", correctIndex: 2, explanationKey: "qb_q14_exp", level: "beginner" },
  { id: 15, questionKey: "qb_q15", codeBlock: "matrix = [[1, 2], [3, 4]]", optionsKey: "qb_q15_opts", correctIndex: 1, explanationKey: "qb_q15_exp", level: "beginner" },
  { id: 16, questionKey: "qb_q16", codeBlock: "v = [12, 24, 36, 48]", optionsKey: "qb_q16_opts", correctIndex: 2, explanationKey: "qb_q16_exp", level: "beginner" },
  { id: 17, questionKey: "qb_q17", codeBlock: "matrix = [[10, 20], [30, 40]]", optionsKey: "qb_q17_opts", correctIndex: 3, explanationKey: "qb_q17_exp", level: "beginner" },
  { id: 18, questionKey: "qb_q18", codeBlock: "v = [5, 10, 15, 20, 25]", optionsKey: "qb_q18_opts", correctIndex: 1, explanationKey: "qb_q18_exp", level: "beginner" },
  { id: 19, questionKey: "qb_q19", codeBlock: "v = [3, 6]", optionsKey: "qb_q19_opts", correctIndex: 0, explanationKey: "qb_q19_exp", level: "beginner" },
  { id: 20, questionKey: "qb_q20", codeBlock: "matrix = [[1, 0], [0, 1]]", optionsKey: "qb_q20_opts", correctIndex: 0, explanationKey: "qb_q20_exp", level: "beginner" },

  // ===== INTERMEDIATE (20) =====
  { id: 21, questionKey: "qb_q21", codeBlock: "[1, 2] + [3, 4]", optionsKey: "qb_q21_opts", correctIndex: 0, explanationKey: "qb_q21_exp", level: "intermediate" },
  { id: 22, questionKey: "qb_q22", codeBlock: "[5, 10] + [2, 3]", optionsKey: "qb_q22_opts", correctIndex: 1, explanationKey: "qb_q22_exp", level: "intermediate" },
  { id: 23, questionKey: "qb_q23", codeBlock: "[0, 0, 0] + [1, 2, 3]", optionsKey: "qb_q23_opts", correctIndex: 0, explanationKey: "qb_q23_exp", level: "intermediate" },
  { id: 24, questionKey: "qb_q24", codeBlock: "[-1, 3] + [4, -2]", optionsKey: "qb_q24_opts", correctIndex: 2, explanationKey: "qb_q24_exp", level: "intermediate" },
  { id: 25, questionKey: "qb_q25", codeBlock: "[10, 20, 30] + [1, 1, 1]", optionsKey: "qb_q25_opts", correctIndex: 0, explanationKey: "qb_q25_exp", level: "intermediate" },
  { id: 26, questionKey: "qb_q26", codeBlock: "3 × [2, 5]", optionsKey: "qb_q26_opts", correctIndex: 0, explanationKey: "qb_q26_exp", level: "intermediate" },
  { id: 27, questionKey: "qb_q27", codeBlock: "2 × [4, 7, 1]", optionsKey: "qb_q27_opts", correctIndex: 1, explanationKey: "qb_q27_exp", level: "intermediate" },
  { id: 28, questionKey: "qb_q28", codeBlock: "5 × [1, 0, 3]", optionsKey: "qb_q28_opts", correctIndex: 0, explanationKey: "qb_q28_exp", level: "intermediate" },
  { id: 29, questionKey: "qb_q29", codeBlock: "-1 × [3, -2, 7]", optionsKey: "qb_q29_opts", correctIndex: 2, explanationKey: "qb_q29_exp", level: "intermediate" },
  { id: 30, questionKey: "qb_q30", codeBlock: "0 × [5, 10, 15]", optionsKey: "qb_q30_opts", correctIndex: 1, explanationKey: "qb_q30_exp", level: "intermediate" },
  { id: 31, questionKey: "qb_q31", codeBlock: "[1, 2, 3] · [4, 5, 6]", optionsKey: "qb_q31_opts", correctIndex: 0, explanationKey: "qb_q31_exp", level: "intermediate" },
  { id: 32, questionKey: "qb_q32", codeBlock: "[2, 3] · [4, 1]", optionsKey: "qb_q32_opts", correctIndex: 1, explanationKey: "qb_q32_exp", level: "intermediate" },
  { id: 33, questionKey: "qb_q33", codeBlock: "[1, 0] · [0, 1]", optionsKey: "qb_q33_opts", correctIndex: 0, explanationKey: "qb_q33_exp", level: "intermediate" },
  { id: 34, questionKey: "qb_q34", codeBlock: "[3, 3] · [3, 3]", optionsKey: "qb_q34_opts", correctIndex: 2, explanationKey: "qb_q34_exp", level: "intermediate" },
  { id: 35, questionKey: "qb_q35", codeBlock: "[5, 2] · [1, 4]", optionsKey: "qb_q35_opts", correctIndex: 0, explanationKey: "qb_q35_exp", level: "intermediate" },
  { id: 36, questionKey: "qb_q36", codeBlock: "[2, 4] + [3, 1]", optionsKey: "qb_q36_opts", correctIndex: 1, explanationKey: "qb_q36_exp", level: "intermediate" },
  { id: 37, questionKey: "qb_q37", codeBlock: "4 × [3, 2]", optionsKey: "qb_q37_opts", correctIndex: 0, explanationKey: "qb_q37_exp", level: "intermediate" },
  { id: 38, questionKey: "qb_q38", codeBlock: "[6, 2] · [3, 4]", optionsKey: "qb_q38_opts", correctIndex: 2, explanationKey: "qb_q38_exp", level: "intermediate" },
  { id: 39, questionKey: "qb_q39", codeBlock: "[1, 1, 1] + [2, 2, 2]", optionsKey: "qb_q39_opts", correctIndex: 0, explanationKey: "qb_q39_exp", level: "intermediate" },
  { id: 40, questionKey: "qb_q40", codeBlock: "10 × [1, 2]", optionsKey: "qb_q40_opts", correctIndex: 1, explanationKey: "qb_q40_exp", level: "intermediate" },

  // ===== ADVANCED (10) =====
  { id: 41, questionKey: "qb_q41", codeBlock: "[[1, 0], [0, 1]] + [[2, 3], [4, 5]]", optionsKey: "qb_q41_opts", correctIndex: 0, explanationKey: "qb_q41_exp", level: "advanced" },
  { id: 42, questionKey: "qb_q42", codeBlock: "[[1, 2], [3, 4]] + [[5, 6], [7, 8]]", optionsKey: "qb_q42_opts", correctIndex: 1, explanationKey: "qb_q42_exp", level: "advanced" },
  { id: 43, questionKey: "qb_q43", codeBlock: "[[2, 0], [0, 2]] + [[1, 1], [1, 1]]", optionsKey: "qb_q43_opts", correctIndex: 0, explanationKey: "qb_q43_exp", level: "advanced" },
  { id: 44, questionKey: "qb_q44", codeBlock: "[[3, 1], [2, 4]] + [[-3, -1], [-2, -4]]", optionsKey: "qb_q44_opts", correctIndex: 2, explanationKey: "qb_q44_exp", level: "advanced" },
  { id: 45, questionKey: "qb_q45", codeBlock: "[[10, 20], [30, 40]] + [[1, 2], [3, 4]]", optionsKey: "qb_q45_opts", correctIndex: 0, explanationKey: "qb_q45_exp", level: "advanced" },
  { id: 46, questionKey: "qb_q46", codeBlock: "[[1, 2], [3, 4]] × [[5, 6], [7, 8]]", optionsKey: "qb_q46_opts", correctIndex: 0, explanationKey: "qb_q46_exp", level: "advanced" },
  { id: 47, questionKey: "qb_q47", codeBlock: "[[2, 0], [1, 3]] × [[1, 4], [2, 1]]", optionsKey: "qb_q47_opts", correctIndex: 1, explanationKey: "qb_q47_exp", level: "advanced" },
  { id: 48, questionKey: "qb_q48", codeBlock: "[[1, 0], [0, 1]] × [[7, 8], [9, 10]]", optionsKey: "qb_q48_opts", correctIndex: 0, explanationKey: "qb_q48_exp", level: "advanced" },
  { id: 49, questionKey: "qb_q49", codeBlock: "[[3, 1], [0, 2]] × [[1, 0], [0, 1]]", optionsKey: "qb_q49_opts", correctIndex: 2, explanationKey: "qb_q49_exp", level: "advanced" },
  { id: 50, questionKey: "qb_q50", codeBlock: "[[2, 1], [4, 3]] × [[1, 2], [0, 1]]", optionsKey: "qb_q50_opts", correctIndex: 0, explanationKey: "qb_q50_exp", level: "advanced" },
];

const SESSION_SIZE = 10;

export function generateSession(): Question[] {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, SESSION_SIZE);
}
