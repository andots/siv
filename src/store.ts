import { createFluxStore } from "@solid-primitives/flux-store";
import { appWindow } from "@tauri-apps/api/window";

import * as invokes from "~/invokes";
import { getFileName, logError } from "~/lib/utils";

type AppState = {
  title: string;
  images: string[];
  currentIndex: number | undefined;
  currentFilePath: string | undefined;
  currentDir: string | undefined;
};

const initAppState = (): AppState => {
  return {
    title: "siv",
    images: [],
    currentIndex: undefined,
    currentFilePath: undefined,
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
  actions: (setState, _state) => ({
    reset: () => {
      setState(initAppState());
    },
    setTitle: (title: string) => {
      setState("title", title); // set title for TitleBar
      appWindow.setTitle(title).catch(logError); // set title for tauri window
    },
    setDefaultTitle: async () => {
      const title = await invokes.getDefaultAppTitle();
      appState.actions.setTitle(title);
    },
    setCurrentFilePath: async (path: string) => {
      setState("currentFilePath", path);
      const title = await getFileName(path);
      appState.actions.setTitle(title);
    },
    nextImage: () => {
      //
    },
    prevImage: () => {
      //
    },
  }),
});

export const useAppState = () => {
  return { appState };
};
