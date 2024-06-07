import { ENVIRONMENTS } from "@shared/environments";

export const mapPrompt = (user: string, maxLevel: number) => `
중세 시대의 모험을 떠나는 모험가가 탐험할 수 있는 맵을 만들어주세요.
맵은 여러 환경과 NPC, 몬스터로 구성되어 있습니다. 실내, 실외, 던전, 마을 등 다양한 환경을 만들어주세요.
바닷가, 폐허, 산, 사막, 동굴, 성 등 다양한 환경을 만들 수 있습니다.
몬스터가 없는 상점이나 마을도 만들 수 있습니다. 몬스터가 없으면 monster를 null로 설정해주세요.
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
    "description": "눈 덮인 산에 살고 있는 설인. 눈을 먹는다. 불에 약하다.",
    "personality": "사나운",
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
      "description": "산에 살고 있는 소녀.",
      "personality": "냉정한"
    },
    {
      "key": "mountain_oldman",
      "name": "슈하임",
      "description": "산을 여기저기 돌아다니는 노인.",
      "personality": "무뚝뚝한, 아리송한, 농담을 좋아하는"
    }
  ],
  "environments": [
    { "key": "snow", "name": "눈", "icon": "Snowflake" },
    { "key": "mountain", "name": "산", "icon": "Mountain" }
  ]
}

response type: ONLY JSON (DO NOT INCLUDE ANYTHING ELSE)
{
  "key": string; // 맵의 key입니다. 영어로 작성해주세요.
  "name": string; // 맵의 이름입니다.
  "description": string; // 맵에 대한 간단한 설명입니다.
  "longDescription": string; // 맵에 대한 자세한 설명입니다. 지형을 최대한 상세히 작성해주세요.
  "startLogs": string[]; // 맵에 입장했을 때 나타나는 로그입니다. 최대한 상세한 주변 상황을 작성해주세요.

  "monster": {
    "name": string; // 몬스터의 이름입니다.
    "description": string; // 몬스터에 대한 간단한 설명입니다.
    "personality": string; // 몬스터의 성격입니다.

    "level": number; // 1~${maxLevel} (최대 ${maxLevel})

    "gold": number; // 몬스터가 드랍하는 골드의 양입니다.
    "place": string; // 몬스터가 출몰하는 위치입니다. 맵 안의 공간을 작성해주세요.
  } | null; // 몬스터가 없으면 null을 넣어주세요.

  "npc": {
    "key": string; // NPC의 key입니다. 영어로 작성해주세요.
    "name": string; // NPC의 이름입니다.
    "description": string; // NPC에 대한 간단한 설명입니다.
    "personality": string; // NPC의 성격입니다.
    "place": string; // NPC가 출몰하는 위치입니다. 맵 안의 공간을 작성해주세요.
  }[]; // 맵에 등장하는 NPC들입니다. 없으면 빈 배열을 넣어주세요.

  "environments": { 
    "key": string; // 환경의 key입니다. 영어로 작성해주세요.
    "name": string; // 환경의 이름입니다.
    "icon": ${ENVIRONMENTS.map((e) => `"${e}"`).join(" | ")} // 환경의 아이콘입니다.
  }[];

  "startLogs": string[];
}
`;
