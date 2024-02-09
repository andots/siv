import { debug, attachConsole } from "tauri-plugin-log-api";

export const initApp = async () => {
  if (import.meta.env.DEV) {
    await attachConsole();
    await debug("initApp");
  }
};
