import { actionTypeHook } from "../hooks/actionType";
import { logHook } from "../hooks/log";
import { getDifficulty } from "./level";

import {
  ActionInputType,
  ActionOutputType,
  LogInputType,
  LogOutputType,
} from "@/app/types/input";
import { SkillTypes, UserType } from "@/app/types/user";

export const getActionType = async (
  props: ActionInputType,
): Promise<ActionOutputType> => {
  const result = await actionTypeHook(props);
  return { ...result, difficulty: result.difficulty };
};

export const getLog = async (props: LogInputType): Promise<LogOutputType> => {
  const result = await logHook(props);
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

  value = Math.random() * 0.2 * Math.sqrt(value) * getDifficulty(user.level); // 0~value

  switch (true) {
    case value < difficulty / 4:
      return { result: "대실패", value };
    case value < difficulty / 1.5:
      return { result: "실패", value };
    case value < difficulty * 1.2:
      return { result: "성공", value };
    default:
      return { result: "대성공", value };
  }
};
