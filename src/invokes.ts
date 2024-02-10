import { invoke } from "@tauri-apps/api";
import { getName, getVersion } from "@tauri-apps/api/app";
import { appWindow } from "@tauri-apps/api/window";
import { ulid } from "ulidx";

import { logError } from "~/lib/utils";

export const createWindow = async (label: string, path: string) => {
  return await invoke("create_window", { label, path });
};

export const getDefaultAppTitle = async () => {
  return await invoke<string>("get_default_app_title");
};

export const getImagesInDir = async (path: string) => {
  return await invoke<string[]>("get_images_in_dir", { path });
};

export const createNewWindow = () => {
  createWindow(`w-${ulid()}`, "index.html").catch(logError);
};

export const closeWindow = () => {
  appWindow.close().catch(logError);
};

export const minimize = () => {
  appWindow.minimize().catch(logError);
};

export const toggleMaximize = () => {
  appWindow.toggleMaximize().catch(logError);
};

export const setTitleToAppWindow = (title: string) => {
  appWindow.setTitle(title).catch(logError);
};

export const getAppVersion = async () => {
  return await getVersion();
};

export const getAppName = async () => {
  return await getName();
};

export const isMainWindow = () => {
  return appWindow.label === "main";
};

export const tileWindows = () => {
  //
};
