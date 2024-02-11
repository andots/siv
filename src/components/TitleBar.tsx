import { createSignal, type Component } from "solid-js";

// import {
//   CodiconChevronLeft,
//   CodiconChevronRight,
//   CodiconChromeClose,
//   CodiconChromeMaximize,
//   CodiconChromeMinimize,
//   CodiconChromeRestore,
//   CodiconEmptyWindow,
// } from "solid-iconify/codicon";
import {
  GrommetIconsSplit,
  GrommetIconsClose,
  // GrommetIconsNewWindow,
  GrommetIconsAdd,
  // GrommetIconsNext,
  // GrommetIconsPrevious,
  // GrommetIconsClone,
  GrommetIconsLinkPrevious,
  GrommetIconsLinkNext,
  // GrommetIconsMultiple,
  GrommetIconsSubtract,
  GrommetIconsCheckbox,
  // GrommetIconsStatusPlaceholder,
  // GrommetIconsAddCircle,
  // GrommetIconsChapterAdd,
  // GrommetIconsFormAdd,
} from "solid-iconify/grommet-icons";

import { Button } from "~/components/ui/button";
import { TITLEBAR_HEIGHT, TITLEBAR_HEIGHT_PX } from "~/constants";
import * as invokes from "~/invokes";
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
      <props.icon size={15} />
    </Button>
  );
};

const TitleBar: Component = () => {
  const { appState } = useAppState();
  const [maximized, setMaximized] = createSignal<boolean>(false);

  const minimize = () => {
    invokes.minimize();
  };

  const toggleMaximize = () => {
    setMaximized(!maximized());
    invokes.toggleMaximize();
  };

  const close = () => {
    invokes.closeWindow();
  };

  const next = () => {
    appState.actions.nextImage();
  };

  const prev = () => {
    appState.actions.prevImage();
  };

  const createWindow = () => {
    invokes.createNewWindow();
  };

  const tile = () => {
    invokes.tileWindows();
  };

  return (
    <div
      class="z-50 w-screen select-none fixed top-0 left-0 right-0 bg-secondary-foreground text-primary-foreground"
      style={{ height: TITLEBAR_HEIGHT_PX }}
    >
      <div class="flex justify-between items-center">
        <div class="w-[130px]">
          <TitleBarButton icon={GrommetIconsLinkPrevious} onClick={() => prev()} />
          <TitleBarButton icon={GrommetIconsLinkNext} onClick={() => next()} />
          <TitleBarButton icon={GrommetIconsAdd} onClick={() => createWindow()} />
          <TitleBarButton icon={GrommetIconsSplit} onClick={() => tile()} />
        </div>
        <div
          data-tauri-drag-region
          style={{ height: `${TITLEBAR_HEIGHT - 4}px` }}
          class="relative top-[4px]"
        >
          <p
            data-tauri-drag-region
            class="text-primary-foreground text-xs w-[calc(100vw-260px)] text-center overflow-hidden text-ellipsis text-nowrap"
          >
            {appState.getters.title()}
          </p>
        </div>
        <div class="w-[130px] flex justify-end">
          <TitleBarButton icon={GrommetIconsSubtract} onClick={() => minimize()} />
          <TitleBarButton
            icon={maximized() ? GrommetIconsCheckbox : GrommetIconsCheckbox}
            onClick={() => toggleMaximize()}
          />
          <TitleBarButton icon={GrommetIconsClose} onClick={() => close()} />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
