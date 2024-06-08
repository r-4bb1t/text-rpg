import { MapInputType } from "../types/input";
import { MapType } from "../types/map";

export const moveHook = async (props: MapInputType): Promise<MapType> => {
  const res = await fetch("/api/map", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
  const json = await res.json();
  return json;
};
