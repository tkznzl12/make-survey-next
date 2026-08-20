export type SurveyStatus = "DRAFT" | "PUBLISHED" | "CLOSED" | "ARCHIVED";

export type QuestionType =
  | "TEXT"
  | "LONG_TEXT"
  | "SINGLE_CHOICE"
  | "MULTIPLE_CHOICE"
  | "DROPDOWN"
  | "RATING"
  | "SCALE";

export type Option = {
  id: string;
  label: string;
  value: string;
};

export type Question = {
  id: string;
  title: string;
  description?: string;
  type: QuestionType;
  required: boolean;
  order: number;
  options?: Option[];
};

export type SurveyDraft = {
  title: string;
  description: string;
  questions: Question[];
};

export type DashboardSurvey = {
  id: string;
  title: string;
  description: string;
  status: SurveyStatus;
  responseCount: number;
  createdAt: string;
  updatedAt: string;
};

export type DashboardStats = {
  totalSurveys: number;
  activeSurveys: number;
  closedSurveys: number;
  totalResponses: number;
};
