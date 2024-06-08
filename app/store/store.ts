import { josa } from "es-hangul";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { RESTARTMAP, STARTMAP } from "@/app/map";
import { ItemType } from "@/app/types/item";
import { LogType } from "@/app/types/log";
import { MapType } from "@/app/types/map";
import { MonsterType } from "@/app/types/monster";
import { NPCType } from "@/app/types/npc";
import { UserType } from "@/app/types/user";
import { getExp, getMaxExp, getMaxHP, getMaxMP } from "@/app/utils/level";

export interface Store {
  user: UserType;
  setUser: (user: UserType) => void;

  addHp: (hp: number) => void;
  addMp: (mp: number) => void;
  addStatus: (key: string, value: number) => void;
  addExp: (exp: number) => void;

  logs: LogType[];
  addLog: (log: LogType) => void;

  addTitle: (key: string, name: string, description: string) => void;
  removeTitle: (key: string) => void;

  items: {
    item: ItemType;
    count: number;
  }[];
  addItem: (item: ItemType, count: number) => void;

  monster: MonsterType | null;
  initMonster: (monster: MonsterType) => void;
  encounter: () => void;

  addNpc: (npc: NPCType) => void;

  map: MapType;
  route: MapType[];
  move: (newMap: MapType) => void;

  attack: (damage: number) => void;

  cleared: boolean;
  clear: () => void;

  reset: () => void;
  highscore: number;
}

