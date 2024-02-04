import { createSignal } from "solid-js";

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

const [files, setFiles] = createSignal<string[]>([]);
export const useFiles = () => {
  return { files, setFiles };
};
