import { BaseItemType } from "../types";

/**
 * Assign IDs to any items missing them.
 * Returns [newData, changed]. Uses structural sharing — returns the
 * same array/item references when nothing in a subtree changed.
 */
export const assignMissingIds = <T extends BaseItemType>(
  data: T[],
  generate: () => string
): [T[], boolean] => {
  let changed = false;

  const recurse = (items: T[]): T[] => {
    let anyItemChanged = false;
    const result = items.map((item) => {
      const needsId = !item.id;
      const newChildren = item.children
        ? recurse(item.children as T[])
        : item.children;

      if (needsId || newChildren !== item.children) {
        anyItemChanged = true;
        changed = true;
        return {
          ...item,
          ...(needsId ? { id: generate() } : {}),
          ...(newChildren !== item.children ? { children: newChildren } : {}),
        } as T;
      }
      return item;
    });
    return anyItemChanged ? result : items;
  };

  const result = recurse(data);
  return [result, changed];
};
