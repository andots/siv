import { createEffect, on, onMount, type Component } from "solid-js";

import { getMatches } from "@tauri-apps/api/cli";
import { TauriEvent, type Event } from "@tauri-apps/api/event";
import { basename, dirname } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

import TitleBar from "~/components/TitleBar";
import Viewer from "~/components/Viewer";
import { getDefaultAppTitle } from "~/lib/utils";
import { useDir, useFilePath, useTitle } from "~/store";

const App: Component = () => {
  const { dir, setDir } = useDir();
  const { setTitle } = useTitle();
  const { setFilePath } = useFilePath();

  createEffect(
    on(dir, () => {
      console.log(dir());
    })
  );

  onMount(() => {
    getDefaultAppTitle()
      .then((title) => setTitle(title))
      .then((title) => appWindow.setTitle(title))
      .catch((e) => console.log(e));
  });

  onMount(() => {
    appWindow
      .listen(TauriEvent.WINDOW_FILE_DROP, (event: Event<TauriEvent.WINDOW_FILE_DROP>) => {
        if (event.payload.length == 1) {
          updateFilePath(event.payload[0]).catch((e) => console.log(e));
        }
      })
      .catch((e) => console.log(e));
  });

  onMount(() => {
    getMatches()
      .then((matches) => {
        const match = matches.args["file"];
        if (match != null && match.occurrences == 1 && typeof match.value === "string") {
          updateFilePath(match.value).catch((e) => console.log(e));
        }
      })
      .catch((e) => console.log(e));
  });

  const updateFilePath = async (path: string) => {
    setFilePath(convertFileSrc(path));
    // update window title
    const filename = await basename(path);
    const dir = await dirname(path);
    const title = `${filename}`;
    setTitle(title);
    setDir(dir);
    await appWindow.setTitle(title);
  };

  return (
    <div class="overflow-hidden flex flex-col">
      <TitleBar />
      <Viewer />
    </div>
  );
};

export default App;
