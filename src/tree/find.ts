import { BaseItemType } from "../types";

/**
 * Find an item by ID with early exit.
 */
export const getItemById = <T extends BaseItemType>(
  data: T[],
  id: string
): T | undefined => {
  for (const item of data) {
    if (item.id === id) return item;
    if (item.children) {
      const found = getItemById(item.children as T[], id);
      if (found) return found;
    }
  }
  return undefined;
};
