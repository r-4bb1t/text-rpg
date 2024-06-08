import { useCallback, useEffect, useRef, useState } from "react";

import { useData } from "../store/store";
import { getActionType, getLog, getResult } from "../utils/action";
import { josa } from "es-hangul";
import { Footprints } from "lucide-react";

import { LogType } from "@shared/types/log";
import { getDifficulty } from "@shared/utils/level";

export default function Input({
  loading,
  setLoading,
  moving,
  setMoving,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  moving: boolean;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const {
    user,
    setUser,
    addLog,
    logs,
    items,
    monster,
    map,
    move,
    addHp,
    addMp,
    addItem,
    addTitle,
    encounter,
    addStatus,
    cleared,
    attack,
    npc,
    addNpc,
    clear,
    addExp,
  } = useData();

  const handleSend = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      if (map.key === "start") {
        addLog({ text: value, type: "user", changes: [] });
        setMoving(true);
        setUser({ ...user, name: value });
        addLog({
          text: `${josa(value, "은/는")} 모험을 시작하기 위해 발걸음을 옮겼다...`,
          type: "system",
          changes: [],
        });
        const newMap = await window.electron.ipcRenderer.invoke("move", {
          user: value,
          maxLevel: 1,
        });
        move(newMap);
        setValue("");
        setMoving(false);
        return;
      }

      const { type, difficulty } = await getActionType({
        text: value,
        items,
        npc,
        map,
        logs: logs.slice(-5).map((log) => log.type + ": " + log.text),
        title: user.title,
        difficulty: getDifficulty(user.level),
      });
      const { result, value: val } = getResult(type, user, difficulty);
      const log = await getLog({
        action: value,
        result,
        map: { ...map, monster: cleared ? null : monster },
        logs: [...logs.slice(-10).map((log) => log.type + ": " + log.text)],
        user,
        items,
        monster,
      });
      addLog({ text: value, type: "user", changes: [] });
      setValue("");

      const c: LogType["changes"] = [];
      if (log.hpChange) {
        addHp(log.hpChange);
        c.push({
          key: "HP",
          value: log.hpChange,
        });
      }
      if (log.mpChange) {
        addMp(log.mpChange);
        c.push({
          key: "MP",
          value: log.mpChange,
        });
      }
      if (log.damage) {
        attack(log.damage);
        c.push({
          key: "공격",
          value: log.damage,
        });
      }
      if (log.exp) {
        addExp(log.exp);
        c.push({
          key: "EXP",
          value: log.exp,
        });
      }
      if (log.goldChange) {
        setUser({ ...user, gold: user.gold + log.goldChange });
        c.push({
          key: "골드",
          value: log.goldChange,
        });
      }
      if (log.statusChange?.length > 0) {
        log.statusChange.forEach((status) => {
          if (status.value === 0) return;
          addStatus(status.key.toLowerCase(), status.value);
          c.push({
            key: status.key,
            value: status.value,
          });
          return;
        });
      }
      if (log.itemsChange?.length > 0) {
        log.itemsChange.forEach((item) => {
          if (item.change === 0) return;
          addItem(item, item.change);
          c.push({
            key: item.name,
            value: item.change,
          });
        });
      }
      if (log.title?.length > 0) {
        log.title.forEach((title) => {
          addTitle(title.key, title.name, title.description);
          c.push({
            key: title.name,
            value: 1,
          });
        });
      }
      if (log.encounteredMonster) {
        encounter();
      }
      addLog({
        prefix: result,
        info: {
          type,
          difficulty: difficulty / getDifficulty(user.level),
          value: val / getDifficulty(user.level),
        },
        text: log.text,
        type: "system",
        changes: c,
      });
      if (log.clear || (monster && monster?.hp <= 0)) {
        clear();
      }

      if (log.script?.length > 0) {
        log.script.forEach((script, i) => {
          addNpc(script.npc);
          setTimeout(() => {
            addLog({
              npc: script.npc.name,
              text: script.utterance,
              type: "npc",
              changes: [],
            }),
              1000 + 500 * i;
          });
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [value]);

  useEffect(() => {
    if (!loading && !moving) inputRef.current?.focus();
  }, [loading, moving]);

  return (
    <div className="relative flex items-center gap-4">
      {moving && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Footprints className="animate-pulse" />
        </div>
      )}
      <input
        className="border-primary focus:outline-primary placeholder:text-primary/30 w-full border bg-transparent px-4 py-2 disabled:opacity-20"
        disabled={loading || moving}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder={
          map.key === "start" ? "이름이 무엇인가요?" : "어떤 행동을 하시겠어요?"
        }
        autoFocus
        ref={inputRef}
      />
      <button
        className="btn"
        disabled={loading || !value || moving}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
