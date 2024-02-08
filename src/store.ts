import { createSignal } from "solid-js";

import { createFluxStore } from "@solid-primitives/flux-store";
import { appWindow } from "@tauri-apps/api/window";

import * as invokes from "~/invokes";

const [title, setTitle] = createSignal<string>("");
export const useTitle = () => {
  return { title, setTitle };
};

const [dir, setDir] = createSignal<string>("");
export const useDir = () => {
  return { dir, setDir };
};

const [filePath, setFilePath] = createSignal<string>("");
export const useFilePath = () => {
  return { filePath, setFilePath };
};

const [fileName, setFileName] = createSignal<string>("");
export const useFileName = () => {
  return { fileName, setFileName };
};

const [files, setFiles] = createSignal<string[]>([]);
export const useFiles = () => {
  return { files, setFiles };
};

type AppState = {
  title: string;
  images: string[];
  currentIndex: number | undefined;
  currentFilePath: string | undefined;
  currentFilename: string | undefined;
  currentDir: string | undefined;
};

const initAppState = (): AppState => {
  return {
    title: "siv",
    images: [],
    currentIndex: undefined,
    currentFilePath: undefined,
    currentFilename: undefined,
    currentDir: undefined,
  };
};

const appState = createFluxStore(initAppState(), {
  getters: (state) => ({
    title: () => {
      return state.title;
    },
    images: () => {
      return state.images;
    },
    currentFilePath: () => {
      return state.currentFilePath;
    },
  }),
  actions: (setState) => ({
    reset: () => {
      setState(initAppState());
    },
    setTitle: (title: string) => {
      setState("title", title);
    },
    setDefaultTitle: async () => {
      const title = await invokes.getDefaultAppTitle();
      await appWindow.setTitle(title); // set title for tauri window
      setState("title", title);
    },
    setCurrentFilePath: (path: string) => {
      setState("currentFilePath", path);
    },
  }),
});

export const useAppState = () => {
  return { appState };
};
