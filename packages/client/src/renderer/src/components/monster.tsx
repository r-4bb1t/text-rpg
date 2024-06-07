import { useCallback } from "react";

import { useData } from "../store/store";
import cc from "classcat";

import { getMaxHP } from "@shared/utils/level";

export default function Monster({
  moving,
  setMoving,
}: {
  moving: boolean;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { monster, cleared, move, user, map } = useData();

  const handleMove = useCallback(async () => {
    setMoving(true);
    try {
      const newMap = await window.electron.ipcRenderer.invoke("move", {
        user: user.name,
        maxLevel: user.level + 1,
      });
      move(newMap);
    } catch (e) {
      console.error(e);
    } finally {
      setMoving(false);
    }
  }, [move, setMoving, user.name]);

  return monster ? (
    <div
      className={cc([
        "border-primary flex shrink-0 justify-between border px-4 py-2",
        !cleared && !monster.encountered && "opacity-30",
      ])}
    >
      {cleared ? (
        <div className="flex w-full flex-col items-center">
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
            HP: {monster.hp} / {getMaxHP(monster.level)}
          </div>
        </>
      )}
    </div>
  ) : map.key !== "start" ? (
    <div className="border-primary flex shrink-0 flex-col items-center justify-between border px-4 py-2">
      여기에는 몬스터가 없는 것 같습니다.
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
