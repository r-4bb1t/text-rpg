import { useData } from "../store/store";
import cc from "classcat";
import {
  BadgeDollarSign,
  BicepsFlexed,
  Clover,
  Cross,
  Sparkle,
  Wand2,
  Wind,
} from "lucide-react";

import { getMaxExp, getMaxHP, getMaxMP } from "@/app//utils/level";

export default function Status(): JSX.Element {
  const { user, items } = useData();
  return (
    <div className="border-primary flex flex-col gap-1 border p-4 text-sm">
      <div className="flex items-center justify-between">
        <div>
          {user.name || "???"} Lv. {user.level} (
          {Math.round((user.exp / getMaxExp(user.level)) * 100)}%)
        </div>
        <div
          className={cc([
            "flex items-center gap-1 whitespace-nowrap stroke-1",
            user.hp > getMaxHP(user.level) * 0.5
              ? "text-green-400"
              : user.hp > getMaxHP(user.level) * 0.25
                ? "text-yellow-400"
                : "text-red-400",
          ])}
        >
          <Cross size={16} />
          <b>HP</b> {user.hp} / {getMaxHP(user.level)}
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap stroke-1 text-blue-600">
          <Sparkle size={16} />
          <b>MP</b> {user.mp} / {getMaxMP(user.level)}
        </div>
        <div className="flex items-center gap-1 stroke-1">
          <BicepsFlexed size={16} /> <b>STR</b> {user.str}
        </div>
        <div className="flex items-center gap-1 stroke-1">
          <Wand2 size={16} />
          <b>INT</b> {user.int}
        </div>
        <div className="flex items-center gap-1 stroke-1">
          <Wind size={16} />
          <b>DEX</b> {user.dex}
        </div>
        <div className="flex items-center gap-1 stroke-1">
          <Clover size={16} />
          <b>LUK</b> {user.luk}
        </div>
        <div className="flex items-center gap-1 stroke-1 text-yellow-400">
          <BadgeDollarSign size={16} /> {user.gold}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-8 shrink-0 pt-2">칭호</div>
        {user.title.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {user.title.map((title) => {
              return (
                <div
                  className="border-primary group relative flex items-center justify-center gap-1 border px-2 py-0.5 text-xs"
                  key={title.key}
                >
                  <div className="hover">{title.description}</div>
                  {title.name}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <div className="w-8 shrink-0 pt-2">가방</div>
        {items.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {items.map((item) => {
              return (
                <div
                  className="border-primary group relative flex items-center justify-center gap-1 border px-2 py-0.5 text-xs"
                  key={item.item.key}
                >
                  <div className="hover">{item.item.description}</div>
                  {item.item.name} x {item.count}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
