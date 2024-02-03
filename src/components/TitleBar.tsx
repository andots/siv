import type { Component } from "solid-js";

import { appWindow } from "@tauri-apps/api/window";
import { MdiWindowMaximize, MdiWindowClose, MdiWindowMinimize } from "solid-iconify/mdi";

import { Button } from "~/components/ui/button";

import type { IconTypes } from "solid-iconify";

type Props = { icon: IconTypes; onClick: () => void };

const TitleBarButton: Component<Props> = (props) => {
  return (
    <Button variant="rect" class="h-7 w-7" onClick={props.onClick}>
      <props.icon />
    </Button>
  );
};

const TitleBar: Component = () => {
  const minimize = () => {
    appWindow.minimize().catch((e) => console.log(e));
  };

  const maximize = () => {
    appWindow.maximize().catch((e) => console.log(e));
  };

  const close = () => {
    appWindow.close().catch((e) => console.log(e));
  };

  return (
    <div
      data-tauri-drag-region
      class="h-7 select-none flex justify-end fixed top-0 left-0 right-0 bg-neutral-800 text-white"
    >
      <TitleBarButton icon={MdiWindowMinimize} onClick={() => minimize()} />
      <TitleBarButton icon={MdiWindowMaximize} onClick={() => maximize()} />
      <TitleBarButton icon={MdiWindowClose} onClick={() => close()} />
    </div>
  );
};

export default TitleBar;
