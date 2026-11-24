import type {
  GradientColors,
  LayoutPositions,
  AppScreen,
  PanoramicProjectState,
  ScreenDerivedValues,
} from "@/types";
import { FRAME_COLORS } from "@/lib/frameConfig";

export function getDeviceRadius(type: string): number {
  if (type === "android-ultra") return 22;
  if (type === "iphone-classic") return 130;
  if (type === "android-punch") return 94;
  return 110;
}

export function colorToHex(color: string): string {
  if (!color) return "#4f46e5";
  if (color.startsWith("#")) {
    if (color.length === 4 || color.length === 5) {
      return (
        "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
      );
    }
    return color.substring(0, 7);
  }
  if (color.startsWith("rgb")) {
    const rgbVals = color.match(/\d+/g);
    if (rgbVals && rgbVals.length >= 3) {
      const r = parseInt(rgbVals[0], 10);
      const g = parseInt(rgbVals[1], 10);
      const b = parseInt(rgbVals[2], 10);
      return (
        "#" +
        [r, g, b]
          .map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
          })
          .join("")
      );
    }
  }
  return "#4f46e5";
}

export function parseGradientColors(backgroundColor: string): GradientColors {
  const matches = backgroundColor.match(
    /#(?:[0-9a-fA-F]{3,4}){1,2}\b|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g,
  ) || ["#4f46e5"];
  const colorTop = colorToHex(matches[0] || "#4f46e5");
  const colorBottom = colorToHex(matches[1] || matches[0] || "#7c3aed");
  return {
    colorTop,
    colorBottom,
    colorStops: [0, colorTop, 1, colorBottom] as unknown as number[],
  };
}

export function getCanvasDimensions(layout: string): {
  width: number;
  height: number;
} {
  if (layout === "text-left") return { width: 2556, height: 1179 };
  return { width: 1179, height: 2556 };
}

export function getLayoutPositions(layout: string): LayoutPositions {
  if (layout === "text-left") {
    return {
      titleX: 800,
      titleY: 320,
      subtitleX: 800,
      subtitleY: 610,
      deviceX: 120,
      deviceY: 100,
      badgeY: 40,
      titleWidth: 1640,
      subtitleWidth: 1640,
      logoY: 200,
    };
  }
  let titleX = 76;
  let titleY = 133;
  let subtitleY = 257;
  let deviceY = 361;
  let badgeY = 57;
  if (layout === "text-bottom") {
    deviceY = 76;
    titleY = 2289;
    subtitleY = 2404;
    badgeY = 2214;
  } else if (layout === "hero-center") {
    titleY = 1112;
    subtitleY = 1264;
    badgeY = 1026;
  }
  return {
    titleX,
    titleY,
    subtitleX: titleX,
    subtitleY,
    deviceX: 98,
    deviceY,
    badgeY,
    titleWidth: 1028,
    subtitleWidth: 1028,
    logoY: 0,
  };
}

export function getScreenDerivedValues(
  screen: AppScreen,
  project: PanoramicProjectState,
): ScreenDerivedValues {
  const layout = screen.config?.layout || "text-top";
  const positions = getLayoutPositions(layout);
  const { colorTop, colorBottom, colorStops } = parseGradientColors(
    screen.backgroundColor,
  );
  const canvas = getCanvasDimensions(layout);
  const isLandscape = layout === "text-left";
  const deviceScale = isLandscape ? 0.44 : 0.95;
  return {
    layout,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    deviceScreenWidth: Math.round(1035 * deviceScale),
    deviceScreenHeight: Math.round(2240 * deviceScale),
    deviceScale,
    isHideDevice: screen.config?.hideDevice || false,
    showDevice: project.showDeviceFrame && !screen.config?.hideDevice,
    titleAlign: (screen.config?.textAlign || "center") as CanvasTextAlign,
    activeTitleColor: screen.config?.titleColor || project.globalTitleColor,
    activeSubtitleColor:
      screen.config?.subtitleColor || project.globalSubtitleColor,
    frameColor:
      FRAME_COLORS[project.globalFrameColor] ||
      project.globalFrameColor ||
      FRAME_COLORS.titanium,
    deviceRadius: getDeviceRadius(project.globalDeviceType),
    colorTop,
    colorBottom,
    colorStops,
    ...positions,
    badge: screen.config?.badge,
    badgeBg: screen.config?.badgeBg || "#000000",
    badgeColor: screen.config?.badgeColor || "#ffffff",
    decoration: screen.config?.decoration,
  };
}
