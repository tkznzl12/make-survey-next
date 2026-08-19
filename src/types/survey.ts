export type SurveyStatus = "DRAFT" | "PUBLISHED" | "CLOSED" | "ARCHIVED";

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
