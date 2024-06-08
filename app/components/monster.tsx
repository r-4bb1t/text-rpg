import { useCallback } from "react";

import { moveHook } from "../hooks/move";
import { useData } from "../store/store";
import cc from "classcat";
import { Crown } from "lucide-react";

import { getMonsterMaxHP } from "@/app//utils/level";

export default function Monster({
  moving,
  setMoving,
  setLoading,
}: {
  moving: boolean;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { monster, cleared, move, user, map, addLog } = useData();

  const handleMove = useCallback(async () => {
    setMoving(true);
    try {
      const newMap = await moveHook({
        user: user.name,
        maxLevel: user.level + 1,
      });
      move(newMap);
      newMap.startLogs.forEach((log, i) => {
        setTimeout(() => {
          addLog({
            text: log,
            type: "system",
            changes: [],
          });
          if (i === map.startLogs.length - 1) {
            setLoading(false);
          }
        }, 1500 * i);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setMoving(false);
    }
  }, [
    setMoving,
    user.name,
    user.level,
    move,
    addLog,
    map.startLogs.length,
    setLoading,
  ]);

  return monster ? (
    <div
      className={cc([
        "flex shrink-0 justify-between border border-primary px-4 py-2",
        !cleared && !monster.encountered && "opacity-30",
      ])}
    >
      {cleared ? (
        <div className="flex w-full flex-col items-center text-sm">
          <Crown size={16} className="stroke-2" />
          스테이지를 클리어했습니다.
          <button
            className="btn btn-sm mt-2"
            disabled={moving}
            onClick={handleMove}
          >
            모험을 계속한다
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-baseline gap-2">
            {monster.encountered && monster.personality} {monster.name} Lv.
            {monster.level}{" "}
            {monster.encountered && (
              <div className="text-xs">{monster.description}</div>
            )}
          </div>
          <div>
            HP: {monster.hp} / {getMonsterMaxHP(monster.level)}
          </div>
        </>
      )}
    </div>
  ) : map.key !== "start" ? (
    <div className="flex shrink-0 flex-col items-center justify-between border border-primary px-4 py-2 text-sm">
      여기에는 강력한 보스 몬스터가 없는 것 같습니다.
      <button
        className="btn btn-sm mt-2"
        disabled={moving}
        onClick={handleMove}
      >
        모험을 계속한다
      </button>
    </div>
  ) : (
    <></>
  );
}
