import { getMatches } from "@tauri-apps/api/cli";
import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { exit } from "@tauri-apps/api/process";
import { appWindow } from "@tauri-apps/api/window";
import { attachConsole } from "tauri-plugin-log-api";

import * as invokes from "~/invokes";
import { logDebug, logError, logInfo } from "~/lib/utils";
import { useAppState } from "~/store";

export const initApp = async () => {
  if (import.meta.env.DEV) {
    await attachConsole();
  }

  const { appState } = useAppState();

  logInfo("initApp");

  logDebug("Register Global shortcuts");
  await unregisterAll().catch(logError);

  // Control+Q - Terminate process
  await register("CommandOrControl+Q", () => {
    exit(0).catch(logError);
  }).catch(logError);

  // Control + O - Open new window
  await register("CommandOrControl+O", () => {
    invokes.createNewWindow();
  }).catch(logError);

  // Control + T - Tile windows
  await register("CommandOrControl+T", () => {
    // TODO
  }).catch(logError);

  // Set default title
  await appState.actions.setDefaultTitle().catch(logError);

  // Load image with getMatches if window is main
  if (appWindow.label === "main") {
    await getMatches()
      .then((matches) => {
        const match = matches.args["file"];
        if (match != null && match.occurrences == 1 && typeof match.value === "string") {
          appState.actions.setCurrentFilePath(match.value).catch(logError);
        }
      })
      .catch(logError);
  }
};
