import { contextBridge, ipcRenderer } from "electron";

import { electronAPI } from "@electron-toolkit/preload";
import {
  ActionInputType,
  LogInputType,
  MapInputType,
} from "@shared/types/input";

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", {
      ...electronAPI,
      getActionType: (props: ActionInputType) =>
        ipcRenderer.invoke("getActionType", props),
      getLog: (props: LogInputType) => ipcRenderer.invoke("getLog", props),
      move: (props: MapInputType) => ipcRenderer.invoke("move", props),
    });
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
