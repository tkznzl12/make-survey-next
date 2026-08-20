import type { Metadata } from "next";

import { SurveyBuilder } from "@/components/builder/survey-builder";

export const metadata: Metadata = {
  title: "새 설문 만들기",
};

export default function NewSurveyPage() {
  return <SurveyBuilder />;
}
