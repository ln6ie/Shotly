"use client";

import { useRef, useEffect, useState } from "react";
import type Konva from "konva";
import type { AppScreen, SingleCanvasInstanceProps } from "@/types";
import { readFileAsDataURL } from "@/actions/uploadHelpers";
import { getScreenDerivedValues } from "@/actions/canvasHelpers";
import CanvasStageRenderer from "./CanvasStageRenderer";
import GradientColorPanel from "./GradientColorPanel";
import InlineTextOverlay from "./InlineTextOverlay";

export default function SingleCanvasInstance({
  screen,
  project,
  isActive,
  onClick,
  onUpload,
  onUpdateText,
  stageRef,
  scale,
}: SingleCanvasInstanceProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const logoFileRef = useRef<HTMLInputElement>(null);
  const backgroundFileRef = useRef<HTMLInputElement>(null);
  const [screenshotImg, setScreenshotImg] = useState<HTMLImageElement | null>(
    null,
  );
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [backgroundImg, setBackgroundImg] = useState<HTMLImageElement | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editingField, setEditingField] = useState<"title" | "subtitle" | null>(
    null,
  );
  const v = getScreenDerivedValues(screen, project);
  const isLandscape = v.layout === "text-left";

  useEffect(() => {
    if (!screen.screenshotUrl) {
      setScreenshotImg(null);
      setLoading(false);
      setError(false);
      return;
    }
    setLoading(true);
    setError(false);
    const img = new window.Image();
    if (screen.screenshotUrl.startsWith("http")) {
      img.crossOrigin = "anonymous";
    }
    img.src = screen.screenshotUrl;
    img.onload = () => {
      setScreenshotImg(img);
      setLoading(false);
    };
    img.onerror = () => {
      setScreenshotImg(null);
      setLoading(false);
      setError(true);
    };
  }, [screen.screenshotUrl]);

  useEffect(() => {
    if (!screen.logoUrl) {
      setLogoImg(null);
      return;
    }
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = screen.logoUrl;
    img.onload = () => setLogoImg(img);
  }, [screen.logoUrl]);

  useEffect(() => {
    if (!screen.backgroundImageUrl) {
      setBackgroundImg(null);
      return;
    }
    const img = new window.Image();
    img.src = screen.backgroundImageUrl;
    img.onload = () => setBackgroundImg(img);
  }, [screen.backgroundImageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onUpload(await readFileAsDataURL(f));
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleLogoFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const f = e.target.files?.[0];
    if (f) onUpdateText({ logoUrl: await readFileAsDataURL(f) });
    if (logoFileRef.current) logoFileRef.current.value = "";
  };

  const handleBackgroundFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file)
      onUpdateText({ backgroundImageUrl: await readFileAsDataURL(file) });
    if (backgroundFileRef.current) backgroundFileRef.current.value = "";
  };

  return (
    <div
      onClick={onClick}
      className={`relative flex-shrink-0 rounded-2xl border bg-white p-3 shadow-premium ${
        isActive
          ? "ring-4 ring-blue-500/40 border-blue-500"
          : "border-slate-200/60 hover:shadow-xl"
      }`}
      style={{ touchAction: "pan-x" }}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={logoFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleLogoFileChange}
      />
      <input
        ref={backgroundFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBackgroundFileChange}
      />

      <div
        className="relative overflow-hidden rounded-xl bg-slate-50"
        style={{ width: v.canvasWidth * scale, height: v.canvasHeight * scale }}
      >
        {loading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 backdrop-blur-sm pointer-events-none">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          </div>
        )}

        {error && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-red-50 p-4 text-center pointer-events-none">
            <span className="text-xs font-semibold text-red-500">
              فشل تحميل الصورة
            </span>
          </div>
        )}

        <CanvasStageRenderer
          screen={screen}
          project={project}
          scale={scale}
          screenshotImg={screenshotImg}
          logoImg={logoImg}
          backgroundImg={backgroundImg}
          derived={v}
          onUploadClick={() => {}}
          onLogoUpload={() => logoFileRef.current?.click()}
          onEditField={setEditingField}
          stageRef={stageRef}
        />

        {editingField === "title" && (
          <InlineTextOverlay
            value={screen.title}
            top={v.titleY * scale}
            left={v.titleX * scale}
            width={v.titleWidth * scale}
            fontSize={20}
            onChange={(val) => onUpdateText({ title: val })}
            onClose={() => setEditingField(null)}
          />
        )}
        {editingField === "subtitle" && (
          <InlineTextOverlay
            value={screen.subtitle}
            top={v.subtitleY * scale}
            left={v.subtitleX * scale}
            width={v.subtitleWidth * scale}
            fontSize={14}
            onChange={(val) => onUpdateText({ subtitle: val })}
            onClose={() => setEditingField(null)}
          />
        )}
      </div>

      {isActive && (
        <GradientColorPanel
          colorTop={v.colorTop}
          colorBottom={v.colorBottom}
          stageRef={stageRef}
          screenId={screen.id}
          onGradientChange={(g) => onUpdateText({ backgroundColor: g })}
          onChangeImage={() => fileRef.current?.click()}
          onChangeLogo={() => logoFileRef.current?.click()}
          onChangeBackground={() => backgroundFileRef.current?.click()}
        />
      )}
    </div>
  );
}
