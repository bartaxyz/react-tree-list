import { BaseItemType } from "../types/ItemTypes";
import { useDeepClone } from "../hooks/useDeepClone";

export const useUpdateSelectedItemById = <T extends BaseItemType>(
  data: T[],
  callback: (data: T[]) => void
) => {
  return (updateId: string | undefined) => {
    if (!updateId) {
      return;
    }
    const { deepClone } = useDeepClone();
    const recursiveUpdateId = (item: T, index: number, array: T[]) => {
      if (item.id === updateId) {
        array[index] = deepClone({ ...item, selected: true });
      } else {
        array[index] = deepClone({ ...item, selected: false });
      }

      if (item.children) {
        item.children.forEach(recursiveUpdateId);
      }
    };

    data.forEach(recursiveUpdateId);
    callback(deepClone(data));
    return data;
  };
};
