import { debug, trace, info, error, warn, attachConsole } from "tauri-plugin-log-api";

export const initApp = async () => {
  if (import.meta.env.DEV) {
    await attachConsole();
    await debug("initApp");
    await warn("warn");
    await trace("trace");
    await info("info");
    await error("error");
  }
};
