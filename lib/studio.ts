export const MAX_LAYOUT_BYTES = 25 * 1024 * 1024;

export const ACCEPTED_LAYOUT_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg", ".dxf"] as const;

export const ACCEPTED_LAYOUT_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/dxf",
  "application/x-dxf",
  "image/vnd.dxf",
] as const;

export type MeasurementUnit = "ft" | "m";

export type StudioFile = {
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  isSample?: boolean;
};

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function layoutExtension(name: string) {
  const index = name.lastIndexOf(".");
  return index >= 0 ? name.slice(index).toLowerCase() : "";
}

export function isAcceptedLayout(file: Pick<File, "name" | "type">) {
  const extension = layoutExtension(file.name);
  if (ACCEPTED_LAYOUT_EXTENSIONS.includes(extension as (typeof ACCEPTED_LAYOUT_EXTENSIONS)[number])) {
    return true;
  }

  return ACCEPTED_LAYOUT_TYPES.includes(file.type as (typeof ACCEPTED_LAYOUT_TYPES)[number]);
}

export function fileBadge(name: string) {
  const extension = layoutExtension(name).replace(".", "");
  if (extension === "jpeg") return "JPG";
  return (extension || "2D").toUpperCase();
}

export function defaultFloorHeight(unit: MeasurementUnit) {
  return unit === "ft" ? 10 : 3;
}

export function convertFloorHeight(height: number, from: MeasurementUnit, to: MeasurementUnit) {
  if (from === to) return height;
  if (to === "m") return Math.round((height / 3.28084) * 10) / 10;
  return Math.round(height * 3.28084 * 10) / 10;
}

export function wallHeightFromFloor(height: number, unit: MeasurementUnit) {
  const meters = unit === "m" ? height : height / 3.28084;
  return Math.min(52, Math.max(24, meters * 12));
}

export function heightBounds(unit: MeasurementUnit) {
  return unit === "ft"
    ? { min: 8, max: 14, step: 0.5 }
    : { min: 2.4, max: 4.2, step: 0.1 };
}
