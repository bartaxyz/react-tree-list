import { BaseItemType } from "../types/ItemTypes";

export const useUpdateItemById = <T extends BaseItemType>(
  data: T[],
  callback: (data: T[]) => void
) => {
  return (updateId: string | undefined, updateData: Partial<T>) => {
    if (!updateId) {
      return;
    }

    let breakUpdateId = false;

    const recursiveUpdateId = (item: T, index: number, array: T[]) => {
      if (breakUpdateId) return;

      if (item.id === updateId) {
        array[index] = { ...item, ...updateData };
        breakUpdateId = true;
        return;
      }

      if (item.children) {
        item.children.forEach(recursiveUpdateId);
      }
    };

    data.forEach(recursiveUpdateId);

    callback([...data]);
  };
};
