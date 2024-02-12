import { onMount, type Component, Show } from "solid-js";

import { makeEventListener } from "@solid-primitives/event-listener";
import { exit } from "@tauri-apps/api/process";

import DropArea from "~/components/DropArea";
import TitleBar from "~/components/TitleBar";
import UpdaterDialog from "~/components/UpdaterDialog";
import Viewer from "~/components/Viewer";
import { initApp, initUpdater } from "~/init";
import * as invokes from "~/invokes";
import { isEmpty, isNotEmpty, logError } from "~/lib/utils";
import { useAppState } from "~/store";

await initApp();

const App: Component = () => {
  const { appState } = useAppState();

  onMount(() => {
    initUpdater().catch(logError);
  });

  // Make eventlistener for keyboard shortcuts
  onMount(() => {
    makeEventListener(window, "keydown", (e) => {
      if (e.key === "w" && (e.ctrlKey || e.metaKey)) {
        invokes.closeWindow();
      } else if (e.key === "t" && (e.ctrlKey || e.metaKey)) {
        invokes.tileWindows();
      } else if (e.key === "o" && (e.ctrlKey || e.metaKey)) {
        invokes.createNewWindow();
      } else if (e.key === "q" && (e.ctrlKey || e.metaKey)) {
        exit(0).catch(logError);
      }
    });
  });

  return (
    <div class="overflow-hidden flex flex-col select-none">
      <TitleBar />
      <Show when={isNotEmpty(appState.getters.currentFilePath())}>
        <Viewer src={appState.getters.currentFilePath()!} />
      </Show>
      <Show when={isEmpty(appState.getters.currentFilePath())}>
        <DropArea />
      </Show>
      <UpdaterDialog />
    </div>
  );
};

export default App;
