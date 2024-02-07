import { invoke } from "@tauri-apps/api";

export const invokeCreateWindow = async (label: string, path: string) => {
  return await invoke("create_window", { label, path });
};

export const invokeGetDefaultAppTitle = async () => {
  return await invoke<string>("get_default_app_title");
};
