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

import { QuestionCard } from "@/components/builder/question-card";
import { moveItemById, reindexQuestions } from "@/lib/survey/builder";
import type { Option, Question } from "@/types/survey";

type QuestionListProps = {
  questions: Question[];
  onReorder: (questions: Question[]) => void;
  onChangeQuestion: (question: Question) => void;
  onDeleteQuestion: (questionId: string) => void;
  onAddOption: (questionId: string) => void;
  onDeleteOption: (questionId: string, optionId: string) => void;
  onOptionLabelChange: (
    questionId: string,
    optionId: string,
    label: string,
  ) => void;
  onOptionsReorder: (questionId: string, options: Option[]) => void;
};

export function QuestionList({
  questions,
  onReorder,
  onChangeQuestion,
  onDeleteQuestion,
  onAddOption,
  onDeleteOption,
  onOptionLabelChange,
  onOptionsReorder,
}: QuestionListProps) {
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

    onReorder(
      reindexQuestions(
        moveItemById(questions, String(active.id), String(over.id)),
      ),
    );
  }

  if (questions.length === 0) {
    return (
      <p className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
        아직 문항이 없습니다. 아래 버튼으로 문항을 추가하세요.
      </p>
    );
  }

  return (
    <DndContext
      id="question-list"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={questions.map((question) => question.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-4">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              onChange={onChangeQuestion}
              onDelete={() => onDeleteQuestion(question.id)}
              onAddOption={() => onAddOption(question.id)}
              onDeleteOption={(optionId) =>
                onDeleteOption(question.id, optionId)
              }
              onOptionLabelChange={(optionId, label) =>
                onOptionLabelChange(question.id, optionId, label)
              }
              onOptionsReorder={(options) =>
                onOptionsReorder(question.id, options)
              }
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
