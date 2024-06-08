import {
  ActionInputType,
  LogInputType,
  LogOutputType,
} from "@shared/types/input";
import { SkillTypes, UserType } from "@shared/types/user";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    electron: any;
  }
}

export const getActionType = async (
  props: ActionInputType,
): Promise<{
  type: SkillTypes;
  difficulty: number;
}> => {
  const result = await window.electron.getActionType(props);
  return result;
};

export const getLog = async (props: LogInputType): Promise<LogOutputType> => {
  const result = await window.electron.getLog(props);
  return result;
};

export const getResult = (
  type: SkillTypes,
  user: UserType,
  difficulty: number,
): {
  result: "대실패" | "실패" | "성공" | "대성공";
  value: number;
} => {
  let value = 0;
  switch (type) {
    case "STR":
      value = user.str + user.luk; // 0~200
      break;
    case "DEX":
      value = user.dex + user.luk; // 0~200
      break;
    case "INT":
      value = user.int + user.luk; // 0~200
      break;
    case "LUK":
      value = user.luk * 2; // 0~200
      break;
  }

  value = Math.sqrt(Math.random() * value) * 3.5; // 0~value

  switch (true) {
    case value < difficulty / 4:
      return { result: "대실패", value };
    case value < difficulty / 2:
      return { result: "실패", value };
    case value < difficulty:
      return { result: "성공", value };
    default:
      return { result: "대성공", value };
  }
};
