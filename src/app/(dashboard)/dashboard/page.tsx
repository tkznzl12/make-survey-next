import type { Metadata } from "next";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { SurveyList } from "@/components/dashboard/survey-list";
import { getDashboardStats, mockSurveys } from "@/lib/mock/surveys";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const stats = getDashboardStats(mockSurveys);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          설문 현황과 최근 설문을 한눈에 확인하세요.
        </p>
      </div>

      <StatsCards stats={stats} />
      <SurveyList surveys={mockSurveys} />
    </div>
  );
}
