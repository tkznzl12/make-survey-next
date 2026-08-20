"use client";

import { QuestionPreview } from "@/components/builder/question-preview";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SurveyDraft } from "@/types/survey";

type SurveyPreviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  survey: SurveyDraft;
};

export function SurveyPreviewDialog({
  open,
  onOpenChange,
  survey,
}: SurveyPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{survey.title || "제목 없는 설문"}</DialogTitle>
          <DialogDescription>
            {survey.description || "설명이 없는 설문입니다."}
          </DialogDescription>
        </DialogHeader>

        {survey.questions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            미리볼 문항이 없습니다.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {survey.questions.map((question, index) => (
              <section key={question.id} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-start gap-2">
                  <p className="text-sm font-medium">
                    {index + 1}. {question.title || "제목 없는 문항"}
                    {question.required ? (
                      <span className="ml-1 text-destructive">*</span>
                    ) : null}
                  </p>
                  {question.required ? (
                    <Badge variant="secondary">필수</Badge>
                  ) : null}
                </div>
                {question.description ? (
                  <p className="text-sm text-muted-foreground">
                    {question.description}
                  </p>
                ) : null}
                <QuestionPreview
                  key={`${question.id}-${question.type}`}
                  question={question}
                  variant="respondent"
                />
              </section>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
