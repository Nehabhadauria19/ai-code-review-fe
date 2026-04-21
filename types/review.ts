// types/review.ts
export type Issue = {
  message: string;
  severity?: "low" | "medium" | "high";
};

export type ReviewResult = {
  bugs: (string | Issue)[];
  security: (string | Issue)[];
  performance: (string | Issue)[];
  bestPractices: (string | Issue)[];
  severity: "low" | "medium" | "high";
  suggestions: string[];
};

// 🔥 Add this for history items
export type ReviewDoc = {
  _id: string;
  code: string;
  language: string;
  review: ReviewResult;
  userId: string;
  createdAt: string;
  updatedAt: string;
};