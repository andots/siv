import { createSignal, type Component } from "solid-js";

import { WebviewWindow } from "@tauri-apps/api/webview";
import {
  CodiconChevronLeft,
  CodiconChevronRight,
  CodiconChromeClose,
  CodiconChromeMaximize,
  CodiconChromeMinimize,
  CodiconChromeRestore,
  CodiconEmptyWindow,
} from "solid-iconify/codicon";

import { Button } from "~/components/ui/button";
import { TITLEBAR_HEIGHT, TITLEBAR_HEIGHT_PX } from "~/constants";
import { invokeCreateWindow } from "~/invokes";
import { joinOsPaths } from "~/lib/utils";
import { useDir, useFileName, useFilePath, useFiles, useTitle } from "~/store";

import type { IconTypes } from "solid-iconify";

type Props = { icon: IconTypes; onClick: () => void };

const TitleBarButton: Component<Props> = (props) => {
  return (
    <Button
      variant="titlebar"
      style={{ height: TITLEBAR_HEIGHT_PX, width: TITLEBAR_HEIGHT_PX }}
      onClick={props.onClick}
    >
      <props.icon />
    </Button>
  );
};

const TitleBar: Component = () => {
  const { title } = useTitle();
  const { files } = useFiles();
  const { dir } = useDir();
  const { fileName } = useFileName();
  const { setFilePath } = useFilePath();
  const [maximized, setMaximized] = createSignal<boolean>(false);

  const minimize = () => {
    WebviewWindow.getCurrent()
      .minimize()
      .catch((e) => console.log(e));
    // appWindow.minimize().catch((e) => console.log(e));
  };

  const toggleMaximize = () => {
    setMaximized(!maximized());
    WebviewWindow.getCurrent()
      .toggleMaximize()
      .catch((e) => console.log(e));
    // appWindow.toggleMaximize().catch((e) => console.log(e));
  };

  const close = () => {
    WebviewWindow.getCurrent()
      .close()
      .catch((e) => console.log(e));
    // appWindow.close().catch((e) => console.log(e));
  };

  const next = () => {
    const currentIndex = files().findIndex((v) => v === fileName());
    if (currentIndex != -1) {
      if (currentIndex == files().length - 1) {
        // current is end of array, so go to the start of array
        const target = files().at(0);
        if (target) setFilePath(joinOsPaths([dir(), target]));
      } else {
        const target = files().at(currentIndex + 1);
        if (target) setFilePath(joinOsPaths([dir(), target]));
      }
    }
  };

  const prev = () => {
    const currentIndex = files().findIndex((v) => v === fileName());
    if (currentIndex != -1) {
      if (currentIndex == 0) {
        // current is start is array, so go to the end of array
        const target = files().at(files().length - 1);
        if (target) setFilePath(joinOsPaths([dir(), target]));
      } else {
        const target = files().at(currentIndex - 1);
        if (target) setFilePath(joinOsPaths([dir(), target]));
      }
    }
  };

  const createWindow = () => {
    invokeCreateWindow(`w-${Date.now()}`, "index.html").catch((e) => console.log(e));
  };

  return (
    <div
      class="z-50 w-screen select-none fixed top-0 left-0 right-0 bg-secondary-foreground text-primary-foreground"
      style={{ height: TITLEBAR_HEIGHT_PX }}
    >
      <div class="flex justify-between items-center">
        <div class="w-[100px]">
          <TitleBarButton icon={CodiconChevronLeft} onClick={() => prev()} />
          <TitleBarButton icon={CodiconChevronRight} onClick={() => next()} />
          <TitleBarButton icon={CodiconEmptyWindow} onClick={() => createWindow()} />
        </div>
        <div
          data-tauri-drag-region
          style={{ height: `${TITLEBAR_HEIGHT - 4}px` }}
          class="relative top-[4px]"
        >
          <p
            data-tauri-drag-region
            class="text-primary-foreground text-xs w-[calc(100vw-240px)] text-center overflow-hidden text-ellipsis text-nowrap"
          >
            {title()}
          </p>
        </div>
        <div class="w-[100px] flex justify-end">
          <TitleBarButton icon={CodiconChromeMinimize} onClick={() => minimize()} />
          <TitleBarButton
            icon={maximized() ? CodiconChromeRestore : CodiconChromeMaximize}
            onClick={() => toggleMaximize()}
          />
          <TitleBarButton icon={CodiconChromeClose} onClick={() => close()} />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
