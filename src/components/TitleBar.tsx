import { splitProps, type Component, type ComponentProps } from "solid-js";

import { MdiWindowMaximize, MdiWindowClose, MdiWindowMinimize } from "solid-iconify/mdi";

import { Button } from "~/components/ui/button";

import type { IconTypes } from "solid-iconify";

type Props = { icon: IconTypes } & ComponentProps<"div">;

const TitleBarButton: Component<Props> = (props) => {
  const [, divProps] = splitProps(props, ["icon"]);

  return (
    <div class="inline-flex justify-center items-center w-[30px] h-[30px]" {...divProps}>
      <Button variant="ghost" size="sm">
        <props.icon />
      </Button>
    </div>
  );
};

const TitleBar: Component = () => {
  return (
    <div
      data-tauri-drag-region
      class="h-[30px] select-none flex justify-end fixed top-0 left-0 right-0"
    >
      <TitleBarButton icon={MdiWindowMinimize} />
      <TitleBarButton icon={MdiWindowMaximize} />
      <TitleBarButton icon={MdiWindowClose} />
    </div>
  );
};

export default TitleBar;
