import { useEffect, useRef } from "react";

import { useData } from "../store/store";
import cc from "classcat";

export default function Logs(): JSX.Element {
  const { logs, user, map } = useData();
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
    <div className="relative flex h-full flex-col overflow-hidden">
      <div className="absolute right-2 top-2 whitespace-nowrap border border-primary bg-gray-950 px-2 py-0.5 text-sm text-primary">
        {map.userLocation}
      </div>
      <div
        className="flex h-full flex-col justify-end overflow-auto border border-primary p-4 scrollbar-thin scrollbar-thumb-primary"
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
                <div className="my-4 h-0 w-full border-t border-dashed border-t-primary" />
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
                      난이도:{" "}
                      {(log.info.difficulty / log.info.standard).toFixed(2)}
                      <br />
                      계산값: {(log.info.value / log.info.standard).toFixed(2)}
                    </div>
                  )}
                  [{log.prefix}]{" "}
                </span>
              )}
              {log.type === "user" && `${user.name}: `}
              {log.npc && `${log.npc}: `}
              {log.text}
              {log.changes.length > 0 && (
                <div className="ml-1 mt-1 inline-flex flex-wrap gap-2 gap-y-0">
                  {log.changes.map((change, i) => (
                    <div
                      key={i}
                      className={cc([
                        "whitespace-nowrap",
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
    </div>
  );
}
