import { createSignal, onMount, Switch, Match } from "solid-js";
import type { Component } from "solid-js";

import { createDraggable } from "@neodrag/solid";
import { getVersion } from "@tauri-apps/api/app";
import { getMatches } from "@tauri-apps/api/cli";
import { TauriEvent, listen, type Event } from "@tauri-apps/api/event";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

import { cn } from "~/lib/utils";

import type { Property } from "csstype";

const Viewer: Component = () => {
  const [scale, setScale] = createSignal<number>(1.0);
  const [cursor, setCursor] = createSignal<Property.Cursor>("cursor-grab");
  const [filePath, setFilePath] = createSignal<string>("");
  const { draggable } = createDraggable();
  const [position, setPosition] = createSignal<{ x: number; y: number }>({ x: 0, y: 0 });

  onMount(() => {
    listen(TauriEvent.WINDOW_FILE_DROP, (event: Event<TauriEvent.WINDOW_FILE_DROP>) => {
      if (event.payload.length == 1) {
        updateFilePath(event.payload[0]).catch((e) => console.log(e));
      }
    }).catch((e) => console.log(e));
  });

  onMount(() => {
    getMatches()
      .then((matches) => {
        const match = matches.args["file"];
        if (match != null && match.occurrences == 1 && typeof match.value === "string") {
          updateFilePath(match.value).catch((e) => console.log(e));
        }
      })
      .catch((e) => console.log(e));
  });

  const updateFilePath = async (path: string) => {
    setFilePath(convertFileSrc(path));
    // update window title
    const version = await getVersion();
    const title = `${path} - Simple Image Viewer (v${version})`;
    await appWindow.setTitle(title);
  };

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
    <Switch>
      <Match when={filePath() === ""}>
        <div class="flex h-screen justify-center items-center select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-20 h-20"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span class="font-bold text-xl pl-4">Drag & Drop Image Here.</span>
        </div>
      </Match>
      <Match when={filePath() !== ""}>
        <div
          ref={container}
          class={cn(
            "flex h-screen w-screen justify-center items-center overflow-hidden bg-black",
            cursor()
          )}
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
              src={filePath()}
            />
          </div>
        </div>
      </Match>
    </Switch>
  );
};

export default Viewer;
