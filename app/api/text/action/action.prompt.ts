import { ActionInputType } from "@/app/types/input";

export const actionPrompt = ({
  text,
  items,
  npc,
  map,
  logs,
  title,
  difficulty,
}: ActionInputType) => `다음 유저의 행동이 어떤 종류의 능력을 사용하며, 난이도가 얼마나 높은지 (현실적인 계산법으로) 출력하라.
  유저의 아이템이나 칭호 등을 고려하여 난이도를 계산하라.
  같은 행동을 여러 번 반복할 경우 난이도가 높아질 수 있다.
  [능력 종류] STR, DEX, INT, LUK
  [난이도 범위] 1~${difficulty}
  [행동] ${text}
  
  [소지한 아이템] ${items.map((item) => `${item.item.name} (${item.item.description}) ${item.count}개`).join(", ")}
  [소지한 칭호]
  ${title.map((t) => `${t.name} - ${t.description}`).join("\n")}
  [NPC] ${npc.map((n) => `[key: ${n.key}] ${n.name} - ${n.description}`).join(", ")}
  [배경] ${map.longDescription}
  [로그]
  ${logs.map((log) => "- " + log).join("\n")}
  
  response type: ONLY JSON (DO NOT INCLUDE ANYTHING ELSE)
  {
      "type": "STR" | "DEX" | "INT" | "LUK",
      "difficulty": number
  }`;
