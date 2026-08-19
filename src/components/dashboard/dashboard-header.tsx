"use client";

import { ClipboardList, Menu } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type DashboardHeaderProps = {
  onOpenMobileNav: () => void;
};

export function DashboardHeader({ onOpenMobileNav }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b bg-background px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={onOpenMobileNav}
          aria-label="메뉴 열기"
        >
          <Menu />
        </Button>
        <div className="flex min-w-0 items-center gap-2 md:hidden">
          <ClipboardList className="size-4 shrink-0" />
          <span className="truncate text-sm font-semibold">Make Survey</span>
        </div>
        <p className="hidden truncate text-sm font-medium text-muted-foreground md:block">
          Survey Builder & Analytics
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium leading-none">관리자</p>
          <p className="mt-1 text-xs text-muted-foreground">admin@example.com</p>
        </div>
        <Avatar size="sm">
          <AvatarFallback>관</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
