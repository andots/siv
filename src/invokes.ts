import { invoke } from "@tauri-apps/api/core";

export const invokeCreateWindow = async (label: string, path: string) => {
  return await invoke<string>("create_window", { label, path });
};
