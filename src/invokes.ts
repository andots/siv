import { invoke } from "@tauri-apps/api/core";

export const invokeCreateWindow = async (label: string, path: string) => {
  return await invoke("create_window", { label, path });
};
