import { ActionInputType } from "@shared/types/input";
import { ItemType } from "@shared/types/item";
import { MapType } from "@shared/types/map";
import { MonsterType } from "@shared/types/monster";

export const logPrompt = ({
  logs,
  monster,
  map,
  user,
  action,
  result,
  items,
  gold,
  hp,
  mp,
}: {
  logs: string[];
  monster?: MonsterType;
  map: MapType;
  user: string;
  action: string;
  result: string;
  items: {
    item: ItemType;
    count: number;
  }[];
  gold: number;
  hp: number;
  mp: number;
}) => `${user}는 현재 ${map.name}에 있다.

[로그]
${logs.map((log) => "- " + log).join("\n")}

${
  monster
    ? `[몬스터]
이름: ${monster.name}
형태: ${monster.description}
성격: ${monster.personality}
레벨: ${monster.level}
hp: ${monster.hp} / ${monster.maxHp}
맵 안 위치: ${monster.place}
${monster.encountered ? `${user}와 마주친 상태다.` : `아직 ${user}와 마주치지 않았다.`}
`
    : ""
}

[지형]
${map.longDescription}

[${user}의 소지 아이템]
${items.map((item) => `[key: ${item.item.key}] ${item.item.name} ${item.count}개 - ${item.item.description}`).join("\n")}
${gold} 골드

[마주치는 것이 가능한 NPC]
${map.npc.map((n) => `[key: ${n.key}] ${n.name} (${n.description}) / 장소: ${n.place} / 성격: ${n.personality}`).join("\n")}

[${user}의 상태]
- hp: ${hp}
- mp: ${mp}

[${user}의 행동 혹은 대사]
${action}

${user}의 행동은 대성공 / 성공 / 실패 / 대실패 중 '${result}'했다.
이 때 ${user}의 행동과 그 결과로 일어날 수 있는 사건을 1줄로 묘사하라.
${user}가 ${monster?.place}나 ${map.npc.map((n) => n.place).join(", ")}에 가서 몬스터나 NPC를 마주치게 유도하라.


또, 해당 결과로 인해 ${user}의 hp 변화나 mp 변화, 적에게 줄 수 있는 damage, 골드 변화, 아이템의 개수 변화 등의 추가 정보가 필요하다면 추가하라.
새로운 아이템을 만들어도 된다. 단, 돈은 골드 변화로만 표시한다.
모든 수치는 반드시! 변화량으로 적는다. (감소는 -)
damage는 몬스터에게 준 피해량이다. 피해를 주었다면 0 이상이어야 한다.
${user}이/가 가지고 있지 않은 아이템을 먹거나 사용할 경우 무시한다.
존재하지 않는 아이템을 얻거나 잃는 경우 무시한다.
NPC를 마주칠 경우 NPC의 key와 대사를 출력하라. NPC를 꼭 마주치지 않아도 되고, 적당히 마주치게 해도 된다.
몬스터를 발견했는지 여부를 출력하라. 몬스터를 꼭 마주치지 않아도 된다.
몬스터의 hp가 0 이하가 되었거나 몬스터를 물러가게 했을 경우 등 스테이지를 클리어했다고 판단되면 clear: true를 출력하라. (단, 몬스터를 막 조우한 상황이라면 clear: false를 출력한다.)
status 중 "STR", "INT", "DEX", "LUK"이 오를 만한 상황이라고 판단되면 1~2를 증가시킨다.

response type: ONLY JSON (DO NOT INCLUDE ANYTHING ELSE)
{
    "text": string,
    "items": { "key": string; "name": string; "description": string; "change": number }[],
    "hp"?: number;
    "mp"?: number;
    "gold"?: number;
    "damage"?: number;
    "script": { "npc": { "key": string, "name": string, "description": string, "personality": string }, "text": string }[],
    "encounter_monster": boolean,
    "clear": boolean,
    "status": { "key": string; "value": number }[]
}
`;

export const actionPrompt = ({
  text,
  items,
  npc,
  map,
}: ActionInputType) => `다음 유저의 행동이 어떤 종류의 능력을 사용하며, 난이도가 얼마나 높은지 (현실적인 계산법으로) 출력하라.
능력 종류: STR, DEX, INT, LUK
난이도 범위: 1~50
행동: ${text}
소지한 아이템: ${items.map((item) => `${item.item.name} (${item.item.description}) ${item.count}개`).join(", ")}
NPC: ${npc.map((n) => `[key: ${n.key}] ${n.name} - ${n.description}`).join(", ")}
배경: ${map.longDescription}

response type: ONLY JSON (DO NOT INCLUDE ANYTHING ELSE)
{
    "type": "STR" | "DEX" | "INT" | "LUK",
    "difficulty": number
}`;
