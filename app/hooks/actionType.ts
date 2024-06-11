import { ActionInputType, ActionOutputType } from "../types/input";

export const actionTypeHook = async (
  props: ActionInputType,
): Promise<ActionOutputType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_HOST}/api/text/action`,
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
};
