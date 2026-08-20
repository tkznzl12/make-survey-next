"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";

import { OptionItem } from "@/components/builder/option-item";
import { Button } from "@/components/ui/button";
import { moveItemById } from "@/lib/survey/builder";
import type { Option, QuestionType } from "@/types/survey";

type QuestionOptionsProps = {
  questionId: string;
  type: QuestionType;
  options: Option[];
  onChange: (options: Option[]) => void;
  onAdd: () => void;
  onDelete: (optionId: string) => void;
  onLabelChange: (optionId: string, label: string) => void;
};

export function QuestionOptions({
  questionId,
  type,
  options,
  onChange,
  onAdd,
  onDelete,
  onLabelChange,
}: QuestionOptionsProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    onChange(moveItemById(options, String(active.id), String(over.id)));
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">선택지</p>
      <DndContext
        id={`options-${questionId}`}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={options.map((option) => option.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <OptionItem
                key={option.id}
                option={option}
                type={type}
                canDelete={options.length > 1}
                onLabelChange={(label) => onLabelChange(option.id, label)}
                onDelete={() => onDelete(option.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={onAdd}
      >
        <Plus data-icon="inline-start" />
        선택지 추가
      </Button>
    </div>
  );
}
