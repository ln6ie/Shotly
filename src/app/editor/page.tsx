"use client";

import { useState, useRef, useCallback } from "react";
import type Konva from "konva";
import {
  createEmptyProject,
  updateScreen,
  getActiveScreen,
} from "@/actions/projectState";
import { exportPanoramicSet } from "@/actions/exportCanvas";
import TopFloatingDashboard from "@/components/editor/TopFloatingDashboard";
import PanoramicCanvasWorkspace from "@/components/editor/PanoramicCanvasWorkspace";
import type { AppScreen } from "@/types";

// الصفحة الرئيسية للمحرر لإدارة الشاشات الخمس
export default function EditorPage() {
  const [project, setProject] = useState(createEmptyProject);

  const stageRefs = useRef([
    useRef<Konva.Stage | null>(null),
    useRef<Konva.Stage | null>(null),
    useRef<Konva.Stage | null>(null),
    useRef<Konva.Stage | null>(null),
    useRef<Konva.Stage | null>(null),
  ]).current;

  const handleUpdateScreen = useCallback(
    (screenId: string, updates: Partial<AppScreen>) => {
      setProject((prev) => updateScreen(prev, screenId, updates));
    },
    [],
  );

  const handleExportAll = useCallback(() => {
    exportPanoramicSet(stageRefs, project.screens);
  }, [stageRefs, project.screens]);

  const activeScreen = getActiveScreen(project);

  return (
    <div className="editor-screen relative flex min-h-screen w-screen flex-col bg-[#F8FAFC] overflow-x-hidden pt-28 max-md:min-h-[100dvh] max-md:overflow-visible max-md:pt-24">
      <TopFloatingDashboard
        project={project}
        activeScreen={activeScreen}
        onChange={setProject}
        onUpdateScreen={handleUpdateScreen}
        onExportAll={handleExportAll}
      />
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-visible">
        <PanoramicCanvasWorkspace
          project={project}
          stageRefs={stageRefs}
          onChange={setProject}
        />
      </div>
    </div>
  );
}
