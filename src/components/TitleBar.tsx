import { createSignal, type Component } from "solid-js";

import { appWindow } from "@tauri-apps/api/window";
import {
  CodiconChevronLeft,
  CodiconChevronRight,
  CodiconChromeClose,
  CodiconChromeMaximize,
  CodiconChromeMinimize,
  CodiconChromeRestore,
  CodiconEmptyWindow,
} from "solid-iconify/codicon";
import { ulid } from "ulidx";

import { Button } from "~/components/ui/button";
import { TITLEBAR_HEIGHT, TITLEBAR_HEIGHT_PX } from "~/constants";
import * as invokes from "~/invokes";
import { logError } from "~/lib/utils";
import { useAppState } from "~/store";

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
  const { appState } = useAppState();
  const [maximized, setMaximized] = createSignal<boolean>(false);

  const minimize = () => {
    appWindow.minimize().catch(logError);
  };

  const toggleMaximize = () => {
    setMaximized(!maximized());
    appWindow.toggleMaximize().catch(logError);
  };

  const close = () => {
    appWindow.close().catch(logError);
  };

  const next = () => {
    appState.actions.nextImage();
  };

  const prev = () => {
    appState.actions.prevImage();
  };

  const createWindow = () => {
    invokes.createWindow(`w-${ulid()}`, "index.html").catch(logError);
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
            {appState.getters.title()}
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
