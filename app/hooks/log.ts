import { LogInputType } from "../types/input";

export const logHook = async (props: LogInputType) => {
  const res = await fetch("/api/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
  const json = await res.json();
  return json;
};
