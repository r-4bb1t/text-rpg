import { useCallback, useState } from "react";

import { useData } from "../store/store";
import { getActionType, getLog, getResult } from "../utils/action";

import { ITEMS, items } from "@shared/items";
import { MAPS } from "@shared/maps";
import { npcs } from "@shared/npcs";
import { LogType } from "@shared/types/log";

export default function Input({
  map,
  setMap,
  loading,
  setLoading,
}: {
  map: keyof typeof MAPS;
  setMap: React.Dispatch<React.SetStateAction<keyof typeof MAPS>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [value, setValue] = useState("");
  const {
    user,
    setUser,
    addLog,
    logs,
    addHp,
    addMp,
    addItem,
    items: userItems,
  } = useData();

  const handleSend = useCallback(async (): Promise<void> => {
    addLog({ text: value, type: "user", changes: [] });
    try {
      setLoading(true);
      if (map === MAPS.START) {
        setUser({ ...user, name: value });
        setTimeout(() => setMap(MAPS.LYRIN), 1000);
        setValue("");
        return;
      }

      const { type, difficulty } = await getActionType(value);
      const result = getResult(type, user, difficulty);
      const log = await getLog({
        action: value,
        result,
        map: `${map}`,
        logs: [...logs.slice(-5).map((log) => log.type + ": " + log.text)],
        user: user.name,
        items: userItems,
      });
      setValue("");
      console.log(log);
      const changes: LogType["changes"] = [];
      if (log.hp) {
        addHp(log.hp);
        changes.push({
          key: "hp",
          value: log.hp,
        });
      }
      if (log.mp) {
        addMp(log.mp);
        changes.push({
          key: "mp",
          value: log.mp,
        });
      }
      if (log.items.length > 0) {
        log.items.forEach((item) => {
          addItem(item.key as keyof typeof ITEMS, item.count);
          changes.push({
            key: items[item.key as keyof typeof ITEMS].name,
            value: item.count,
          });
        });
      }
      addLog({
        prefix: result,
        text: log.text,
        type: "system",
        changes,
      });
      if (log.script.length > 0) {
        log.script.forEach((script) =>
          addLog({
            npc: npcs[script.key].name,
            text: script.text,
            type: "npc",
            changes: [],
          }),
        );
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
          map === MAPS.START ? "이름이 무엇인가요?" : "어떤 행동을 하시겠어요?"
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
