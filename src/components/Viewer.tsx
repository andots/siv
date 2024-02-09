import { createSignal, onMount } from "solid-js";
import type { Component } from "solid-js";

import { createDraggable } from "@neodrag/solid";
import { makeEventListener } from "@solid-primitives/event-listener";
import { convertFileSrc } from "@tauri-apps/api/tauri";

import { cn } from "~/lib/utils";
import { useAppState } from "~/store";

import type { Property } from "csstype";

type Props = {
  src: string;
};

const Viewer: Component<Props> = (props) => {
  const { appState } = useAppState();
  const [scale, setScale] = createSignal<number>(1.0);
  const [cursor, setCursor] = createSignal<Property.Cursor>("cursor-grab");

  const { draggable } = createDraggable();
  const [position, setPosition] = createSignal<{ x: number; y: number }>({ x: 0, y: 0 });

  let containerRef: HTMLDivElement | undefined;
  let imageRef: HTMLImageElement | undefined;

  onMount(() => {
    if (containerRef != null) {
      makeEventListener(containerRef, "wheel", handleMouseWheel, { passive: true });
      makeEventListener(window, "keydown", handleKeyDown);
    }
  });

  const handleKeyDown = (e: KeyboardEvent): void => {
    e.preventDefault();
    if (e.key === "+" || e.key === "z" || e.key === "f") {
      const newScale = Math.min(Math.max(0.5, scale() + 0.1), 4);
      setScale(newScale);
    } else if (e.key === "-" || e.key === "x" || e.key === "d") {
      const newScale = Math.min(Math.max(0.5, scale() - 0.1), 4);
      setScale(newScale);
    } else if (e.key === ">" || e.key === "n") {
      appState.actions.nextImage();
    } else if (e.key === "<" || e.key === "p") {
      appState.actions.prevImage();
    } else if (e.key === "ArrowDown" || e.key === "j") {
      // pos go down
      setPosition({ x: position().x, y: position().y + 10 });
    } else if (e.key === "ArrowUp" || e.key === "k") {
      // pos go up
      setPosition({ x: position().x, y: position().y - 10 });
    } else if (e.key === "ArrowLeft" || e.key === "h") {
      // pos go left
      setPosition({ x: position().x - 10, y: position().y });
    } else if (e.key === "ArrowRight" || e.key === "l") {
      // pos go right
      setPosition({ x: position().x + 10, y: position().y });
    }
  };

  const handleMouseWheel = (e: WheelEvent) => {
    // scroll up is zoom to 10%, down to -10%
    const add = e.deltaY > 0 ? -0.1 : 0.1;
    // new scale must be between 0.5 to 4.0
    const newScale = Math.min(Math.max(0.5, scale() + add), 4);
    setScale(newScale);
  };

  const onLoadImage = () => {
    if (containerRef && imageRef) {
      imageRef.style.height = `${containerRef.clientHeight}px`;
      // reset scale and position
      setScale(1.0);
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div class="flex h-screen w-screen pt-[28px] bg-black">
      <div
        ref={containerRef}
        class={cn("h-full w-full overflow-hidden flex justify-center items-center", cursor())}
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
            ref={imageRef}
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
