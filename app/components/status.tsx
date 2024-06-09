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
    <div className="flex w-full shrink-0 flex-col gap-1 overflow-hidden border border-primary p-4 text-sm">
      <div className="flex w-full flex-col justify-between gap-1 md:flex-row md:items-center md:gap-4">
        <div className="w-40 shrink-0 whitespace-nowrap">
          {user.name || "???"} Lv. {user.level} (
          {Math.round((user.exp / getMaxExp(user.level)) * 100)}%)
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
          <div className="flex items-center gap-4">
            <div
              className={cc([
                "group relative flex w-fit items-center gap-1 whitespace-nowrap stroke-1 md:justify-center",
                user.hp > getMaxHP(user.level) * 0.5
                  ? "text-green-400"
                  : user.hp > getMaxHP(user.level) * 0.25
                    ? "text-yellow-400"
                    : "text-red-400",
              ])}
            >
              <div className="hover hover-down hover-left">
                체력입니다. 0이 되면 쓰러집니다.
              </div>
              <Cross size={16} />
              <b>HP</b> {user.hp} / {getMaxHP(user.level)}
            </div>
            <div className="group relative flex w-fit items-center gap-1 whitespace-nowrap stroke-1 text-blue-500 md:justify-center">
              <div className="hover hover-down hover-right md:hover-left text-center">
                마법을 사용할 때와
                <br className="md:hidden" />
                에너지를 사용하는
                <br className="md:hidden" />
                모든 행동에 사용됩니다.
              </div>
              <Sparkle size={16} />
              <b>MP</b> {user.mp} / {getMaxMP(user.level)}
            </div>

            <div className="group relative flex w-fit items-center gap-1 stroke-1 text-yellow-400 md:justify-center">
              <div className="hover md:hover-down hover-left md:hover-right">
                거래 등에 사용할 수 있는 소지금입니다.
              </div>
              <BadgeDollarSign size={16} /> {user.gold}
            </div>
          </div>

          <div className="grid w-full grid-cols-4 gap-4 md:flex md:place-items-end">
            <div className="group relative flex w-fit items-center gap-1 stroke-1 md:justify-center">
              <div className="hover hover-down">
                힘을 사용하는 행동의
                <br className="md:hidden" />
                판정에 사용됩니다.
              </div>
              <BicepsFlexed size={16} /> <b>STR</b> {user.str}
            </div>
            <div className="group relative flex w-fit items-center gap-1 stroke-1 md:justify-center">
              <div className="hover hover-down hover-right md:hover-left">
                지능을 사용하는 행동의
                <br className="md:hidden" />
                판정에 사용됩니다.
              </div>
              <Wand2 size={16} />
              <b>INT</b> {user.int}
            </div>
            <div className="group relative flex w-fit items-center gap-1 stroke-1 md:justify-center">
              <div className="hover md:hover-down">
                민첩성을 필요로 하는
                <br className="md:hidden" />
                행동의 판정에 사용됩니다.
              </div>
              <Wind size={16} />
              <b>DEX</b> {user.dex}
            </div>
            <div className="group relative flex w-fit items-center gap-1 stroke-1 md:justify-center">
              <div className="hover md:hover-down hover-right">
                행운은 모든 판정에
                <br className="md:hidden" />
                영향을 미칩니다.
              </div>
              <Clover size={16} />
              <b>LUK</b> {user.luk}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden gap-2 md:flex">
        <div className="w-8 shrink-0 pt-2">칭호</div>
        {user.title.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {user.title.map((title) => {
              return (
                <div
                  className="group relative flex w-fit items-center gap-1 border border-primary px-2 py-0.5 text-xs md:justify-center"
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

      <div className="hidden gap-2 md:flex">
        <div className="w-8 shrink-0 pt-2">가방</div>
        {items.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {items.map((item) => {
              return (
                <div
                  className="group relative flex w-fit items-center gap-1 border border-primary px-2 py-0.5 text-xs md:justify-center"
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
