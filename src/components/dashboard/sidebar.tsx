"use client";

import { ClipboardList } from "lucide-react";

import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type SidebarProps = {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-6 py-5">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <ClipboardList className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold tracking-tight">
          Make Survey
        </p>
        <p className="truncate text-xs text-muted-foreground">관리자</p>
      </div>
    </div>
  );
}

export function Sidebar({ mobileOpen, onMobileOpenChange }: SidebarProps) {
  return (
    <>
      <aside className="hidden w-60 shrink-0 border-r border-sidebar-border bg-sidebar md:flex md:flex-col">
        <Brand />
        <SidebarNav />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="w-60 bg-sidebar p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>메뉴</SheetTitle>
            <SheetDescription>관리자 페이지 탐색</SheetDescription>
          </SheetHeader>
          <Brand />
          <SidebarNav onNavigate={() => onMobileOpenChange(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
