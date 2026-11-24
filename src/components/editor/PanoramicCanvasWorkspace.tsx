"use client";

import { useRef, useState, useLayoutEffect } from "react";
import type { AppScreen, PanoramicCanvasWorkspaceProps } from "@/types";
import { updateScreen } from "@/actions/projectState";
import { getCanvasDimensions } from "@/actions/canvasHelpers";
import SingleCanvasInstance from "./SingleCanvasInstance";

export default function PanoramicCanvasWorkspace({
  project,
  stageRefs,
  onChange,
}: PanoramicCanvasWorkspaceProps) {
  const previewAreaRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.2);
  const activeIndex = Math.max(
    0,
    project.screens.findIndex((screen) => screen.id === project.activeScreenId),
  );
  const activeScreen = project.screens[activeIndex];

  useLayoutEffect(() => {
    if (!activeScreen) return;
    const isMobile = window.innerWidth < 768;
    const layout = activeScreen.config?.layout || "text-top";
    const isLandscape = layout === "text-left";
    const { width: canvasWidth, height: canvasHeight } =
      getCanvasDimensions(layout);
    const availableWidth =
      window.innerWidth - (isMobile ? (isLandscape ? 144 : 104) : 160);
    const availableHeight = window.innerHeight - (isMobile ? 300 : 240);
    const fitScale = Math.min(
      availableWidth / canvasWidth,
      availableHeight / canvasHeight,
    );
    setScale(fitScale);
  }, [activeScreen?.id, activeScreen?.config?.layout]);

  const handleUpload = (screenId: string, dataUrl: string) => {
    onChange(updateScreen(project, screenId, { screenshotUrl: dataUrl }));
  };

  const handleUpdateText = (screenId: string, updates: Partial<AppScreen>) => {
    onChange(updateScreen(project, screenId, updates));
  };

  if (!activeScreen) return null;

  return (
    <section className="relative flex h-full min-h-0 w-full flex-col items-center gap-4 px-5 pb-24 sm:gap-6 sm:px-6 sm:pb-5">
      <nav
        aria-label="اختيار الشاشة"
        className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex w-auto items-center justify-center gap-2 sm:static sm:gap-3"
      >
        {project.screens.map((screen, index) => {
          const isActive = screen.id === activeScreen.id;
          return (
            <button
              key={screen.id}
              type="button"
              onClick={() =>
                onChange({ ...project, activeScreenId: screen.id })
              }
              aria-label={`الشاشة ${index + 1}`}
              aria-current={isActive ? "step" : undefined}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-bold transition-colors sm:h-12 sm:w-12 sm:text-base ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </nav>

      <div
        ref={previewAreaRef}
        className="flex min-h-0 w-full flex-1 items-center justify-center overflow-visible px-1 sm:px-0"
      >
        <SingleCanvasInstance
          key={activeScreen.id}
          screen={activeScreen}
          project={project}
          isActive
          onClick={() =>
            onChange({ ...project, activeScreenId: activeScreen.id })
          }
          onUpload={(url) => handleUpload(activeScreen.id, url)}
          onUpdateText={(updates) => handleUpdateText(activeScreen.id, updates)}
          stageRef={stageRefs[activeIndex]}
          scale={scale}
        />
      </div>
    </section>
  );
}
