import { getName, getVersion } from "@tauri-apps/api/app";
import { readDir } from "@tauri-apps/api/fs";
import { dirname, extname, sep } from "@tauri-apps/api/path";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDefaultAppTitle = async () => {
  const name = await getName();
  const version = await getVersion();
  return `${name} - v${version}`;
};

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
  return images.sort(); // return sorted array by ASC
};

export const joinOsPaths = (paths: string[]) => {
  return paths.join(sep);
};
