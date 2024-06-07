import { actionPrompt, logPrompt } from "./prompt";
import { Context } from "koa";
import OpenAI from "openai";

import { LogInputType } from "@shared/types/input";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY || "",
});

export const getText = async (ctx: Context) => {
  const {
    action,
    result,
    map,
    logs,
    monster,
    user,
    items,
    gold,
    hp,
    npc,
    mp,
  }: LogInputType = ctx.request.body;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: logPrompt({
          map,
          items,
          logs,
          monster,
          user,
          action,
          result,
          npc,
          gold,
          hp,
          mp,
        }),
      },
    ],
    model: "gpt-4o",
  });
  const res = JSON.parse(
    completion.choices[0].message.content
      ?.replaceAll("```json", "")
      ?.replaceAll("```", "") || "",
  );
  console.log(res);
  ctx.body = JSON.stringify(res);
};

export const getActionType = async (ctx: Context) => {
  const { text } = ctx.request.body;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: actionPrompt(text),
      },
    ],
    model: "gpt-4o",
  });
  const action = JSON.parse(
    completion.choices[0].message.content
      ?.replaceAll("```json", "")
      ?.replaceAll("```", "") || "",
  );
  ctx.body = JSON.stringify(action);
};
