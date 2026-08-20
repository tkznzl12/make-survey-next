import type { Option, Question, QuestionType, SurveyDraft } from "@/types/survey";

export const QUESTION_TYPES: QuestionType[] = [
  "TEXT",
  "LONG_TEXT",
  "SINGLE_CHOICE",
  "MULTIPLE_CHOICE",
  "DROPDOWN",
  "RATING",
  "SCALE",
];

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  TEXT: "단답형",
  LONG_TEXT: "장문형",
  SINGLE_CHOICE: "단일 선택",
  MULTIPLE_CHOICE: "복수 선택",
  DROPDOWN: "드롭다운",
  RATING: "평점",
  SCALE: "척도",
};

export const QUESTION_TYPE_ITEMS = QUESTION_TYPES.map((type) => ({
  value: type,
  label: QUESTION_TYPE_LABELS[type],
}));

const CHOICE_TYPES: ReadonlySet<QuestionType> = new Set([
  "SINGLE_CHOICE",
  "MULTIPLE_CHOICE",
  "DROPDOWN",
]);

export function isQuestionType(value: unknown): value is QuestionType {
  return (
    typeof value === "string" &&
    QUESTION_TYPES.includes(value as QuestionType)
  );
}

export function isChoiceType(type: QuestionType): boolean {
  return CHOICE_TYPES.has(type);
}

export function createOption(label: string): Option {
  const id = crypto.randomUUID();

  return {
    id,
    label,
    value: id,
  };
}

export function createDefaultOptions(): Option[] {
  return [createOption("선택지 1"), createOption("선택지 2")];
}

export function createQuestion(order: number): Question {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    type: "SINGLE_CHOICE",
    required: false,
    order,
    options: createDefaultOptions(),
  };
}

export function reindexQuestions(questions: Question[]): Question[] {
  return questions.map((question, index) => ({
    ...question,
    order: index,
  }));
}

export function moveItemById<T extends { id: string }>(
  items: T[],
  activeId: string,
  overId: string,
): T[] {
  const oldIndex = items.findIndex((item) => item.id === activeId);
  const newIndex = items.findIndex((item) => item.id === overId);

  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) {
    return items;
  }

  const next = [...items];
  const [moved] = next.splice(oldIndex, 1);
  next.splice(newIndex, 0, moved);

  return next;
}

export function applyQuestionType(
  question: Question,
  type: QuestionType,
): Question {
  if (!isChoiceType(type)) {
    return { ...question, type };
  }

  const options =
    question.options && question.options.length > 0
      ? question.options
      : createDefaultOptions();

  return { ...question, type, options };
}

export function addOption(options: Option[]): Option[] {
  return [...options, createOption(`선택지 ${options.length + 1}`)];
}

export function removeOption(options: Option[], optionId: string): Option[] {
  if (options.length <= 1) {
    return options;
  }

  return options.filter((option) => option.id !== optionId);
}

export function updateOptionLabel(
  options: Option[],
  optionId: string,
  label: string,
): Option[] {
  return options.map((option) =>
    option.id === optionId ? { ...option, label } : option,
  );
}

export const INITIAL_SURVEY_DRAFT: SurveyDraft = {
  title: "2026 자치회비 사용처 조사",
  description:
    "자치회비를 활용하여 구매했으면 하는 물품에 대한 의견을 조사합니다.",
  questions: [
    {
      id: "q-priority-item",
      title: "자치회비로 가장 먼저 구매했으면 하는 물품은 무엇인가요?",
      description: "하나만 선택해 주세요.",
      type: "SINGLE_CHOICE",
      required: true,
      order: 0,
      options: [
        { id: "opt-snack", label: "간식 / 음료", value: "snack" },
        { id: "opt-supplies", label: "사무 비품", value: "supplies" },
        { id: "opt-lounge", label: "휴게 공간 물품", value: "lounge" },
      ],
    },
    {
      id: "q-reason",
      title: "선택한 이유를 알려주세요.",
      description: "",
      type: "LONG_TEXT",
      required: false,
      order: 1,
    },
  ],
};
