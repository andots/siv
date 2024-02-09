import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { exit } from "@tauri-apps/api/process";
import { appWindow, getCurrent } from "@tauri-apps/api/window";
import { debug, attachConsole } from "tauri-plugin-log-api";

import { logDebug, logError } from "~/lib/utils";

export const initApp = async () => {
  if (import.meta.env.DEV) {
    await attachConsole();
    await debug("initApp");
  }

  logDebug(`Register Global shortcuts: ${appWindow.label}`);
  unregisterAll().catch(logError);

  // Control+Q terminate process
  register("CommandOrControl+Q", () => {
    exit(0).catch(logError);
  }).catch(logError);

  // Control+W close window
  register("CommandOrControl+W", () => {
    getCurrent().close().catch(logError);
    // appWindow.close().catch(logError);
  }).catch(logError);
};
