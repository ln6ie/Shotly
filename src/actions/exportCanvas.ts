import type Konva from "konva";
import type { AppScreen } from "@/types";
import { getCanvasDimensions } from "@/actions/canvasHelpers";

type ExportSize = { width: number; height: number };

function stageToDataURL(stage: Konva.Stage, size: ExportSize): string {
  const original = {
    width: stage.width(),
    height: stage.height(),
    scaleX: stage.scaleX(),
    scaleY: stage.scaleY(),
  };

  try {
    stage.width(size.width);
    stage.height(size.height);
    stage.scale({ x: 1, y: 1 });
    stage.draw();

    return stage.toDataURL({ mimeType: "image/png", pixelRatio: 1 });
  } finally {
    stage.width(original.width);
    stage.height(original.height);
    stage.scale({ x: original.scaleX, y: original.scaleY });
    stage.draw();
  }
}

// Export every available screen at its exact store-ready dimensions.
export async function exportPanoramicSet(
  stageRefs: React.RefObject<Konva.Stage | null>[],
  screens: AppScreen[],
): Promise<void> {
  for (let index = 0; index < stageRefs.length; index++) {
    const stage = stageRefs[index].current;
    const screen = screens[index];
    if (!stage || !screen) continue;

    try {
      const size = getCanvasDimensions(screen.config?.layout || "text-top");
      const dataURL = stageToDataURL(stage, size);

      const link = document.createElement("a");
      link.download = `shotly-screen-${index + 1}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (error) {
      console.error(`PNG export failed for screen ${index + 1}:`, error);
    }
  }
}

// Export a single screen at its exact store-ready dimensions.
export function exportSingleScreen(
  stage: Konva.Stage | null,
  size: ExportSize,
  filename = "shotly-screen.png",
): void {
  if (!stage) return;
  try {
    const dataURL = stageToDataURL(stage, size);

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("PNG export failed:", error);
  }
}
