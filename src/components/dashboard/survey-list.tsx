import { SurveyCard } from "@/components/dashboard/survey-card";
import type { DashboardSurvey } from "@/types/survey";

type SurveyListProps = {
  surveys: DashboardSurvey[];
};

export function SurveyList({ surveys }: SurveyListProps) {
  return (
    <section aria-labelledby="survey-list-heading" className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2
            id="survey-list-heading"
            className="text-lg font-semibold tracking-tight"
          >
            내 설문
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            생성한 설문을 확인하고 결과 또는 편집 화면으로 이동합니다.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {surveys.map((survey) => (
          <SurveyCard key={survey.id} survey={survey} />
        ))}
      </div>
    </section>
  );
}
