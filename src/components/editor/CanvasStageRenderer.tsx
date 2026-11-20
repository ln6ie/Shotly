"use client";

import {
  Stage,
  Layer,
  Rect,
  Circle,
  Text,
  Image as KonvaImage,
} from "react-konva";
import type { CanvasStageRendererProps } from "@/types";

export default function CanvasStageRenderer({
  screen,
  project,
  scale,
  screenshotImg,
  logoImg,
  backgroundImg,
  derived: v,
  onUploadClick,
  onLogoUpload,
  onEditField,
  stageRef,
}: CanvasStageRendererProps & { stageRef: React.RefObject<any> }) {
  const cw = v.canvasWidth;
  const ch = v.canvasHeight;
  const dw = v.deviceScreenWidth;
  const dh = v.deviceScreenHeight;
  const ds = v.deviceScale;
  const hasLogo = Boolean(logoImg);
  const logoSize = Math.min(cw * 0.18, ch * 0.1);
  const logoX = (cw - logoSize) / 2;
  const logoY = 64;
  const contentOffset = hasLogo ? logoSize + 120 : 0;
  const contentScale = hasLogo && !v.isHideDevice ? 0.82 : 1;
  const deviceWidth = dw * contentScale;
  const deviceHeight = dh * contentScale;
  const deviceX = v.deviceX + (dw - deviceWidth) / 2;
  const deviceY = v.deviceY + contentOffset;
  const titleY = v.titleY + contentOffset;
  const subtitleY = v.subtitleY + contentOffset;

  return (
    <Stage
      ref={stageRef}
      width={cw * scale}
      height={ch * scale}
      scaleX={scale}
      scaleY={scale}
      preventDefault={false}
      style={{ touchAction: "pan-x" }}
    >
      <Layer listening={false}>
        {backgroundImg ? (
          <KonvaImage
            image={backgroundImg}
            x={0}
            y={0}
            width={cw}
            height={ch}
          />
        ) : (
          <Rect
            x={0}
            y={0}
            width={cw}
            height={ch}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: 0, y: ch }}
            fillLinearGradientColorStops={v.colorStops}
          />
        )}
      </Layer>

      {!v.isHideDevice && (
        <Layer>
          {screenshotImg ? (
            <KonvaImage
              image={screenshotImg}
              x={deviceX}
              y={deviceY}
              width={deviceWidth}
              height={deviceHeight}
              cornerRadius={v.deviceRadius * ds}
              onClick={onUploadClick}
            />
          ) : (
            <Rect
              x={deviceX}
              y={deviceY}
              width={deviceWidth}
              height={deviceHeight}
              fill="rgba(255,255,255,0.15)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={4}
              dash={[20, 10]}
              cornerRadius={v.deviceRadius * ds}
              onClick={onUploadClick}
            />
          )}
        </Layer>
      )}

      {v.showDevice && (
        <Layer>
          <Rect
            x={deviceX}
            y={deviceY}
            width={deviceWidth}
            height={deviceHeight}
            cornerRadius={v.deviceRadius * ds * contentScale}
            fill="transparent"
            stroke={v.frameColor}
            strokeWidth={Math.round(
              ds *
                (project.globalDeviceType === "android-ultra"
                  ? 18
                  : project.globalDeviceType === "android-punch"
                    ? 22
                    : project.globalDeviceType === "iphone-classic"
                      ? 28
                      : 24),
            )}
            onClick={onUploadClick}
          />
          {project.globalDeviceType === "iphone-pro" && (
            <Rect
              x={deviceX + deviceWidth / 2 - 160 * ds * contentScale}
              y={deviceY + 36 * ds * contentScale}
              width={320 * ds * contentScale}
              height={96 * ds * contentScale}
              cornerRadius={48 * ds * contentScale}
              fill="#000000"
              onClick={onUploadClick}
            />
          )}
          {project.globalDeviceType === "iphone-classic" && (
            <Rect
              x={deviceX + deviceWidth / 2 - 160 * ds * contentScale}
              y={deviceY}
              width={320 * ds * contentScale}
              height={75 * ds * contentScale}
              cornerRadius={[
                0,
                0,
                26 * ds * contentScale,
                26 * ds * contentScale,
              ]}
              fill="#000000"
              onClick={onUploadClick}
            />
          )}
          {(project.globalDeviceType === "android-ultra" ||
            project.globalDeviceType === "android-punch") && (
            <Circle
              x={deviceX + deviceWidth / 2}
              y={deviceY + 46 * ds * contentScale}
              radius={20 * ds * contentScale}
              fill="#000000"
              onClick={onUploadClick}
            />
          )}
        </Layer>
      )}

      <Layer>
        {logoImg && (
          <KonvaImage
            image={logoImg}
            x={logoX}
            y={logoY}
            width={logoSize}
            height={logoSize}
            cornerRadius={logoSize * 0.22}
            onClick={onLogoUpload}
          />
        )}
        <Text
          text={screen.title}
          x={v.titleX}
          y={titleY}
          width={v.titleWidth}
          fontSize={90}
          fill={v.activeTitleColor}
          fontStyle="bold"
          fontFamily="Cairo"
          align={v.titleAlign}
          onClick={() => onEditField("title")}
        />
        <Text
          text={screen.subtitle}
          x={v.subtitleX}
          y={subtitleY}
          width={v.subtitleWidth}
          fontSize={52}
          fill={v.activeSubtitleColor}
          fontStyle="bold"
          fontFamily="Cairo"
          align={v.titleAlign}
          onClick={() => onEditField("subtitle")}
        />
      </Layer>
    </Stage>
  );
}
