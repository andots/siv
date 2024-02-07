import { createEffect, on, onMount, type Component } from "solid-js";

import { TauriEvent, type Event } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/webview";
import { getMatches } from "@tauri-apps/plugin-cli";

import TitleBar from "~/components/TitleBar";
import Viewer from "~/components/Viewer";
import {
  getDefaultAppTitle,
  getDirName,
  getFileName,
  getImagesInDirectory,
  isNotEmpty,
} from "~/lib/utils";
import { useDir, useFileName, useFilePath, useFiles, useTitle } from "~/store";

const App: Component = () => {
  const { dir, setDir } = useDir();
  const { setTitle } = useTitle();
  const { setFiles } = useFiles();
  const { filePath, setFilePath } = useFilePath();
  const { setFileName } = useFileName();

  onMount(() => {
    getDefaultAppTitle()
      .then((title) => setTitle(title))
      .then((title) => WebviewWindow.getCurrent().setTitle(title))
      .catch((e) => console.log(e));
  });

  onMount(() => {
    WebviewWindow.getCurrent()
      .listen(TauriEvent.WEBVIEW_FILE_DROP, (event: Event<TauriEvent.WEBVIEW_FILE_DROP>) => {
        if (event.payload.length == 1) {
          setFilePath(event.payload[0]);
        }
      })
      .catch((e) => console.log(e));
  });

  onMount(() => {
    getMatches()
      .then((matches) => {
        const match = matches.args["file"];
        if (match != null && match.occurrences == 1 && typeof match.value === "string") {
          setFilePath(match.value);
        }
      })
      .catch((e) => console.log(e));
  });

  createEffect(
    on(dir, () => {
      if (isNotEmpty(filePath())) {
        getImagesInDirectory(filePath())
          .then((files) => setFiles(files))
          .catch((e) => console.log(e));
      }
    })
  );

  // set title, filename, dir on filePath changed
  createEffect(
    on(filePath, async () => {
      if (isNotEmpty(filePath())) {
        const filename = await getFileName(filePath());
        const dir = await getDirName(filePath());
        const title = `${filename}`;
        setFileName(filename);
        setTitle(title);
        setDir(dir);
        await WebviewWindow.getCurrent().setTitle(title);
      }
    })
  );

  return (
    <div class="overflow-hidden flex flex-col select-none">
      <TitleBar />
      <Viewer />
    </div>
  );
};

export default App;
