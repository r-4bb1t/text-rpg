import { ActionInputType, ActionOutputType } from "../types/input";

export const actionTypeHook = async (
  props: ActionInputType,
): Promise<ActionOutputType> => {
  const res = await fetch("/api/text/action", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
  const json = await res.json();
  return json;
};
