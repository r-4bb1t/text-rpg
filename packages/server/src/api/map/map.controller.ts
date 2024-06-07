import { mapPrompt } from "./map.prompt";
import { Context } from "koa";
import OpenAI from "openai";

import { getMaxHP } from "@shared/utils/level";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY || "",
});

export const getMap = async (ctx: Context) => {
  const { user, maxLevel } = ctx.request.body;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: mapPrompt(user, maxLevel),
      },
    ],
    model: "gpt-4o",
  });
  console.log(completion.choices[0].message.content);
  const map = JSON.parse(
    completion.choices[0].message.content
      ?.replaceAll("```json", "")
      ?.replaceAll("```", "") || "",
  );
  console.log(map);
  ctx.body = JSON.stringify({
    ...map,
    monster: {
      ...map.monster,
      hp: getMaxHP(map.monster.level),
      maxHP: getMaxHP(map.monster.level),
      encountered: false,
    },
  });
};
