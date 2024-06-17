import { LogInputType } from "@/app//types/input";
import { getMaxExp, getMaxHP } from "@/app/utils/level";

export const logPrompt = ({
  logs,
  monster,
  map,
  user,
  result,
  items,
  cleared,
}: LogInputType) => `${user.name} is currently at ${map.userLocation} in ${map.name}.

[Logs]
${logs.map((log) => "- " + log).join("\n")}

${
  monster
    ? `[Monster]
Name: ${monster.name}
Form: ${monster.description}
Details: ${monster.longDescription}
Personality: ${monster.personality}
Level: ${monster.level}
HP: ${monster.hp} / ${monster.maxHp}
Location in map: ${monster.place}
${monster.encountered ? (cleared ? `${user.name} encountered it.` : `${user.name} defeated it.`) : `${user.name} has not encountered it yet.`}
`
    : `[Monster]
There are no monsters in this map.`
}

[Terrain]
${map.longDescription}

[Items held by ${user.name}]
${items.map((item) => `[key: ${item.item.key}] ${item.item.name} x${item.count} - ${item.item.description}`).join("\n")}
${user.gold} gold

[NPCs that can be encountered]
${map.npc.map((n) => `[key: ${n.key}] ${n.name} (${n.description}) / Location: ${n.location} / Personality: ${n.personality} / Likeability towards ${user.name}: ${n.likeability} / ${n.encountered ? `Has encountered ${user.name}.` : `Has not encountered ${user.name}.`}`).join("\n")}

[${user.name}'s status]
- HP: ${user.hp} / ${getMaxHP(user.level)}
- MP: ${user.mp} / ${getMaxHP(user.level)}
- Location: ${map.userLocation}

${
  user.title.length > 0
    ? `[${user.name}'s titles]
${user.title.map((title) => `[key: ${title.key}] ${title.name} - ${title.description}`).join("\n")}`
    : ""
}

${user.name} performed '${translateResult(result)}' in the last action.
If ${user.name} does not have enough MP to perform this action, describe an alternative method for performing '${translateResult(result)}'.
In one line, describe ${user.name}'s action and the resulting event (with ${translateResult(result)}).
If ${user.name} inspects the surroundings, describe in detail.
Guide ${user.name} to encounter NPCs at ${map.npc.map((n) => n.location).join(", ")} and head towards ${monster?.place}.
The goal is to encounter and defeat the monster, and in the process, interact or trade with NPCs.
It is also possible to persuade or solve the situation by other means.

Additionally, include changes in ${user.name}'s HP or MP, ${monster ? "damage dealt to the monster," : ""} gold changes, item quantity changes, etc., if necessary.
You may create new items. Indicate monetary changes as goldChange.
When enhancing items, remove the existing item and add the enhanced item.
All numerical changes must be specified! (negative for decreases).
Ignore actions involving items ${user.name} does not possess.
Ignore obtaining or losing nonexistent items.
When opening chests or reading documents, they disappear. Similarly, equipment and accessories disappear upon wearing.
If ${user.name} encounters an NPC while moving, output the NPC's key and dialogue. NPCs don't have to be encountered strictly and can be met suitably.
If the NPC has no dialogue, output an empty script array.
${
  monster
    ? `Damage refers to the damage dealt to the monster, and should be 0 or higher if inflicted.
Indicate whether the monster was discovered. Encountering the monster is not mandatory.
If the monster's HP drops to 0, is repelled, or monster's trust is gained, output clear: true (output clear: false if just encountered).`
    : ""
}
Increase "STR", "INT", "DEX", "LUK" by 1-2 if the situation warrants it.
Only return titles if a new title is gained or an existing one is enhanced. Titles can be added or enhanced if ${user.name} learns something new or achieves something significant. Enhancements should be slight (e.g., novice fire wizard -> somewhat skilled fire wizard).
Titles can influence actions, e.g.,
{ key: "flame_wizard", name: "Learner of Fire Magic", description: "Can use basic fire magic." } or
{ key: "mine_worker", name: "Novice Miner", description: "Can perform simple mining tasks." }
When enhancing, keep the title's key the same but change the name and description. Enhance titles within the same series only.
For example, "Listener of Spirit Whispers" can enhance to "Converser with Spirits" but not to "Learner of Fire Magic."

response type: ONLY JSON (DO NOT INCLUDE ANYTHING ELSE), THE STRING MUST BE KOREAN
{
    "text": string, // A sentence describing the result of the user's '${result}' action, ending with '다' instead of '습니다'.
    "itemsChange": { "key": string; "name": string; "description": string; "change": number }[], // key is the item's unique key.
    "hpChange"?: number;
    "mpChange"?: number;
    "goldChange"?: number; // Positive for gain, negative for loss
    ${monster ? `"damage"?: number;` : ""},
    "script": { "npc": { "key": string, "name": string, "description": string, "personality": string, "encountered": boolean, "likeability": number  }, "utterance": string }[],
    "encounteredMonster": boolean,
    ${monster ? `"clear": boolean` : ""},
    "title": { "key": string; "name": string; "description": string }[],
    "statusChange": { "key": string; "value": number }[],
    "exp"?: number // 0~${Math.floor(getMaxExp(user.level) / 100)} (max ${Math.floor(getMaxExp(user.level) / 100)})
    "userLocation": string; // User's new location, default is ${map.userLocation}
}
`;

const translateResult = (result: string) => {
  switch (result) {
    case "대성공":
      return "great success";
    case "성공":
      return "success";
    case "실패":
      return "failure";
    case "대실패":
      return "great failure";
  }
};
