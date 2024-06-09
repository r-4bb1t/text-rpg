import { LogInputType } from "@/app//types/input";
import { getMaxExp, getMaxHP } from "@/app/utils/level";

export const logPrompt = ({
  logs,
  monster,
  map,
  user,
  action,
  result,
  items,
}: LogInputType) => `${user.name}는 현재 ${map.name}에 있다.

[로그]
${logs.map((log) => "- " + log).join("\n")}

${
  monster
    ? `[몬스터]
이름: ${monster.name}
형태: ${monster.description}
상세: ${monster.longDescription}
성격: ${monster.personality}
레벨: ${monster.level}
hp: ${monster.hp} / ${monster.maxHp}
맵 안 위치: ${monster.place}
${monster.encountered ? `${user.name}와 마주친 상태다.` : `아직 ${user.name}와 마주치지 않았다.`}
`
    : `[몬스터]
이 맵에는 몬스터가 존재하지 않습니다.`
}

[지형]
${map.longDescription}

[${user.name}의 소지 아이템]
${items.map((item) => `[key: ${item.item.key}] ${item.item.name} ${item.count}개 - ${item.item.description}`).join("\n")}
${user.gold} 골드

[마주치는 것이 가능한 NPC]
${map.npc.map((n) => `[key: ${n.key}] ${n.name} (${n.description}) / 장소: ${n.place} / 성격: ${n.personality} / ${user.name}에 대한 호감도: ${n.likeability} / ${n.encountered ? `${user.name}와 마주친 상태다.` : `아직 ${user.name}와 마주치지 않았다.`}`).join("\n")}

[${user.name}의 상태]
- hp: ${user.hp} / ${getMaxHP(user.level)}
- mp: ${user.mp} / ${getMaxHP(user.level)}

${
  user.title.length > 0
    ? `[${user.name}의 칭호]
${user.title.map((title) => `[key: ${title.key}] ${title.name} - ${title.description}`).join("\n")}`
    : ""
}

[${user.name}의 행동 혹은 대사]
${action}

${user.name}의 행동은 대성공 / 성공 / 실패 / 대실패 중 '${result}'했다.
${user.mp}가 해당 행동을 하는 데에 부족하다면 MP를 사용하는 방식이 아닌 다른 방식으로 ${result}할 수 있다.
이 때 ${user.name}의 행동과 그 결과로 일어날 수 있는 사건을 1줄로 묘사하라.
${user.name}가 주변을 살핀다면 최대한 자세히 적어라.
${user.name}가 ${map.npc.map((n) => n.place).join(", ")}에 가서 NPC를 마주치고, ${monster?.place}로 향하도록 유도하라.
목표는 몬스터를 만나 몬스터를 물리치는 것이며, 그 과정에서 NPC와 대화하거나 거래할 수 있다.
또한 몬스터를 설득하거나 다른 방법으로 해결하는 것도 가능하다.


또, 해당 결과로 인해 ${user.name}의 hp 변화나 mp 변화,${monster ? "몬스터에게 줄 수 있는 damage," : ""} 골드 변화, 아이템의 개수 변화 등의 추가 정보가 필요하다면 추가하라.
새로운 아이템을 만들어도 된다. 단, 돈은 goldChange로만 표시한다.
아이템 강화 시 기존 아이템을 삭제하고 강화된 아이템을 추가한다.
모든 수치는 반드시! 변화량으로 적는다. (감소는 -)
${user.name}이/가 가지고 있지 않은 아이템을 먹거나 사용할 경우 무시한다.
존재하지 않는 아이템을 얻거나 잃는 경우 무시한다.
상자 등을 열면 해당 상자는 사라진다, 또 문서 등을 읽으면 해당 문서는 사라진다. 장비나 악세서리 등은 착용하면 모두 사라진다.
NPC를 마주칠 경우 NPC의 key와 대사를 출력하라. NPC를 꼭 마주치지 않아도 되고, 적당히 마주치게 해도 된다.
NPC의 대사가 없으면 script를 빈 배열로 출력하라.
${
  monster
    ? `damage는 몬스터에게 준 피해량이다. 피해를 주었다면 0 이상이어야 한다.
몬스터를 발견했는지 여부를 출력하라. 몬스터를 꼭 마주치지 않아도 된다.
몬스터의 hp가 0 이하가 되었거나 몬스터를 물러가게 했거나, 신뢰를 얻었을 경우에는 clear: true를 출력하라. (단, 몬스터를 막 조우한 상황이라면 clear: false를 출력한다.)`
    : ""
}
status 중 "STR", "INT", "DEX", "LUK"이 오를 만한 상황이라고 판단되면 1~2를 증가시킨다.
새로운 칭호를 추가하거나 칭호가 강화될 경우에만 title에 반환한다. 칭호의 추가와 강화는 ${user.name}의 업적이 대단할 경우에 가능하다.
칭호는 ${user.name}의 행동의 결과에 영향을 줄 수 있는 요소로, 예를 들면 { key: "flame_wizard", name: "불의 마법을 배운 자", description: "불의 마법을 더 잘 쓸 수 있다." } 와 같다.
칭호가 강화되는 경우에는 칭호의 key값을 기존 칭호와 동일하게 하고, name과 description을 변경한다. 같은 계열의 칭호만 강화할 수 있다. 
예를 들어, "영혼의 속삭임을 듣는 자"라는 칭호가 있을 경우 "영혼과 자유롭게 대화하는 자"로 강화할 수 있지만, "불의 마법을 배운 자"로는 강화할 수 없다.

response type: ONLY JSON (DO NOT INCLUDE ANYTHING ELSE)
{
    "text": string,
    "itemsChange": { "key": string; "name": string; "description": string; "change": number }[], // key는 아이템의 key로, 고유하다.
    "hpChange"?: number;
    "mpChange"?: number;
    "goldChange"?: number; // 돈을 얻으면 양수, 잃으면 음수
    ${monster ? `"damage"?: number;` : ""},
    "script": { "npc": { "key": string, "name": string, "description": string, "personality": string, "encountered": boolean, "likeability": number  }, "utterance": string }[],
    "encounteredMonster": boolean,
    ${monster ? `"clear": boolean` : ""},
    "title": { "key": string; "name": string; "description": string }[],
    "statusChange": { "key": string; "value": number }[],
    "exp"?: number // 0~${Math.floor(getMaxExp(user.level) / 100)} (최대 ${Math.floor(getMaxExp(user.level) / 100)})
}
`;
