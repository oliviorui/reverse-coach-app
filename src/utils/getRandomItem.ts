export type RandomItemResult<T> = {
  item: T;
  index: number;
};

export function getRandomItem<T>(
  items: T[],
  currentIndex?: number
): RandomItemResult<T> {
  if (items.length === 0) {
    throw new Error("A lista está vazia.");
  }

  if (items.length === 1) {
    return {
      item: items[0],
      index: 0,
    };
  }

  let randomIndex = Math.floor(Math.random() * items.length);

  while (randomIndex === currentIndex) {
    randomIndex = Math.floor(Math.random() * items.length);
  }

  return {
    item: items[randomIndex],
    index: randomIndex,
  };
}
