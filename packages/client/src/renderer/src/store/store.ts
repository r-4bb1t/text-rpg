import { create } from "zustand";

import { ItemType } from "@shared/types/item";
import { LogType } from "@shared/types/log";
import { MonsterType } from "@shared/types/monster";
import { NPCType } from "@shared/types/npc";
import { UserType } from "@shared/types/user";
import { getExp, getMaxHP, getMaxMP } from "@shared/utils/level";
import { MapType } from "@shared/types/map";
import { STARTMAP } from "@shared/map";

export interface Store {
  user: UserType;
  setUser: (user: UserType) => void;

  addHp: (hp: number) => void;
  addMp: (mp: number) => void;

  logs: LogType[];
  addLog: (log: LogType) => void;

  items: {
    item: ItemType;
    count: number;
  }[];
  addItem: (item: ItemType, count: number) => void;

  monster: MonsterType | null;
  initMonster: (monster: MonsterType) => void;
  encounterMonster: boolean;
  encounter: () => void;

  npc: NPCType[];
  addNpc: (npc: NPCType) => void;

  map: MapType;
  route: MapType[];
  move: () => void;

  attack: (damage: number) => void;
  beattacked: (damage: number) => void;

  cleared: boolean;
  clear: () => void;
}

export const useData = create<Store>((set) => ({
  user: {
    name: "",
    level: 1,
    str: 5,
    dex: 5,
    int: 5,
    luk: 5,
    exp: 0,

    hp: 100,
    mp: 50,

    gold: 0,
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
        mp: Math.min(state.user.mp + mp, getMaxMP(state.user.level)),
      },
    })),

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
    set({ encounterMonster: true });
  },

  npc: [],
  addNpc: (npc): void =>
    set((state) => {
      if (state.npc.find((n) => n.key === npc.key)) {
        return state;
      }
      return { npc: [...state.npc, npc] };
    }),

  map: STARTMAP,
  route: [STARTMAP],

  move: (): void => {
    const newMap = window.electron.ipcRenderer.invoke("move");
    if (!newMap) {
      return;
    }
    set((state) => {
      const route = state.route;
      route.push(newMap);
      return { map: newMap, route };
    });
  },

  attack: (damage: number): void => {
    set((state) => {
      if (!state.monster) {
        return state;
      }
      const hp = state.monster.hp - damage;
      if (hp <= 0) {
        return { monster: null, encounterMonster: false };
      }
      return { monster: { ...state.monster, hp } };
    });
  },
  beattacked: (damage: number): void => {
    set((state) => {
      if (!state.monster) {
        return state;
      }
      return { user: { ...state.user, hp: state.user.hp - damage } };
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
        state.monster!.gold + Math.floor(Math.random() * state.user.luk) * 10;
      let level = state.user.level;
      let hp = state.user.hp;
      let mp = state.user.mp;
      while (exp >= getExp(state.user.level)) {
        exp -= getExp(state.user.level);
        level += 1;
        hp = getMaxHP(level);
        mp = getMaxHP(level);
      }

      return {
        cleared: true,
        monster: null,
        user: {
          ...state.user,
          level,
          gold: state.user.gold + gold,
          exp,
          hp,
          mp,
        },
      };
    });
  },
}));

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
