import { MapType } from "./types/map";

export const STARTMAP: MapType = {
  key: "start",
  name: "시작 지점",
  description: "여행을 시작하는 지점입니다.",

  monster: null,
  environments: [],

  startLogs: [
    "오늘, 한 모험가가 여행을 떠난다.",
    "가방에는 빨간 포션 몇 개, 빵을 들고...",
    "손에는 나무 막대기 하나.",
    "그 모험가의 이름은...",
  ],
};
