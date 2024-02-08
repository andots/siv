import { basename, dirname, sep } from "@tauri-apps/api/path";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const joinOsPaths = (paths: string[]) => {
  return paths.join(sep);
};

export const isNotEmpty = (str: string | undefined | null) => {
  return str != null && str !== "";
};

export const isEmpty = (str: string | undefined | null) => {
  return str == null || str == undefined || str === "";
};

export const getFileName = async (path: string) => {
  return await basename(path);
};

export const getDirName = async (path: string) => {
  return await dirname(path);
};

export const logError = (e: unknown) => {
  console.error(e);
};
