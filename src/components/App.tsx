import { onMount, type Component, Show } from "solid-js";

import { getMatches } from "@tauri-apps/api/cli";
import { TauriEvent, type Event } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";

import DropArea from "~/components/DropArea";
import TitleBar from "~/components/TitleBar";
import Viewer from "~/components/Viewer";
import { isEmpty, isNotEmpty, logError } from "~/lib/utils";
import { useAppState } from "~/store";

const App: Component = () => {
  const { appState } = useAppState();

  onMount(() => {
    appState.actions.setDefaultTitle().catch(logError);
  });

  onMount(() => {
    appWindow
      .listen(TauriEvent.WINDOW_FILE_DROP, (event: Event<TauriEvent.WINDOW_FILE_DROP>) => {
        if (event.payload.length == 1) {
          appState.actions.setCurrentFilePath(event.payload[0]).catch(logError);
        }
      })
      .catch(logError);
  });

  onMount(() => {
    getMatches()
      .then((matches) => {
        const match = matches.args["file"];
        if (match != null && match.occurrences == 1 && typeof match.value === "string") {
          appState.actions.setCurrentFilePath(match.value).catch(logError);
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
