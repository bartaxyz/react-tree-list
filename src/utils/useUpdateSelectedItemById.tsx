import { BaseItemType } from "../types/ItemTypes";

export const useUpdateSelectedItemById = <T extends BaseItemType>(
  data: T[],
  callback: (data: T[]) => void
) => {
  return (updateId: string | undefined) => {
    if (!updateId) {
      return;
    }
    const recursiveUpdateId = (item: T, index: number, array: T[]) => {
      if (item.id === updateId) {
        array[index] = { ...item, selected: true };
      } else {
        array[index] = { ...item, selected: false };
      }

      if (item.children) {
        item.children.forEach(recursiveUpdateId);
      }
    };

    data.forEach(recursiveUpdateId);
    callback([...data]);
  };
};
