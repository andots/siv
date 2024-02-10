import { onMount, type Component, Show } from "solid-js";

import { makeEventListener } from "@solid-primitives/event-listener";

import DropArea from "~/components/DropArea";
import TitleBar from "~/components/TitleBar";
import UpdaterDialog from "~/components/UpdaterDialog";
import Viewer from "~/components/Viewer";
import { initApp } from "~/init";
import * as invokes from "~/invokes";
import { isEmpty, isNotEmpty } from "~/lib/utils";
import { useAppState } from "~/store";

await initApp();

const App: Component = () => {
  const { appState } = useAppState();

  // ! Make window close eventlistener
  onMount(() => {
    makeEventListener(window, "keydown", (e) => {
      if (e.key === "w" && (e.ctrlKey || e.metaKey)) {
        invokes.closeWindow();
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
