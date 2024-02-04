import { readDir } from "@tauri-apps/api/fs";
import { dirname, extname } from "@tauri-apps/api/path";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImagesInDirectory = async (filePath: string) => {
  const targetDir = await dirname(filePath);
  const entries = await readDir(targetDir);
  const images: string[] = [];
  for (const entry of entries) {
    const ext = (await extname(entry.path)).toLowerCase();
    if (
      entry.name &&
      (ext === "jpg" ||
        ext === "jpeg" ||
        ext === "jpe" ||
        ext === "jif" ||
        ext === "jfif" ||
        ext === "png" ||
        ext === "apng" ||
        ext === "avif" ||
        ext === "svg" ||
        ext === "webp" ||
        ext === "gif")
    ) {
      images.push(entry.name);
    }
  }
  // order given filePath as head
  return images;
};
