import { ipcMain } from "electron";

import { SKILLTYPES } from "@shared/skills";
import { LogInputType } from "@shared/types/input";

export default function utils(): void {
  ipcMain.handle("getActionType", async (_, text: string) => {
    const res = await fetch(
      //@ts-ignore - Vite environment variable
      `${import.meta.env.MAIN_VITE_API_HOST}/api/text/action`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      },
    );

    const json: { type: keyof typeof SKILLTYPES; difficulty: number } =
      await res.json();
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
}
