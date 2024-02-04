import { createEffect, on, onMount, type Component } from "solid-js";

import { getName, getVersion } from "@tauri-apps/api/app";
import { appWindow } from "@tauri-apps/api/window";

import TitleBar from "~/components/TitleBar";
import Viewer from "~/components/Viewer";
import { useDir, useTitle } from "~/store";

const App: Component = () => {
  const { dir } = useDir();
  const { setTitle } = useTitle();

  createEffect(
    on(dir, () => {
      console.log(dir());
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  onMount(async () => {
    const name = await getName();
    const version = await getVersion();
    const title = `${name} - v${version}`;
    setTitle(title);
    await appWindow.setTitle(title);
  });

  return (
    <div class="overflow-hidden flex flex-col">
      <TitleBar />
      <Viewer />
    </div>
  );
};

export default App;
