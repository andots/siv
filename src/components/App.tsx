import { onMount, type Component, Show } from "solid-js";

import { TauriEvent, type Event } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";

import DropArea from "~/components/DropArea";
import TitleBar from "~/components/TitleBar";
import Viewer from "~/components/Viewer";
import { initApp } from "~/init";
import { isEmpty, isNotEmpty, logError } from "~/lib/utils";
import { useAppState } from "~/store";

await initApp();

const App: Component = () => {
  const { appState } = useAppState();

  onMount(() => {
    appWindow
      .listen(TauriEvent.WINDOW_FILE_DROP, (event: Event<TauriEvent.WINDOW_FILE_DROP>) => {
        if (event.payload.length == 1) {
          appState.actions.setCurrentFilePath(event.payload[0]).catch(logError);
        }
      })
      .catch(logError);
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
    </div>
  );
};

export default App;
