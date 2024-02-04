import { type Component } from "solid-js";

import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import {
  CodiconChevronLeft,
  CodiconChevronRight,
  CodiconChromeClose,
  CodiconChromeMaximize,
  CodiconChromeMinimize,
  CodiconEmptyWindow,
} from "solid-iconify/codicon";
// import { MdiWindowMaximize, MdiWindowClose, MdiWindowMinimize } from "solid-iconify/mdi";

import { Button } from "~/components/ui/button";
import { joinOsPaths } from "~/lib/utils";
import { useDir, useFileName, useFilePath, useFiles, useTitle } from "~/store";

import type { IconTypes } from "solid-iconify";

type Props = { icon: IconTypes; onClick: () => void };

const TitleBarButton: Component<Props> = (props) => {
  return (
    <Button variant="rect" class="h-[28px] w-[28px]" onClick={props.onClick}>
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

  const minimize = () => {
    appWindow.minimize().catch((e) => console.log(e));
  };

  const toggleMaximize = () => {
    appWindow.toggleMaximize().catch((e) => console.log(e));
  };

  const close = () => {
    appWindow.close().catch((e) => console.log(e));
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
    const webview = new WebviewWindow(`w-${Date.now()}`, {
      url: "index.html",
      decorations: false,
      fullscreen: false,
      resizable: true,
      width: 800,
      height: 1000,
      minWidth: 300,
      minHeight: 300,
    });
    webview
      .once("tauri://created", (e) => {
        console.log(e);
      })
      .catch((e) => console.log(e));
    webview
      .once("tauri://error", (e) => {
        console.log(e);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div class="z-50 h-[28px] select-none flex flex-row fixed top-0 left-0 right-0 bg-neutral-800 text-white">
      <div data-tauri-drag-region class="flex justify-between items-center w-screen">
        <div class="w-[100px]">
          <TitleBarButton icon={CodiconChevronLeft} onClick={() => prev()} />
          <TitleBarButton icon={CodiconChevronRight} onClick={() => next()} />
          <TitleBarButton icon={CodiconEmptyWindow} onClick={() => createWindow()} />
        </div>
        <div data-tauri-drag-region>
          <p
            data-tauri-drag-region
            class="text-background text-xs w-[calc(100vw-200px)] text-center overflow-hidden text-ellipsis text-nowrap"
          >
            {title()}
          </p>
        </div>
        <div class="w-[100px] flex justify-end">
          <TitleBarButton icon={CodiconChromeMinimize} onClick={() => minimize()} />
          <TitleBarButton icon={CodiconChromeMaximize} onClick={() => toggleMaximize()} />
          <TitleBarButton icon={CodiconChromeClose} onClick={() => close()} />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
