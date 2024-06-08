import { actionPrompt } from "./action.prompt";
import OpenAI from "openai";

import { ActionInputType } from "@/app/types/input";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY || "",
});

export const POST = async (req: Request) => {
  const { text, items, npc, map, logs, title, difficulty }: ActionInputType =
    await req.json();
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
    return Response.json(action);
  } catch (e) {
    console.log(e);
  }
};
