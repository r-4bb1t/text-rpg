import { LogInputType } from "../types/input";

export const logHook = async (props: LogInputType) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_HOST}/api/text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
  const json = await res.json();
  return json;
};
