import { type Component } from "solid-js";

import { appWindow } from "@tauri-apps/api/window";
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

import type { IconTypes } from "solid-iconify";

type Props = { icon: IconTypes; onClick: () => void };

const TitleBarButton: Component<Props> = (props) => {
  return (
    <Button variant="rect" class="h-[28px] w-[28px]" onClick={props.onClick}>
      <props.icon />
    </Button>
  );
};

const TitleBar: Component<{ title: string }> = (props) => {
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
    //
  };

  const prev = () => {
    //
  };

  const createWindow = () => {
    //
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
            {props.title}
          </p>
        </div>
        <div class="w-[100px]">
          <TitleBarButton icon={CodiconChromeMinimize} onClick={() => minimize()} />
          <TitleBarButton icon={CodiconChromeMaximize} onClick={() => toggleMaximize()} />
          <TitleBarButton icon={CodiconChromeClose} onClick={() => close()} />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
