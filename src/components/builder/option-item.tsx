"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Option, QuestionType } from "@/types/survey";

type OptionItemProps = {
  option: Option;
  type: QuestionType;
  canDelete: boolean;
  onLabelChange: (label: string) => void;
  onDelete: () => void;
};

function OptionMarker({ type }: { type: QuestionType }) {
  if (type === "MULTIPLE_CHOICE") {
    return (
      <span
        aria-hidden
        className="size-3.5 shrink-0 rounded-[3px] border border-muted-foreground/50"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="size-3.5 shrink-0 rounded-full border border-muted-foreground/50"
    />
  );
}

export function OptionItem({
  option,
  type,
  canDelete,
  onLabelChange,
  onDelete,
}: OptionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: option.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "flex items-center gap-2",
        isDragging && "z-10 opacity-70",
      )}
    >
      <button
        type="button"
        className="inline-flex size-7 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label="선택지 순서 변경"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" />
      </button>
      <OptionMarker type={type} />
      <Input
        value={option.label}
        onChange={(event) => onLabelChange(event.target.value)}
        placeholder="선택지 이름"
        aria-label="선택지 이름"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onDelete}
        disabled={!canDelete}
        aria-label="선택지 삭제"
      >
        <Trash2 />
      </Button>
    </div>
  );
}
