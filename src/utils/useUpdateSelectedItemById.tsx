import { BaseItemType } from "../types/ItemTypes";
import cloneDeep from "lodash/cloneDeep";

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
        array[index] = cloneDeep({ ...item, selected: true });
      } else {
        array[index] = cloneDeep({ ...item, selected: false });
      }

      if (item.children) {
        item.children.forEach(recursiveUpdateId);
      }
    };

    data.forEach(recursiveUpdateId);
    callback(cloneDeep(data));
    return data;
  };
};
