import { invoke } from "@tauri-apps/api";

export const createWindow = async (label: string, path: string) => {
  return await invoke("create_window", { label, path });
};

export const getDefaultAppTitle = async () => {
  return await invoke<string>("get_default_app_title");
};

export const getImagesInDir = async (path: string) => {
  return await invoke<string[]>("get_images_in_dir", { path });
};
