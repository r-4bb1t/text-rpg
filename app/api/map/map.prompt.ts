import { ENVIRONMENTS } from "@/app/types/environments";
import { MAP_TYPE } from "@/app/types/mapType";

export const mapPrompt = (user: string, maxLevel: number) => `
중세 시대의 모험을 떠나는 모험가가 탐험할 수 있는 맵을 만들어주세요.
맵의 배경은 ${
  MAP_TYPE[Math.floor(Math.random() * MAP_TYPE.length)]
}로 설정해주세요. 맵의 이름과 설명을 작성해주세요.
몬스터가 없는 마을이나 상점이라면 monster를 null로 설정해주세요. 몬스터가 없다면 NPC들은 평화롭게 살고 있을 것입니다.
몬스터가 있는 마을의 NPC들은 몬스터에게 고통받고 있습니다. 몬스터를 물리치면 감사해할 것이며, 몬스터를 물리치는 것을 도와줄 수 있습니다.
모험가의 이름은 ${user}입니다.

example:
{
  "key": "snow_mountain",
  "name": "눈 덮인 미모산",
  "description": "눈이 가득 쌓인 산. 추위가 느껴진다.",
  "longDescription": "눈이 가득 쌓인 산이다. 산 아래에는 여러 채소들이 자라고 있다. 또한 나무와 동물들이 살고 있다. 산 정상에는 눈이 쌓인 동굴이 있다. 눈이 많이 쌓여 있어서 발이 미끄러울 수 있다. 동굴로 가는 길은 가파르다.",
  "startLogs": [
    "눈이 가득 쌓인 산에 도착한 ${user}.",
    "발이 미끄러질 것 같다."
  ],
  "monster": {
    "name": "설인",
    "description": "눈 덮인 산에 살고 있는 설인. 눈을 먹는다. 물리 공격과 불 마법에 약하다. 물 마법에는 내성이 있다. 먹은 눈덩이를 뱉어 공격한다.",
    "personality": "둔하고 사나운",
    "level": ${maxLevel},
    "gold": 50
  },
  "npc": [
    {
      "key": "merchant_jade",
      "name": "상인 제이드",
      "description": "물건을 파는 상인.",
      "personality": "친절한"
    },
    {
      "key": "lulu",
      "name": "루루",
      "description": "산에 살고 있는 소녀. 설인에게 가족을 잃었다.",
      "personality": "냉정한"
    },
    {
      "key": "mountain_oldman",
      "name": "슈하임",
      "description": "산을 여기저기 돌아다니는 노인.",
      "personality": "농담을 좋아하고 알기 어려운"
    }
  ],
  "environments": [
    { "key": "snow", "name": "눈", "icon": "Snowflake" },
    { "key": "mountain", "name": "산", "icon": "Mountain" }
  ],
  "userLocation": "산 아래 마을 입구"
}

response type: ONLY JSON (DO NOT INCLUDE ANYTHING ELSE)
{
  "key": string; // 맵의 key입니다. 영어로 작성해주세요.
  "name": string; // 맵의 이름입니다. 이름은 고유명사를 포함하여 작성해주세요. ex. 황금으로 가득찬 헨리의 성
  "description": string; // 맵에 대한 간단한 설명입니다.
  "longDescription": string; // 맵에 대한 자세한 설명입니다. 지형과 배경을 최대한 상세히 작성해주세요.
  "startLogs": string[]; // 맵에 입장했을 때 나타나는 로그입니다. 최대한 상세한 주변 상황을 작성해주세요.

  "monster": {
    "name": string; // 몬스터의 이름입니다.
    "description": string; // 몬스터에 대한 간단한 설명입니다.
    "longDescription": string; // 몬스터에 대한 자세한 설명입니다. 약점, 묘사 등을 최대한 상세히 작성해주세요.
    "personality": string; // 몬스터의 성격입니다.

    "level": number; // ${Math.max(1, maxLevel - 3)}~${maxLevel} (최대 ${maxLevel})

    "gold": number; // 몬스터가 드랍하는 골드의 양입니다.
    "place": string; // 몬스터가 출몰하는 위치입니다. 맵 안의 공간을 작성해주세요.
  } | null; // 몬스터가 없으면 null을 넣어주세요.

  "npc": {
    "key": string; // NPC의 key입니다. 영어로 작성해주세요.
    "name": string; // NPC의 이름입니다.
    "description": string; // NPC에 대한 간단한 설명입니다.
    "personality": string; // NPC의 성격입니다.
    "place": string; // NPC가 출몰하는 위치입니다. 맵 안의 공간을 작성해주세요.
  }[]; // 맵에 등장하는 NPC들입니다. 없으면 빈 배열을 넣어주세요. (최대 3명)

  "environments": { 
    "key": string; // 환경의 key입니다. 영어로 작성해주세요.
    "name": string; // 환경의 이름입니다.
    "icon": ${ENVIRONMENTS.map((e) => `"${e}"`).join(" | ")} // 환경의 아이콘입니다.
  }[];

  "startLogs": string[];
  "userLocation": string; // 모험가가 맵에 처음 입장했을 때의 위치를 작성해주세요.
}
`;
