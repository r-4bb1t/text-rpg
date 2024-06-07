import { create } from "zustand";

import { ITEMS } from "@shared/items";
import { LogType } from "@shared/types/log";
import { UserType } from "@shared/types/user";

export interface Store {
  user: UserType;
  setUser: (user: UserType) => void;

  addHp: (hp: number) => void;
  addMp: (mp: number) => void;

  logs: LogType[];
  addLog: (log: LogType) => void;

  items: {
    item: keyof typeof ITEMS;
    count: number;
  }[];
  addItem: (item: keyof typeof ITEMS, count: number) => void;
  removeItem: (item: keyof typeof ITEMS, count: number) => void;
}

export const useData = create<Store>((set) => ({
  user: {
    name: "",
    level: 1,
    str: 5,
    dex: 5,
    int: 5,
    luk: 5,

    hp: 100,
    mp: 50,

    gold: 30,
  },
  setUser: (user): void => set({ user }),

  addHp: (hp): void =>
    set((state) => ({ user: { ...state.user, hp: state.user.hp + hp } })),
  addMp: (mp): void =>
    set((state) => ({ user: { ...state.user, mp: state.user.mp + mp } })),

  logs: [],
  addLog: (log): void => set((state) => ({ logs: [...state.logs, log] })),

  items: [],
  addItem: (item, count): void =>
    set((state) => {
      const index = state.items.findIndex((i) => i.item === item);
      if (index === -1) {
        return { items: [...state.items, { item, count }] };
      }
      state.items[index].count += count;
      if (state.items[index].count <= 0) {
        state.items.splice(index, 1);
      }
      return { items: state.items.filter((i) => i.count > 0) };
    }),
  removeItem: (item, count): void =>
    set((state) => {
      const index = state.items.findIndex((i) => i.item === item);
      if (index === -1) {
        return { items: state.items };
      }
      state.items[index].count -= count;
      if (state.items[index].count <= 0) {
        state.items.splice(index, 1);
      }
      return { items: state.items };
    }),
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
