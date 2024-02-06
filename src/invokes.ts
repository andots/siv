import { invoke } from "@tauri-apps/api";

export const invokeApplySetShadow = async (label: string) => {
  return await invoke("apply_set_shadow", { label });
};

export const invokeCreateWindow = async (label: string, path: string) => {
  return await invoke("create_window", { label, path });
};
