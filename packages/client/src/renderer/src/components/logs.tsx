import { useEffect, useRef } from "react";

import { useData } from "../store/store";
import cc from "classcat";

export default function Logs(): JSX.Element {
  const { logs, user } = useData();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [logs]);

  return (
    <div
      className="border-primary scrollbar-thumb-primary scrollbar-thin flex h-full flex-col justify-end overflow-auto border p-4"
      ref={scrollRef}
    >
      <div className="min-h-0">
        {logs.map((log, index) => (
          <div
            key={index}
            className={cc([
              "fadein py-0.5 last:pb-4",
              log.type === "system" && "italic",
              log.type === "user" && "text-white",
              log.type === "npc" && "text-yellow-400",
            ])}
          >
            {log.type === "move" && (
              <div className="border-t-primary my-4 h-0 w-full border-t border-dashed" />
            )}
            {log.prefix && (
              <span
                className={cc([
                  "group relative mr-2 inline-flex justify-center",
                  log.prefix === "대성공" && "text-green-400",
                  log.prefix === "성공" && "text-yellow-400",
                  log.prefix === "실패" && "text-orange-400",
                  log.prefix === "대실패" && "text-red-400",
                ])}
              >
                {log.info && (
                  <div className="hover hover-left">
                    판정: {log.info.type}
                    <br />
                    난이도: {log.info.difficulty}
                    <br />
                    계산값: {log.info.value.toFixed(1)}
                  </div>
                )}
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
                      change.value > 0 ? "text-green-400" : "text-red-400",
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
    </div>
  );
}
