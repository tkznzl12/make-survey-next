# 설문조사 제작 및 결과 대시보드

설문을 직접 만들고, 응답을 모으고, 결과를 분석할 수 있는 Survey Builder & Analytics 서비스입니다.


### 작업기간

- 26.08.17~

## 무엇을 만들고 있나

구글 폼처럼 문항을 조립해서 설문을 만들고, 링크를 공유해 응답을 받은 뒤, 문항 타입별로 결과를 한눈에 보는 웹 서비스를 만들고 있습니다.

- 설문 생성·수정
- 동적 문항 생성 (단답, 장문, 단일/복수 선택, 드롭다운, 평점, 척도)
- 선택지 관리
- 조건부 문항 (예: Q1에 "과자"가 포함되면 Q2 표시)
- 설문 미리보기, 발행, 공유
- 응답 수집
- 응답 결과 분석·시각화

## 현재 진행 상태

Next.js 프로젝트 뼈대와 Prisma 데이터 모델(설문, 문항, 선택지, 규칙, 응답)을 정의한 단계입니다.  
설문 CRUD, Builder UI, 응답 페이지, 분석 대시보드는 아직 구현 전입니다.

## 기술 스택

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL
- React Hook Form + Zod
- Recharts, dnd-kit, Lucide React

## 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.
