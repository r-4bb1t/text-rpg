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

import { getMaxExp, getMaxHP, getMaxMP } from "@shared/utils/level";

export default function Status(): JSX.Element {
  const { user, items } = useData();
  return (
    <div className="border-primary border p-4 text-sm">
      <div className="flex items-center justify-between">
        <div>
          {user.name || "-"} Lv. {user.level} (
          {Math.round((user.exp / getMaxExp(user.level)) * 100)}%)
        </div>
        <div
          className={cc([
            "flex items-center gap-1 whitespace-nowrap stroke-1",
            user.hp > getMaxHP(user.level) * 0.5
              ? "text-green-500"
              : user.hp > getMaxHP(user.level) * 0.25
                ? "text-yellow-500"
                : "text-red-500",
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
        <div className="flex items-center gap-1 stroke-1">
          <BadgeDollarSign size={16} /> {user.gold}
        </div>
      </div>

      {user.title.length > 0 && (
        <div className="mt-2 flex items-center gap-2">
          <div className="w-8">칭호</div>
          {user.title.map((title) => {
            return (
              <div
                className="border-primary group relative flex flex-wrap items-center justify-center gap-1 border px-2 py-0.5 text-xs"
                key={title.key}
              >
                <div className="hover">{title.description}</div>
                {title.name}
              </div>
            );
          })}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-2 flex items-center gap-2">
          <div className="w-8">가방</div>
          {items.map((item) => {
            return (
              <div
                className="border-primary group relative flex flex-wrap items-center justify-center gap-1 border px-2 py-0.5 text-xs"
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
  );
}
