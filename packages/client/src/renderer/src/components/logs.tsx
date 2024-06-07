import { useData } from "../store/store";
import cc from "classcat";

export default function Logs(): JSX.Element {
  const { logs, user } = useData();
  return (
    <div className="border-primary scrollbar-thumb-primary scrollbar-thin flex h-full min-h-0 shrink flex-col justify-end overflow-auto border p-4">
      {logs.map((log, index) => (
        <div
          key={index}
          className={cc([
            "fadein",
            log.type === "system" && "italic",
            log.type === "user" && "text-white",
            log.type === "npc" && "text-yellow-500",
          ])}
        >
          {log.prefix && (
            <span
              className={cc([
                log.prefix === "대성공" && "text-green-500",
                log.prefix === "성공" && "text-yellow-500",
                log.prefix === "실패" && "text-orange-500",
                log.prefix === "대실패" && "text-red-500",
              ])}
            >
              [{log.prefix}]{" "}
            </span>
          )}
          {log.type === "user" && `${user.name}: `}
          {log.npc && `${log.npc}: `}
          {log.text}
          {log.changes.length > 0 && (
            <div className="ml-1 mt-1 inline-flex gap-2">
              {log.changes.map((change, i) => (
                <div
                  key={i}
                  className={cc([
                    change.value > 0 ? "text-green-500" : "text-red-500",
                  ])}
                >
                  {change.key} {change.value > 0 && "+"}
                  {change.value}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
