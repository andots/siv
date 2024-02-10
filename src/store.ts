import { createFluxStore } from "@solid-primitives/flux-store";

import * as invokes from "~/invokes";
import { getDirName, getFileName, logError } from "~/lib/utils";

type AppState = {
  title: string;
  images: string[];
  currentIndex: number;
  currentFilePath: string | undefined;
  currentDir: string | undefined;
};

const initAppState = (): AppState => {
  return {
    title: "siv",
    images: [],
    currentIndex: 0,
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
  actions: (setState, state) => ({
    reset: () => {
      setState(initAppState());
    },
    setTitle: (title: string) => {
      setState("title", title); // set title for TitleBar
      invokes.setTitleToAppWindow(title);
    },
    setDefaultTitle: async () => {
      const title = await invokes.getDefaultAppTitle();
      appState.actions.setTitle(title);
    },
    setCurrentFilePath: async (path: string) => {
      setState("currentFilePath", path);
      const title = await getFileName(path);
      appState.actions.setTitle(title);
      await appState.actions.setCurrentDir(path);
    },
    setCurrentDir: async (path: string) => {
      const dir = await getDirName(path);
      if (state.currentDir !== dir) {
        setState("currentDir", dir);
        const images = await invokes.getImagesInDir(dir);
        console.log(images);
        setState("images", images);
        const index = images.findIndex((a) => a === path);
        if (index != -1) {
          setState("currentIndex", index);
        }
      }
    },
    nextImage: () => {
      if (state.images.length > 1) {
        if (state.currentIndex == state.images.length - 1) {
          // go to 0 because the current is the end of array
          setState("currentIndex", 0);
        } else {
          setState("currentIndex", state.currentIndex + 1);
        }
        appState.actions.setCurrentFilePath(state.images[state.currentIndex]).catch(logError);
      }
    },
    prevImage: () => {
      if (state.images.length > 1) {
        if (state.currentIndex == 0) {
          // go to the end of array because the current is the start of array
          setState("currentIndex", state.images.length - 1);
        } else {
          setState("currentIndex", state.currentIndex - 1);
        }
        appState.actions.setCurrentFilePath(state.images[state.currentIndex]).catch(logError);
      }
    },
  }),
});

export const useAppState = () => {
  return { appState };
};

/*
  Global state for updater
*/
type UpdaterState = {
  shouldUpdate: boolean;
  currentVersion: string;
  newVersion: string;
};

const initUpdaterState = (): UpdaterState => {
  return {
    shouldUpdate: false,
    currentVersion: "0.0.0",
    newVersion: "0.0.0",
  };
};

const updaterState = createFluxStore(initUpdaterState(), {
  getters: (state) => ({
    shouldUpdate: () => {
      return state.shouldUpdate;
    },
    currentVersion: () => {
      return state.currentVersion;
    },
    newVersion: () => {
      return state.newVersion;
    },
  }),
  actions: (setState, _state) => ({
    setShouldUpdate: (value: boolean) => {
      setState("shouldUpdate", value);
    },
  }),
});

export const useUpdaterState = () => {
  return { updaterState };
};
