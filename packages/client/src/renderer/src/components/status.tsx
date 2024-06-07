import { useData } from "../store/store";
import {
  BadgeDollarSign,
  BicepsFlexed,
  Clover,
  Cross,
  Sparkle,
  Wand2,
  Wind,
} from "lucide-react";

import { getMaxHP, getMaxMP } from "@shared/utils/level";

export default function Status(): JSX.Element {
  const { user, items } = useData();
  return (
    <div className="border-primary border p-4 text-sm">
      <div className="flex items-center justify-between">
        <div>
          {user.name || "-"} (Lv. {user.level})
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap stroke-1 text-green-500">
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
          <b>DEX</b> {user.dex}
        </div>
        <div className="flex items-center gap-1 stroke-1">
          <Wind size={16} />
          <b>INT</b> {user.int}
        </div>
        <div className="flex items-center gap-1 stroke-1">
          <Clover size={16} />
          <b>LUK</b> {user.luk}
        </div>
        <div className="flex items-center gap-1 stroke-1">
          <BadgeDollarSign size={16} /> {user.gold}
        </div>
      </div>

      {items.length > 0 && (
        <div className="mt-2 flex items-center gap-2">
          {items.map((item) => {
            return (
              <div
                className="border-primary flex items-center gap-1 border px-1 py-0.5"
                key={item.item.key}
              >
                {item.item.name} x {item.count}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
