"use client";

import { usePathname } from "next/navigation";
import { ShotlyLogo } from "./Logo";
import { VisitorCounter } from "./VisitorCounter";
import Link from "next/link";

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/editor")) return null;

  return (
    <footer className="border-t border-slate-100 bg-[#F5F5F7] py-12 text-slate-500">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
          <Link href="/" className="transition-transform hover:scale-105">
            <ShotlyLogo size={32} />
          </Link>
          <div className="flex flex-col text-center md:items-start md:text-right">
            <span className="text-sm font-bold text-slate-800">
              Shotly
            </span>
            <span className="text-[10px] text-slate-400">
              منصة تصدير شاشات التطبيق للمتاجر
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-600">
          <span>بدون تسجيل</span>
          <span>مجاني بالكامل</span>
          <span>بدون إعلانات</span>
        </div>
        <div className="flex flex-col items-center gap-2 md:items-end">
          <span className="text-[10px] text-slate-400">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
          </span>
          <span className="whitespace-nowrap rounded-full bg-[#007AFF] px-2 py-0.5 text-[8px] font-bold text-white shadow-sm sm:px-3 sm:py-1 sm:text-[9px]">
            <VisitorCounter className="text-white" />
          </span>
        </div>
      </div>
    </footer>
  );
}
