import { MapType } from "./types/map";

export const STARTMAP: MapType = {
  key: "start",
  name: "시작 지점",
  description: "여행을 시작하는 지점입니다.",
  longDescription: "시작 지점입니다. 여행을 시작할 수 있습니다.",

  monster: null,
  environments: [],
  npc: [],

  startLogs: [
    "오늘, 한 모험가가 여행을 떠난다.",
    "가방에는 빨간 포션 몇 개와 빵을 챙기고...",
    "손에는 나무 막대기 하나.",
    "그 모험가의 이름은...",
  ],
};

export const RESTARTMAP: MapType = {
  key: "restart",
  name: "쉼터",
  description: "모험가의 쉼터입니다.",
  longDescription:
    "모험을 다시 시작할 수 있는 지점입니다. 여행을 다시 시작할 수 있습니다.",

  monster: null,
  environments: [],
  npc: [],

  startLogs: [
    "다시 한 번 여행을 떠난다.",
    "재정비를 하고...",
    "레벨은 초기화되었지만, 경험은 남아있다.",
  ],
};
