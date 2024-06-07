export const getMaxHP = (level: number): number => {
  return Math.floor(Math.sqrt(level * 2)) * 50;
};

export const getMaxMP = (level: number): number => {
  return level * 25;
};

export const getMaxExp = (level: number): number => {
  return level * 50;
};

export const getExp = (level: number): number => {
  return level * 25;
};
