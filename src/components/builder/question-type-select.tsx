"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  isQuestionType,
  QUESTION_TYPE_ITEMS,
  QUESTION_TYPE_LABELS,
} from "@/lib/survey/builder";
import type { QuestionType } from "@/types/survey";

type QuestionTypeSelectProps = {
  value: QuestionType;
  onChange: (type: QuestionType) => void;
};

export function QuestionTypeSelect({
  value,
  onChange,
}: QuestionTypeSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (isQuestionType(next)) {
          onChange(next);
        }
      }}
      items={QUESTION_TYPE_ITEMS}
    >
      <SelectTrigger className="w-full max-w-xs">
        <SelectValue>
          {(selected: QuestionType | null) =>
            selected ? QUESTION_TYPE_LABELS[selected] : "문항 유형 선택"
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} align="start">
        {QUESTION_TYPE_ITEMS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
