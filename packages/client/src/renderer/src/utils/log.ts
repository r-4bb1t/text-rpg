import { josa } from "es-hangul";

export const replaceLog = (log: string, user: string, map: string): string => {
  const replaced = log
    .replace(/%user%\(은\/는\)/g, josa(user, "은/는"))
    .replace(/%user%\(을\/를\)/g, josa(user, "을/를"))
    .replace(/%user%\(와\/과\)/g, josa(user, "와/과"))
    .replace(/%user%\(이\/가\)/g, josa(user, "이/가"))
    .replace(/%user%\(으로\/로\)/g, josa(user, "으로/로"))
    .replace(/%user%\(아\/야\)/g, josa(user, "아/야"))
    .replace(/%map%\(을\/를\)/g, josa(map, "을/를"))
    .replace(/%map%\(와\/과\)/g, josa(map, "와/과"))
    .replace(/%map%\(이\/가\)/g, josa(map, "이/가"))
    .replace(/%map%\(으로\/로\)/g, josa(map, "으로/로"))
    .replace(/%map%\(아\/야\)/g, josa(map, "아/야"));

  return replaced;
};
