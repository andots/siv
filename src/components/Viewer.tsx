import { createSignal } from "solid-js";
import type { Component } from "solid-js";

import { createDraggable } from "@neodrag/solid";
import { convertFileSrc } from "@tauri-apps/api/tauri";

import { cn } from "~/lib/utils";

import type { Property } from "csstype";

type Props = {
  src: string;
};

const Viewer: Component<Props> = (props) => {
  const [scale, setScale] = createSignal<number>(1.0);
  const [cursor, setCursor] = createSignal<Property.Cursor>("cursor-grab");
  const { draggable } = createDraggable();
  const [position, setPosition] = createSignal<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseWheel = (e: WheelEvent) => {
    // scroll up is zoom to 10%, down to -10%
    const add = e.deltaY > 0 ? -0.1 : 0.1;
    // new scale must be between 0.5 to 4.0
    const newScale = Math.min(Math.max(0.5, scale() + add), 4);
    setScale(newScale);
  };

  let container: HTMLDivElement | undefined;
  let image: HTMLImageElement | undefined;

  const onLoadImage = () => {
    if (container && image) {
      //       const text = `
      // Natural size: ${image.naturalWidth} x ${image.naturalHeight} pixels
      // Displayed size: ${image.width} x ${image.height} pixels
      // Container size: ${container.clientWidth} x ${container.clientHeight} pixels
      // `;
      //       console.log(text);
      image.style.height = `${container.clientHeight}px`;
      // reset scale and position
      setScale(1.0);
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div class="flex h-screen w-screen pt-[28px] bg-black">
      <div
        ref={container}
        class={cn("h-full w-full overflow-hidden flex justify-center items-center", cursor())}
        onWheel={(e) => handleMouseWheel(e)}
        onMouseDown={() => setCursor("cursor-grabbing")}
        onMouseUp={() => setCursor("cursor-grab")}
      >
        <div
          use:draggable={{
            axis: "both",
            position: position(),
            onDrag: ({ offsetX, offsetY }) => setPosition({ x: offsetX, y: offsetY }),
          }}
        >
          <img
            ref={image}
            onLoad={() => onLoadImage()}
            style={{
              transform: `scale(${scale()})`,
              "user-select": "none",
              "pointer-events": "none",
              "object-fit": "contain",
            }}
            src={convertFileSrc(props.src)}
          />
        </div>
      </div>
    </div>
  );
};

export default Viewer;
