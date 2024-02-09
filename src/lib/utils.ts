import { basename, dirname, sep } from "@tauri-apps/api/path";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { debug, error, info, trace, warn } from "tauri-plugin-log-api";

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

export const logError = (e: string) => {
  error(e).catch(() => {});
};

export const logDebug = (e: string) => {
  debug(e).catch(() => {});
};

export const logWarn = (e: string) => {
  warn(e).catch(() => {});
};

export const logInfo = (e: string) => {
  info(e).catch(() => {});
};

export const logTrace = (e: string) => {
  trace(e).catch(() => {});
};
