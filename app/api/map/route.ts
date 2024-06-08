import { mapPrompt } from "./map.prompt";
import OpenAI from "openai";

import { MapType } from "@/app/types/map";
import { getMonsterMaxHP } from "@/app/utils/level";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY || "",
});

export const POST = async (req: Request) => {
  const { user, maxLevel } = await req.json();
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: mapPrompt(user, maxLevel),
      },
    ],
    model: "gpt-4o",
    temperature: 1,
  });
  console.log(completion.choices[0].message.content);
  const map: MapType = JSON.parse(
    completion.choices[0].message.content
      ?.replaceAll("```json", "")
      ?.replaceAll("```", "") || "",
  );
  console.log(map);
  return Response.json({
    ...map,
    monster:
      map.monster === null
        ? null
        : {
            ...map.monster,
            hp: getMonsterMaxHP(map.monster.level),
            maxHP: getMonsterMaxHP(map.monster.level),
            encountered: false,
          },
    npc: map.npc.map((n) => ({ ...n, encountered: false, likeability: 0 })),
  });
};
