import { BaseItemType } from "../types";

/**
 * Remove an item by ID. Returns [newData, removedItem].
 * Immutable — never mutates the input.
 */
export const removeById = <T extends BaseItemType>(
  data: T[],
  id: string
): [T[], T | undefined] => {
  let removed: T | undefined;

  const recurse = (items: T[]): T[] => {
    const result: T[] = [];
    for (const item of items) {
      if (item.id === id) {
        removed = item;
        continue;
      }
      if (item.children && !removed) {
        const newChildren = recurse(item.children as T[]);
        if (removed) {
          result.push({ ...item, children: newChildren } as T);
          continue;
        }
      }
      result.push(item);
    }
    return result;
  };

  const newData = recurse(data);
  return [newData, removed];
};

/**
 * Move item `id` inside `toId` (as first child), opening the target.
 * Returns [newData, draggedItem, dropTarget].
 */
export const moveItemInside = <T extends BaseItemType & { open?: boolean }>(
  data: T[],
  id: string,
  toId: string
): [T[], T | undefined, T | undefined] => {
  const [withoutItem, removedItem] = removeById(data, id);
  if (!removedItem) return [data, undefined, undefined];

  let dropTarget: T | undefined;

  const insert = (items: T[]): T[] =>
    items.map((item) => {
      if (item.id === toId) {
        dropTarget = item;
        return {
          ...item,
          open: true,
          children: [removedItem, ...((item.children as T[]) ?? [])],
        } as T;
      }
      if (item.children) {
        const newChildren = insert(item.children as T[]);
        if (newChildren !== item.children)
          return { ...item, children: newChildren } as T;
      }
      return item;
    });

  return [insert(withoutItem), removedItem, dropTarget];
};

/**
 * Move item `id` before `beforeId`.
 * Returns [newData, draggedItem, dropTarget].
 */
export const moveItemBefore = <T extends BaseItemType>(
  data: T[],
  id: string,
  beforeId: string
): [T[], T | undefined, T | undefined] => {
  const [withoutItem, removedItem] = removeById(data, id);
  if (!removedItem) return [data, undefined, undefined];

  let dropTarget: T | undefined;

  const insert = (items: T[]): T[] =>
    items.flatMap((item) => {
      if (item.id === beforeId) {
        dropTarget = item;
        return [removedItem, item];
      }
      if (item.children && !dropTarget) {
        const newChildren = insert(item.children as T[]);
        if (newChildren !== item.children) {
          return [{ ...item, children: newChildren } as T];
        }
      }
      return [item];
    });

  return [insert(withoutItem), removedItem, dropTarget];
};

/**
 * Move item `id` after `afterId`.
 * Returns [newData, draggedItem, dropTarget].
 */
export const moveItemAfter = <T extends BaseItemType>(
  data: T[],
  id: string,
  afterId: string
): [T[], T | undefined, T | undefined] => {
  const [withoutItem, removedItem] = removeById(data, id);
  if (!removedItem) return [data, undefined, undefined];

  let dropTarget: T | undefined;

  const insert = (items: T[]): T[] =>
    items.flatMap((item) => {
      if (item.id === afterId) {
        dropTarget = item;
        return [item, removedItem];
      }
      if (item.children && !dropTarget) {
        const newChildren = insert(item.children as T[]);
        if (newChildren !== item.children) {
          return [{ ...item, children: newChildren } as T];
        }
      }
      return [item];
    });

  return [insert(withoutItem), removedItem, dropTarget];
};
