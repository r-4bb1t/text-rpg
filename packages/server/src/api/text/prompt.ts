import { ItemType } from "@shared/types/item";
import { MapType } from "@shared/types/map";
import { MonsterType } from "@shared/types/monster";
import { NPCType } from "@shared/types/npc";

export const logPrompt = ({
  logs,
  monster,
  map,
  user,
  action,
  result,
  npc,
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
  npc: NPCType[];
  gold: number;
  hp: number;
  mp: number;
}) => `주인공 ${user}는 현재 ${map.name}에 있다.

[로그]
${logs.map((log) => "- " + log).join("\n")}

${
  monster
    ? `[몬스터]
이름: ${monster.name}
형태: ${monster.description}
성격: ${monster.personality}`
    : ""
}

[지형]
${map.long_description}

[주인공이 가지고 있는 아이템]
${items.map((item) => `[key: ${item.item.key}] ${item.item.name} ${item.count}개 - ${item.item.description}`).join("\n")}
${gold} 골드

[NPC들]
${npc.map((n) => `[key: ${n.key}] ${n.name}`).join("\n")}

[주인공의 상태]
- hp: ${hp}
- mp: ${mp}

[주인공의 행동 혹은 대사]
${action}

주인공의 행동은 대성공 / 성공 / 실패 / 대실패 중 '${result}'했다.
이 때 주인공의 행동과 그 결과로 일어날 수 있는 사건을 1줄로 묘사하라.


또, 해당 결과로 인해 주인공의 hp 변화나 mp 변화, 적에게 줄 수 있는 damage, 골드 변화, 아이템의 개수 변화 등의 추가 정보가 필요하다면 추가하라.
새로운 아이템을 만들어도 된다. 단, 돈은 골드 변화로만 표시한다.
모든 수치는 반드시 변화량으로 적는다.
주인공이 가지고 있지 않은 아이템을 먹거나 사용할 경우 무시한다.
존재하지 않는 아이템을 얻거나 잃는 경우 무시한다.
NPC를 마주친 경우, NPC의 key와 대사를 출력하라. NPC를 꼭 마주치지 않아도 된다.
몬스터를 발견했는지 여부를 출력하라. 몬스터를 꼭 마주치지 않아도 된다.
몬스터를 해치웠거나 몬스터를 물러가게 했을 경우, clear: true를 출력하라. (단, 몬스터를 막 조우한 상황이라면 clear: false를 출력한다.)
status 중 "STR", "INT", "DEX", "LUK"이 오를 만한 상황이라고 판단되면 1~2를 증가시킨다.

response type: ONLY JSON (DO NOT INCLUDE ANYTHING ELSE)
{
    text: string,
    items: { key: string; name: string; description: string; change: number }[],
    hp?: number;
    mp?: number;
    gold?: number;
    damage?: number;
    script: { npc: { key: string, name: string, description: string, personality: string }, text: string }[],
    encounter_monster: boolean,
    clear: boolean,
    status: { key: string; value: number }[]
}
`;

export const actionPrompt = (
  text: string
) => `다음 유저의 행동이 어떤 종류의 능력을 사용하며, 난이도가 얼마나 높은지 출력하라.
능력 종류: STR, DEX, INT, LUK
난이도 범위: 1~80
행동: ${text}

response type: ONLY JSON (DO NOT INCLUDE ANYTHING ELSE)
{
    type: "STR" | "DEX" | "INT" | "LUK",
    difficulty: number
}`;
