import { SKILLTYPES } from "@shared/skills";
import { LogInputType, LogOutputType } from "@shared/types/input";
import { UserType } from "@shared/types/user";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    electron: any;
  }
}

export const getActionType = async (
  text: string,
): Promise<{
  type: keyof typeof SKILLTYPES;
  difficulty: number;
}> => {
  const result = await window.electron.getActionType(text);
  return result;
};

export const getLog = async (props: LogInputType): Promise<LogOutputType> => {
  const result = await window.electron.getLog(props);
  return result;
};

export const getResult = (
  type: keyof typeof SKILLTYPES,
  user: UserType,
  difficulty: number,
): string => {
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

  value = Math.random() * value * 2; // 0~value

  console.log(type, difficulty, value);

  switch (true) {
    case value < difficulty / 4:
      return "대실패";
    case value < difficulty / 2:
      return "실패";
    case value < difficulty:
      return "성공";
    default:
      return "대성공";
  }
};
