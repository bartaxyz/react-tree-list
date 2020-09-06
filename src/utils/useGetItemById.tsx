import { BaseItemType } from "../types/ItemTypes";

export const useGetItemById = <T extends BaseItemType>(data: T[]) => {
  return (id: string): T | undefined => {
    let item: T | undefined;

    const recursiveGetById = (currentItem: T) => {
      if (currentItem.id === id) {
        item = currentItem;
      }

      if (currentItem.children) {
        currentItem.children.forEach(recursiveGetById);
      }
    };

    data.forEach(recursiveGetById);

    return item;
  };
};
