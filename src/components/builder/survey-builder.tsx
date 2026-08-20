"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { BuilderHeader } from "@/components/builder/builder-header";
import { QuestionList } from "@/components/builder/question-list";
import { SurveyBasicInfo } from "@/components/builder/survey-basic-info";
import { SurveyPreviewDialog } from "@/components/builder/survey-preview-dialog";
import { Button } from "@/components/ui/button";
import {
  addOption,
  createQuestion,
  INITIAL_SURVEY_DRAFT,
  reindexQuestions,
  removeOption,
  updateOptionLabel,
} from "@/lib/survey/builder";
import type { Option, Question } from "@/types/survey";

export function SurveyBuilder() {
  const [title, setTitle] = useState(INITIAL_SURVEY_DRAFT.title);
  const [description, setDescription] = useState(
    INITIAL_SURVEY_DRAFT.description,
  );
  const [questions, setQuestions] = useState<Question[]>(
    INITIAL_SURVEY_DRAFT.questions,
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  function updateQuestionById(
    questionId: string,
    updater: (question: Question) => Question,
  ) {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId ? updater(question) : question,
      ),
    );
  }

  function handleAddQuestion() {
    setQuestions((current) => [
      ...current,
      createQuestion(current.length),
    ]);
  }

  function handleDeleteQuestion(questionId: string) {
    setQuestions((current) =>
      reindexQuestions(current.filter((question) => question.id !== questionId)),
    );
  }

  function handleAddOption(questionId: string) {
    updateQuestionById(questionId, (question) => ({
      ...question,
      options: addOption(question.options ?? []),
    }));
  }

  function handleDeleteOption(questionId: string, optionId: string) {
    updateQuestionById(questionId, (question) => {
      const options = question.options ?? [];

      if (options.length <= 1) {
        toast.warning("선택지는 최소 1개 이상이어야 합니다.");
        return question;
      }

      return {
        ...question,
        options: removeOption(options, optionId),
      };
    });
  }

  function handleOptionLabelChange(
    questionId: string,
    optionId: string,
    label: string,
  ) {
    updateQuestionById(questionId, (question) => ({
      ...question,
      options: updateOptionLabel(question.options ?? [], optionId, label),
    }));
  }

  function handleOptionsReorder(questionId: string, options: Option[]) {
    updateQuestionById(questionId, (question) => ({
      ...question,
      options,
    }));
  }

  function handleSave() {
    toast.info("현재는 임시 저장 상태입니다.");
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <BuilderHeader
        onPreview={() => setPreviewOpen(true)}
        onSave={handleSave}
      />

      <SurveyBasicInfo
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
      />

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">문항</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            문항을 추가하고 유형에 맞게 편집하세요.
          </p>
        </div>

        <QuestionList
          questions={questions}
          onReorder={setQuestions}
          onChangeQuestion={(question) =>
            updateQuestionById(question.id, () => question)
          }
          onDeleteQuestion={handleDeleteQuestion}
          onAddOption={handleAddOption}
          onDeleteOption={handleDeleteOption}
          onOptionLabelChange={handleOptionLabelChange}
          onOptionsReorder={handleOptionsReorder}
        />

        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-fit"
          onClick={handleAddQuestion}
        >
          <Plus data-icon="inline-start" />
          문항 추가
        </Button>
      </section>

      <SurveyPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        survey={{ title, description, questions }}
      />
    </div>
  );
}
