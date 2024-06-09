"use client";

import { useData } from "../store/store";
import cc from "classcat";
import { BriefcaseBusiness, ChevronRight, Crown, Route } from "lucide-react";

export default function Toolbar() {
  const { route, user, items } = useData();
  return (
    <header className="fixed left-0 top-0 z-10 flex h-16 w-screen items-center justify-between bg-transparent px-4">
      <div className="flex items-center gap-4">
        <div className="group relative">
          <div className="hover hover-down grid h-max w-max grid-cols-2 gap-2 py-3 md:grid-cols-4">
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

        <div className="group relative md:hidden">
          <div className="hover hover-down flex max-h-[500px] w-full max-w-[200px] flex-wrap gap-2 overflow-auto py-3 scrollbar-thin scrollbar-thumb-primary">
            {user.title.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {user.title.map((title) => {
                  return (
                    <div
                      className="relative flex items-center justify-center gap-1 whitespace-normal border border-primary px-2 py-0.5 text-xs"
                      key={title.key}
                    >
                      [{title.name}]<br />
                      {title.description}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <Crown className="stroke-2" />
        </div>

        <div className="group relative md:hidden">
          <div className="hover hover-down flex max-h-[500px] w-full max-w-[200px] flex-wrap gap-2 overflow-auto py-3 scrollbar-thin scrollbar-thumb-primary">
            {items.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {items.map((item) => {
                  return (
                    <div
                      className="relative flex items-center gap-1 border border-primary px-2 py-0.5 text-xs md:justify-center"
                      key={item.item.key}
                    >
                      {item.item.name} x {item.count}
                      <br />
                      {item.item.description}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <BriefcaseBusiness />
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
