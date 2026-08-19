import {
  CheckCircle2,
  ClipboardList,
  MessageSquareText,
  Radio,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import type { DashboardStats } from "@/types/survey";

type StatsCardsProps = {
  stats: DashboardStats;
};

const statItems = [
  {
    key: "totalSurveys" as const,
    label: "전체 설문",
    icon: ClipboardList,
  },
  {
    key: "activeSurveys" as const,
    label: "진행 중인 설문",
    icon: Radio,
  },
  {
    key: "closedSurveys" as const,
    label: "종료된 설문",
    icon: CheckCircle2,
  },
  {
    key: "totalResponses" as const,
    label: "전체 응답",
    icon: MessageSquareText,
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <section aria-label="설문 현황">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.key} size="sm">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardDescription>{item.label}</CardDescription>
                  <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-4" />
                  </span>
                </div>
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  {formatNumber(stats[item.key])}
                </CardTitle>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
