import { ipcMain } from "electron";

import {
  ActionInputType,
  LogInputType,
  MapInputType,
} from "@shared/types/input";
import { SkillTypes } from "@shared/types/user";

export default function utils(): void {
  ipcMain.handle("getActionType", async (_, props: ActionInputType) => {
    const res = await fetch(
      //@ts-ignore - Vite environment variable
      `${import.meta.env.MAIN_VITE_API_HOST}/api/text/action`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      },
    );

    const json: { type: SkillTypes; difficulty: number } = await res.json();
    return json;
  });

  ipcMain.handle("getLog", async (_, props: LogInputType) => {
    const res = await fetch(
      //@ts-ignore - Vite environment variable
      `${import.meta.env.MAIN_VITE_API_HOST}/api/text/log`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      },
    );
    const json = await res.json();
    return json;
  });

  ipcMain.handle("move", async (_, props: MapInputType) => {
    const res = await fetch(
      //@ts-ignore - Vite environment variable
      `${import.meta.env.MAIN_VITE_API_HOST}/api/map/move`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      },
    );
    const json = await res.json();
    return json;
  });
}
