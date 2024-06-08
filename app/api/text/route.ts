import { actionPrompt, logPrompt } from "./text.prompt";
import { Context } from "koa";
import OpenAI from "openai";

import { ActionInputType, LogInputType } from "@shared/types/input";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY || "",
});

export const getText = async (ctx: Context) => {
  const { action, result, map, logs, monster, user, items }: LogInputType =
    ctx.request.body;

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
        }),
      },
    ],
    model: "gpt-4o",
  });
  try {
    console.log(
      completion.choices[0].message.content
        ?.replaceAll("```json", "")
        ?.replaceAll("```", ""),
    );
    const res = JSON.parse(
      completion.choices[0].message.content
        ?.replaceAll("```json", "")
        ?.replaceAll("```", "") || "",
    );
    ctx.body = JSON.stringify({ ...res, clear: res.clear ?? false });
  } catch (e) {
    console.log(e);
  }
};

export const getActionType = async (ctx: Context) => {
  const { text, items, npc, map, logs, title, difficulty }: ActionInputType =
    ctx.request.body;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: actionPrompt({
          map,
          text,
          items,
          npc,
          logs,
          title,
          difficulty,
        }),
      },
    ],
    model: "gpt-4o",
  });
  console.log(completion.choices[0].message.content);
  try {
    const action = JSON.parse(
      completion.choices[0].message.content
        ?.replaceAll("```json", "")
        ?.replaceAll("```", "") || "",
    );
    ctx.body = JSON.stringify(action);
  } catch (e) {
    console.log(e);
  }
};