export const useData = create(
  persist<Store>(
    (set) => ({
      highscore: 1,
      user: {
        name: "",
        level: 1,
        str: 5,
        dex: 5,
        int: 5,
        luk: 5,
        exp: 0,

        hp: getMaxHP(1),
        mp: getMaxMP(1),

        gold: 100,
        title: [
          {
            key: "beginner",
            name: "초보자",
            description: "열정에 가득찬 초보 모험가",
          },
        ],
      },
      setUser: (user): void => set({ user }),

      addHp: (hp): void =>
        set((state) => ({
          user: {
            ...state.user,
            hp: Math.min(state.user.hp + hp, getMaxHP(state.user.level)),
          },
        })),
      addMp: (mp): void =>
        set((state) => ({
          user: {
            ...state.user,
            mp: Math.max(
              0,
              Math.min(state.user.mp + mp, getMaxMP(state.user.level)),
            ),
          },
        })),
      addStatus: (key, value): void =>
        set((state) => {
          return {
            user: {
              ...state.user,
              [key]: state.user[key as "int" | "dex" | "str" | "luk"] + value,
            },
          };
        }),
      addExp: (e): void =>
        set((state) => {
          let exp = state.user.exp + e;
          let level = state.user.level;
          let hp = state.user.hp;
          let mp = state.user.mp;

          while (exp >= getMaxExp(state.user.level)) {
            exp -= getMaxExp(state.user.level);
            level += 1;
            hp = getMaxHP(level);
            mp = getMaxMP(level);
          }

          return {
            user: {
              ...state.user,
              level,
              exp,
              hp,
              mp,
              dex: state.user.dex + level - state.user.level,
              str: state.user.str + level - state.user.level,
              int: state.user.int + level - state.user.level,
              luk: state.user.luk + level - state.user.level,
            },
          };
        }),

      addTitle: (key, name, description): void =>
        set((state) => {
          if (state.user.title.find((t) => t.key === key)) {
            return {
              user: {
                ...state.user,
                title: state.user.title.map((t) => {
                  if (t.key == key) {
                    return { key, name, description };
                  }
                  return t;
                }),
              },
            };
          }

          return {
            user: {
              ...state.user,
              title: [...state.user.title, { key, name, description }],
            },
          };
        }),
      removeTitle: (key): void =>
        set((state) => {
          if (state.user.title.find((t) => t.key === key)) {
            return {
              user: {
                ...state.user,
                title: state.user.title.filter((t) => t.key !== key),
              },
            };
          }
          return state;
        }),

      logs: [],
      addLog: (log): void => set((state) => ({ logs: [...state.logs, log] })),

      items: [
        {
          item: {
            key: "wooden_stick",
            name: "나무 막대기",
            description: "공격력 10을 가진 나무 막대기",
          },
          count: 1,
        },
        {
          item: {
            key: "red_potion",
            name: "빨간 포션",
            description: "체력을 20 회복해주는 포션",
          },
          count: 2,
        },
        {
          item: {
            key: "bread",
            name: "빵",
            description: "아무 효과도 없는 퍽퍽한 빵",
          },
          count: 1,
        },
      ],
      addItem: (item, count): void =>
        set((state) => {
          let items = state.items;
          if (items.find((i) => i.item.key === item.key)) {
            items = state.items.map((i) => {
              if (i.item.key === item.key) {
                return { item, count: i.count + count };
              }
              return i;
            });
          } else {
            items.push({ item, count });
          }

          return { items: items.filter((i) => i.count > 0) };
        }),

      monster: null,
      initMonster: (monster): void => set({ monster }),
      encounterMonster: false,
      encounter: (): void => {
        set((state) => {
          if (!state.monster) {
            return state;
          }
          return { monster: { ...state.monster, encountered: true } };
        });
      },

      addNpc: (npc): void =>
        set((state) => {
          return {
            map: {
              ...state.map,
              npc: state.map.npc.map((n) => {
                if (n.key === npc.key) {
                  return npc;
                }
                return n;
              }),
            },
          };
        }),

      map: STARTMAP,
      route: [STARTMAP],

      move: (newMap: MapType): void => {
        console.log(newMap.monster);
        set((state) => {
          return {
            map: newMap,
            route: [...state.route, newMap],
            npc: [],
            monster: newMap.monster,
            cleared: false,
            encounterMonster: false,
            logs: [
              ...state.logs,
              {
                type: "move",
                text: "",
                changes: [],
              },
            ],
          };
        });
      },

      attack: (damage: number): void => {
        set((state) => {
          if (!state.monster) {
            return state;
          }
          const hp = state.monster.hp - damage;
          if (hp <= 0) {
            return { cleared: true };
          }
          return { monster: { ...state.monster, hp } };
        });
      },

      cleared: false,

      clear: (): void => {
        set((state) => {
          let exp =
            state.user.exp +
            getExp(state.monster!.level) +
            Math.floor(Math.random() * state.user.luk) * 5;
          const gold =
            state.monster!.gold +
            Math.floor(Math.random() * state.user.luk) * 10;
          let level = state.user.level;
          let hp = state.user.hp;
          let mp = state.user.mp;

          while (exp >= getMaxExp(state.user.level)) {
            exp -= getMaxExp(state.user.level);
            level += 1;
            hp = getMaxHP(level);
            mp = getMaxMP(level);
          }

          return {
            cleared: true,
            user: {
              ...state.user,
              level,
              gold: state.user.gold + gold,
              exp,
              hp,
              mp,
              dex: state.user.dex + level - state.user.level,
              str: state.user.str + level - state.user.level,
              int: state.user.int + level - state.user.level,
              luk: state.user.luk + level - state.user.level,
            },
            logs: [
              ...state.logs,
              {
                type: "system",
                text: `${josa(state.map.name, "을/를")} 클리어해 경험치 ${getExp(state.monster!.level)}와 골드 ${state.monster!.gold}를 획득했다.`,
                changes: [
                  { key: "골드", value: gold },
                  { key: "EXP", value: getExp(state.monster!.level) },
                ],
              },
            ],
          };
        });
      },

      reset: (): void => {
        set((state) => {
          const title = state.user.title;
          if (title.find((t) => t.key === "beginner")) {
            title.splice(
              title.findIndex((t) => t.key === "beginner"),
              1,
            );
          }
          if (!title.find((t) => t.key === "restarter")) {
            title.push({
              key: "restarter",
              name: "다시 시작한 자",
              description: "쓰러져도 굴하지 않는다",
            });
          }
          return {
            user: {
              ...state.user,
              level: 1,
              hp: getMaxHP(1),
              mp: getMaxMP(1),
              title,
              exp: 0,
            },
            logs: [
              ...state.logs,
              {
                text: "레벨도 초기화되고 가진 것도 모두 잃었지만 쉼터에서 재정비를 마치고 다시 모험을 떠난다...",
                type: "system",
                changes: [],
              },
            ],
            items: [
              {
                item: {
                  key: "wooden_stick",
                  name: "나무 막대기",
                  description: "공격력 10을 가진 나무 막대기",
                },
                count: 1,
              },
              {
                item: {
                  key: "red_potion",
                  name: "빨간 포션",
                  description: "체력을 20 회복해주는 포션",
                },
                count: 2,
              },
              {
                item: {
                  key: "bread",
                  name: "빵",
                  description: "아무 효과도 없는 퍽퍽한 빵",
                },
                count: 1,
              },
            ],
            monster: null,
            npc: [],
            map: RESTARTMAP,
            route: [RESTARTMAP],
            cleared: false,
            highscore: Math.max(state.highscore, state.user.level),
          };
        });
      },
    }),
    {
      name: "store",
    },
  ),
);

/* export const useStore = create(
  persist<Store>(
    (set) => ({
      user: {
        name: "",
        level: 1,
        str: 1,
        dex: 1,
        int: 1,
        luk: 1,
      },
      setUser: (user): void => set({ user }),

      logs: [],
      addLog: (log): void => set((state) => ({ logs: [...state.logs, log] })),
    }),
    {
      name: "store",
    },
  ),
); */
