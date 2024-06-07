import { useCallback, useState } from "react";

import { useData } from "../store/store";
import { getActionType, getLog, getResult } from "../utils/action";

import { LogType } from "@shared/types/log";

export default function Input({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
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
    encounter,
    npc,
    addNpc,
    clear,
  } = useData();

  const handleSend = useCallback(async (): Promise<void> => {
    addLog({ text: value, type: "user", changes: [] });
    try {
      setLoading(true);
      if (map.key === "start") {
        setUser({ ...user, name: value });
        setTimeout(() => move(), 1000);
        setValue("");
        return;
      }

      const { type, difficulty } = await getActionType(value);
      const { result, value: val } = getResult(type, user, difficulty);
      const log = await getLog({
        action: value,
        result,
        map,
        logs: [...logs.slice(-5).map((log) => log.type + ": " + log.text)],
        user: user.name,
        items,
        monster,
        gold: user.gold,
        hp: user.hp,
        mp: user.mp,
        npc,
      });
      setValue("");

      const c: LogType["changes"] = [];
      if (log.hp) {
        addHp(log.hp);
        c.push({
          key: "hp",
          value: log.hp,
        });
      }
      if (log.mp) {
        addMp(log.mp);
        c.push({
          key: "mp",
          value: log.mp,
        });
      }
      if (log.status.length > 0) {
        log.status.forEach((status) => {
          if (status.value === 0) return;
          setUser({
            ...user,
            [status.key.toLowerCase() as "str" | "int" | "dex" | "luk"]:
              user[status.key.toLowerCase() as "str" | "int" | "dex" | "luk"] +
              status.value,
          });
          c.push({
            key: status.key,
            value: status.value,
          });
        });
      }
      if (log.items.length > 0) {
        log.items.forEach((item) => {
          addItem(item, item.change);
          c.push({
            key: item.name,
            value: item.change,
          });
        });
      }
      if (log.encounter_monster) {
        encounter();
      }
      if (log.clear) {
        clear();
      }
      addLog({
        prefix: result,
        info: {
          type,
          difficulty,
          value: val,
        },
        text: log.text,
        type: "system",
        changes: c,
      });

      if (log.script.length > 0) {
        log.script.forEach((script, i) => {
          addNpc(script.npc);
          setTimeout(() => {
            addLog({
              npc: script.npc.name,
              text: script.text,
              type: "npc",
              changes: [],
            }),
              500 * i;
          });
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-4">
      <input
        className="border-primary focus:outline-primary placeholder:text-primary/30 w-full border bg-transparent px-4 py-2 disabled:opacity-20"
        disabled={loading}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder={
          map.key === "start" ? "이름이 무엇인가요?" : "어떤 행동을 하시겠어요?"
        }
        autoFocus
      />
      <button
        className="border-primary hover:bg-primary shrink-0 border px-4 py-2 hover:text-black disabled:opacity-20"
        disabled={loading || !value}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
