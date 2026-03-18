import { BaseItemType } from "../types";

/**
 * Return a new tree with the item at `id` updated with `updates`.
 * Uses structural sharing — only clones nodes on the path to the target.
 */
export const updateItemById = <T extends BaseItemType>(
  data: T[],
  id: string,
  updates: Partial<T>
): T[] => {
  return data.map((item) => {
    if (item.id === id) {
      return { ...item, ...updates };
    }
    if (item.children) {
      const newChildren = updateItemById(item.children as T[], id, updates);
      if (newChildren !== item.children) {
        return { ...item, children: newChildren };
      }
    }
    return item;
  });
};

/**
 * Return a new tree with `selected: true` on the item matching `id`
 * and `selected: false` on all others.
 */
export const setSelectedById = <
  T extends BaseItemType & { selected?: boolean }
>(
  data: T[],
  id: string
): T[] => {
  return data.map((item) => {
    const selected = item.id === id;
    const newChildren = item.children
      ? setSelectedById(item.children as T[], id)
      : undefined;

    if (item.selected !== selected || newChildren !== item.children) {
      return {
        ...item,
        selected,
        ...(newChildren !== undefined ? { children: newChildren } : {}),
      };
    }
    return item;
  });
};
