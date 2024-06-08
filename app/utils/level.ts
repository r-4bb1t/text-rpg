export const getMaxHP = (level: number): number => {
  return level * 50;
};

export const getMaxMP = (level: number): number => {
  return level * 25;
};

export const getMonsterMaxHP = (level: number): number => {
  return Math.floor(Math.sqrt(level) * 50);
};

export const getMaxExp = (level: number): number => {
  return level * 100;
};

export const getExp = (level: number): number => {
  return level * 30;
};

export const getDifficulty = (level: number): number => {
  return Math.floor(Math.sqrt(level * 1000));
};
