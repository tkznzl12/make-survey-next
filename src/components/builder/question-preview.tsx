"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/survey";

type QuestionPreviewProps = {
  question: Question;
  variant?: "inline" | "respondent";
};

function ChoiceEmptyState() {
  return (
    <p className="text-sm text-muted-foreground">선택지를 추가해 주세요.</p>
  );
}

function RatingPreview() {
  const [value, setValue] = useState(0);

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="평점">
      {Array.from({ length: 5 }, (_, index) => {
        const score = index + 1;
        const active = score <= value;

        return (
          <button
            key={score}
            type="button"
            aria-label={`${score}점`}
            className={cn(
              "rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground",
              active && "text-foreground",
            )}
            onClick={() => setValue(score)}
          >
            <Star className={cn("size-6", active && "fill-current")} />
          </button>
        );
      })}
    </div>
  );
}

function ScalePreview() {
  const [value, setValue] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="척도">
      {Array.from({ length: 5 }, (_, index) => {
        const score = index + 1;
        const active = value === score;

        return (
          <button
            key={score}
            type="button"
            aria-label={`${score}`}
            className={cn(
              "size-9 rounded-lg border text-sm font-medium transition-colors hover:bg-muted",
              active && "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
            )}
            onClick={() => setValue(score)}
          >
            {score}
          </button>
        );
      })}
    </div>
  );
}

function PreviewControl({ question }: { question: Question }) {
  const options = question.options ?? [];

  switch (question.type) {
    case "TEXT":
      return <Input readOnly placeholder="단답형 응답" />;
    case "LONG_TEXT":
      return <Textarea readOnly placeholder="장문형 응답" rows={3} />;
    case "SINGLE_CHOICE":
      if (options.length === 0) {
        return <ChoiceEmptyState />;
      }
      return (
        <RadioGroup className="gap-3">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 text-sm"
            >
              <RadioGroupItem value={option.value} />
              <span>{option.label || "이름 없는 선택지"}</span>
            </label>
          ))}
        </RadioGroup>
      );
    case "MULTIPLE_CHOICE":
      if (options.length === 0) {
        return <ChoiceEmptyState />;
      }
      return (
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 text-sm"
            >
              <Checkbox />
              <span>{option.label || "이름 없는 선택지"}</span>
            </label>
          ))}
        </div>
      );
    case "DROPDOWN":
      if (options.length === 0) {
        return <ChoiceEmptyState />;
      }
      return (
        <Select items={options.map((option) => ({ value: option.value, label: option.label }))}>
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="선택하세요" />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            {options.map((option) => (
              <SelectItem key={option.id} value={option.value}>
                {option.label || "이름 없는 선택지"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "RATING":
      return <RatingPreview />;
    case "SCALE":
      return <ScalePreview />;
  }
}

export function QuestionPreview({
  question,
  variant = "inline",
}: QuestionPreviewProps) {
  const control = <PreviewControl question={question} />;

  if (variant === "respondent") {
    return control;
  }

  return (
    <div className="rounded-lg border bg-muted/40 p-3">
      <p className="mb-3 text-xs font-medium text-muted-foreground">미리보기</p>
      {control}
    </div>
  );
}
