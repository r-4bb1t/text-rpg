"use client";

import { useData } from "../store/store";
import cc from "classcat";
import { ChevronRight, Route } from "lucide-react";

export default function Toolbar() {
  const { route } = useData();
  return (
    <header className="fixed inset-0 top-0 z-10 flex h-16 w-full items-center justify-between bg-transparent p-4">
      <div className="flex items-center gap-2">
        <div className="group relative">
          <div className="hover hover-down grid h-max w-max grid-cols-4 gap-2 py-3">
            {route.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={cc([
                    "flex h-12 w-20 items-center justify-center whitespace-normal break-keep border border-primary px-2 text-center text-xs",
                    (r.key === "start" || r.key === "restart") &&
                      "border-dashed",
                    i === route.length - 1 &&
                      "bg-primary font-semibold text-gray-950",
                  ])}
                >
                  {r.name}
                </div>
                {i < route.length - 1 && (
                  <ChevronRight className="shrink-0 stroke-2" size={16} />
                )}
              </div>
            ))}
          </div>
          <Route className="stroke-2" />
        </div>
      </div>
      <button
        className="btn btn-sm"
        onClick={() => {
          useData.persist.clearStorage();
          window.location.reload();
        }}
      >
        처음부터
      </button>
    </header>
  );
}
