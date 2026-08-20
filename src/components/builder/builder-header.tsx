"use client";

import Link from "next/link";
import { ArrowLeft, Eye, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

type BuilderHeaderProps = {
  onPreview: () => void;
  onSave: () => void;
};

export function BuilderHeader({ onPreview, onSave }: BuilderHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 text-muted-foreground"
          nativeButton={false}
          render={<Link href="/surveys" />}
        >
          <ArrowLeft data-icon="inline-start" />
          내 설문
        </Button>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          새 설문 만들기
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button type="button" variant="outline" onClick={onPreview}>
          <Eye data-icon="inline-start" />
          미리보기
        </Button>
        <Button type="button" onClick={onSave}>
          <Save data-icon="inline-start" />
          저장
        </Button>
      </div>
    </header>
  );
}
