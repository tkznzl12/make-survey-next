import type { DashboardStats, DashboardSurvey } from "@/types/survey";

export const mockSurveys: DashboardSurvey[] = [
  {
    id: "survey-fee-2026",
    title: "2026 자치회비 사용처 조사",
    description:
      "2026년 자치회비 사용 우선순위를 조사하고, 구성원이 원하는 복지·행사·비품 항목을 파악합니다.",
    status: "PUBLISHED",
    responseCount: 128,
    createdAt: "2026-03-02T09:00:00.000Z",
    updatedAt: "2026-08-10T14:20:00.000Z",
  },
  {
    id: "survey-team-satisfaction",
    title: "팀 만족도 조사",
    description:
      "협업 방식, 업무 부하, 소통 만족도를 확인하고 개선이 필요한 영역을 찾습니다.",
    status: "PUBLISHED",
    responseCount: 42,
    createdAt: "2026-06-15T10:30:00.000Z",
    updatedAt: "2026-08-12T11:05:00.000Z",
  },
  {
    id: "survey-project-usability",
    title: "프로젝트 사용성 조사",
    description:
      "현재 서비스의 주요 흐름을 사용해 본 뒤, 이해하기 어렵거나 불편했던 지점을 수집합니다.",
    status: "CLOSED",
    responseCount: 87,
    createdAt: "2026-01-20T08:00:00.000Z",
    updatedAt: "2026-05-30T18:40:00.000Z",
  },
];

export function getDashboardStats(
  surveys: DashboardSurvey[],
): DashboardStats {
  return {
    totalSurveys: surveys.length,
    activeSurveys: surveys.filter((survey) => survey.status === "PUBLISHED")
      .length,
    closedSurveys: surveys.filter((survey) => survey.status === "CLOSED")
      .length,
    totalResponses: surveys.reduce(
      (sum, survey) => sum + survey.responseCount,
      0,
    ),
  };
}
