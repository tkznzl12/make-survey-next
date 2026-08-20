"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

import { QuestionOptions } from "@/components/builder/question-options";
import { QuestionPreview } from "@/components/builder/question-preview";
import { QuestionTypeSelect } from "@/components/builder/question-type-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { applyQuestionType, isChoiceType } from "@/lib/survey/builder";
import { cn } from "@/lib/utils";
import type { Option, Question, QuestionType } from "@/types/survey";

type QuestionCardProps = {
  question: Question;
  index: number;
  onChange: (question: Question) => void;
  onDelete: () => void;
  onAddOption: () => void;
  onDeleteOption: (optionId: string) => void;
  onOptionLabelChange: (optionId: string, label: string) => void;
  onOptionsReorder: (options: Option[]) => void;
};

export function QuestionCard({
  question,
  index,
  onChange,
  onDelete,
  onAddOption,
  onDeleteOption,
  onOptionLabelChange,
  onOptionsReorder,
}: QuestionCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const titleId = `${question.id}-title`;
  const descriptionId = `${question.id}-description`;
  const requiredId = `${question.id}-required`;

  function handleTypeChange(type: QuestionType) {
    onChange(applyQuestionType(question, type));
  }

  return (
    <>
      <Card
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        className={cn("overflow-visible", isDragging && "z-10 opacity-70")}
      >
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1">
              <button
                type="button"
                className="inline-flex size-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="문항 순서 변경"
                {...attributes}
                {...listeners}
              >
                <GripVertical className="size-4" />
              </button>
              <p className="text-sm font-medium text-muted-foreground">
                {index + 1}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="문항 삭제"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={titleId}>질문 제목</Label>
            <Input
              id={titleId}
              value={question.title}
              onChange={(event) =>
                onChange({ ...question, title: event.target.value })
              }
              placeholder="질문을 입력하세요"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={descriptionId}>설명</Label>
            <Textarea
              id={descriptionId}
              value={question.description ?? ""}
              onChange={(event) =>
                onChange({ ...question, description: event.target.value })
              }
              placeholder="질문에 대한 설명을 입력하세요"
              rows={2}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>문항 유형</Label>
            <QuestionTypeSelect
              value={question.type}
              onChange={handleTypeChange}
            />
          </div>

          {isChoiceType(question.type) ? (
            <QuestionOptions
              questionId={question.id}
              type={question.type}
              options={question.options ?? []}
              onChange={onOptionsReorder}
              onAdd={onAddOption}
              onDelete={onDeleteOption}
              onLabelChange={onOptionLabelChange}
            />
          ) : null}

          <QuestionPreview key={`${question.id}-${question.type}`} question={question} />

          <div className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2">
            <Label htmlFor={requiredId} className="cursor-pointer font-normal">
              필수 문항
            </Label>
            <Switch
              id={requiredId}
              checked={question.required}
              onCheckedChange={(checked) =>
                onChange({ ...question, required: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>문항을 삭제할까요?</DialogTitle>
            <DialogDescription>
              삭제하면 이 문항의 제목, 설명, 선택지가 모두 사라집니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
            >
              취소
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setDeleteOpen(false);
                onDelete();
              }}
            >
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
