"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SurveyBasicInfoProps = {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
};

export function SurveyBasicInfo({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: SurveyBasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>설문 기본 정보</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="survey-title">설문 제목</Label>
          <Input
            id="survey-title"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="설문 제목을 입력하세요"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="survey-description">설문 설명</Label>
          <Textarea
            id="survey-description"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="설문 설명을 입력하세요"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
