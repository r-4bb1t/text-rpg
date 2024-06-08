import { logPrompt } from "./log.prompt";
import OpenAI from "openai";

import { LogInputType } from "@/app/types/input";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY || "",
});

export const POST = async (request: Request) => {
  const { action, result, map, logs, monster, user, items }: LogInputType =
    await request.json();

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
    return Response.json({ ...res, clear: res.clear ?? false });
  } catch (e) {
    console.log(e);
  }
};
