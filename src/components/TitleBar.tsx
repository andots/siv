import type { Component } from "solid-js";

import { appWindow } from "@tauri-apps/api/window";
import {
  CodiconChromeClose,
  CodiconChromeMaximize,
  CodiconChromeMinimize,
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

const TitleBar: Component = () => {
  const minimize = () => {
    appWindow.minimize().catch((e) => console.log(e));
  };

  const toggleMaximize = () => {
    appWindow.toggleMaximize().catch((e) => console.log(e));
  };

  const close = () => {
    appWindow.close().catch((e) => console.log(e));
  };

  return (
    <div
      data-tauri-drag-region
      class="z-50 h-[28px] select-none flex flex-row justify-end fixed top-0 left-0 right-0 bg-neutral-800 text-white"
    >
      <TitleBarButton icon={CodiconChromeMinimize} onClick={() => minimize()} />
      <TitleBarButton icon={CodiconChromeMaximize} onClick={() => toggleMaximize()} />
      <TitleBarButton icon={CodiconChromeClose} onClick={() => close()} />
    </div>
  );
};

export default TitleBar;
