import { getMatches } from "@tauri-apps/api/cli";
import { TauriEvent, type Event } from "@tauri-apps/api/event";
import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { exit } from "@tauri-apps/api/process";
import { checkUpdate } from "@tauri-apps/api/updater";
import { appWindow } from "@tauri-apps/api/window";
import { attachConsole } from "tauri-plugin-log-api";

import * as invokes from "~/invokes";
import { logDebug, logError, logInfo } from "~/lib/utils";
import { useAppState, useUpdaterState } from "~/store";

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

  // Set default title
  await appState.actions.setDefaultTitle().catch(logError);

  // Load image with getMatches if window is main
  if (invokes.isMainWindow()) {
    await getMatches()
      .then((matches) => {
        const match = matches.args["file"];
        if (match != null && match.occurrences == 1 && typeof match.value === "string") {
          appState.actions.setCurrentFilePath(match.value).catch(logError);
        }
      })
      .catch(logError);
  }

  appWindow
    .listen(TauriEvent.WINDOW_FILE_DROP, (event: Event<TauriEvent.WINDOW_FILE_DROP>) => {
      if (event.payload.length == 1) {
        appState.actions.setCurrentFilePath(event.payload[0]).catch(logError);
      }
    })
    .catch(logError);
};

export const initUpdater = async () => {
  const { updaterState } = useUpdaterState();
  if (invokes.isMainWindow()) {
    const result = await checkUpdate();
    const { shouldUpdate, manifest } = result;
    if (manifest) {
      await updaterState.actions.setCurrentVersion();
      updaterState.actions.setNewVersion(manifest.version);
    }
    if (shouldUpdate) {
      updaterState.actions.setShouldUpdate(true);
    } else {
      updaterState.actions.setShouldUpdate(false);
    }
  }
};
