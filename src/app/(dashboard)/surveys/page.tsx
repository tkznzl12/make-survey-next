import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SurveysPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">내 설문</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            설문 목록 페이지는 이후 단계에서 구현됩니다.
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/surveys/new" />}>
          <Plus data-icon="inline-start" />
          설문 만들기
        </Button>
      </div>
    </div>
  );
}
