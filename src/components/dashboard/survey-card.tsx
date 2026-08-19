import { BarChart3, Pencil } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatNumber } from "@/lib/format";
import type { DashboardSurvey, SurveyStatus } from "@/types/survey";

type SurveyCardProps = {
  survey: DashboardSurvey;
};

const statusLabel: Record<SurveyStatus, string> = {
  DRAFT: "초안",
  PUBLISHED: "진행 중",
  CLOSED: "종료",
  ARCHIVED: "보관",
};

const statusVariant: Record<
  SurveyStatus,
  "default" | "secondary" | "outline"
> = {
  DRAFT: "outline",
  PUBLISHED: "default",
  CLOSED: "secondary",
  ARCHIVED: "outline",
};

export function SurveyCard({ survey }: SurveyCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="pr-2">{survey.title}</CardTitle>
          <Badge variant={statusVariant[survey.status]}>
            {statusLabel[survey.status]}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {survey.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
        <p>
          응답{" "}
          <span className="font-medium text-foreground">
            {formatNumber(survey.responseCount)}
          </span>
          건
        </p>
        <p>생성일 {formatDate(survey.createdAt)}</p>
        <p>수정일 {formatDate(survey.updatedAt)}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href="/analytics" />}
        >
          <BarChart3 data-icon="inline-start" />
          결과 보기
        </Button>
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href="/surveys" />}
        >
          <Pencil data-icon="inline-start" />
          설문 편집
        </Button>
      </CardFooter>
    </Card>
  );
}
