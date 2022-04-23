import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { cloneDeep } from "lodash";
import { ItemOptions, ReactTreeListItem } from "./ReactTreeListItem";
import { useUniqueId } from "./hooks/useUniqueId";
import { ReactTreeListItemType } from "./types/ItemTypes";
import { useGetItemById } from "./utils/useGetItemById";
import { useUpdateItemById } from "./utils/useUpdateItemById";
import { useUpdateSelectedItemById } from "./utils/useUpdateSelectedItemById";

export interface ReactTreeListProps {
  /**
   * The data to display in the list.
   */
  data: ReactTreeListItemType[];

  /**
   * Enable dragging of the items
   */
  draggable?: boolean | true;

  /**
   * Function that is triggered when data changes
   */
  onChange(data: ReactTreeListItemType[]): void;

  /**
   * The ID of the selected item
   */
  selectedId?: string | "";

  /**
   * Function that is triggered when an item is selected
   */
  onSelected?(item: ReactTreeListItemType): void;

  /**
   * Function that is triggered when drag completed
   */
  onDrop?(
    draggingNode: ReactTreeListItemType,
    dropNode: ReactTreeListItemType,
    dropType: string
  ): void;

  /**
   * Defines the default values for item object
   *
   * Eg. `itemDefaults={{ open: true }}` will make all items open by default unless specified otherwise
   * inside each item separately.
   */
  itemDefaults?: Partial<Omit<ReactTreeListItemType, "id">>;

  /**
   * Options for the items
   */
  itemOptions?: ItemOptions;
}

export const ReactTreeList: React.FC<ReactTreeListProps> = ({
  draggable,
  data,
  selectedId,
  onChange,
  onSelected,
  onDrop,
  itemDefaults,
  itemOptions = {},
}) => {
  const { generate: generateUniqueId } = useUniqueId();
  const lastOpenState = useRef(false);

  const getItemById = useGetItemById<ReactTreeListItemType>(data);
  const updateItemById = useUpdateItemById<ReactTreeListItemType>(
    data,
    onChange
  );

  const [currentSelectedId, setCurrentSelectedId] = useState(selectedId);

  const updateSelectedItemById =
    useUpdateSelectedItemById<ReactTreeListItemType>(data, onChange);

  /**
   * To make sure the event runs only once, we store in this variable
   * whether the event should run.
   */
  let triggerOnChange = false;

  let selectedOnChange = false;

  const removeByIdWithoutOnChange = (
    id: string
  ): ReactTreeListItemType | undefined => {
    let returnItem: ReactTreeListItemType | undefined = undefined;

    const recursiveRemoveId = (
      item: ReactTreeListItemType,
      index: number,
      array: ReactTreeListItemType[]
    ) => {
      if (returnItem) return;

      if (item.id === id) {
        returnItem = item;
        array.splice(index, 1);
        return;
      }

      if (item.children) {
        item.children.forEach(recursiveRemoveId);
      }
    };

    data.forEach(recursiveRemoveId);

    return returnItem;
  };

  const selectedNode = (item: ReactTreeListItemType) => {
    selectedOnChange = true;
    setCurrentSelectedId(item.id || "");

    if (onSelected) {
      onSelected(cloneDeep(item));
    }
  };

  const moveIdTo = (id: string, toId: string) => {
    const copyOfItem = removeByIdWithoutOnChange(id);
    if (!copyOfItem) return;

    const item = getItemById(toId);

    if (item) {
      item.open = true;

      if (!item.children) {
        item.children = [copyOfItem];
      } else {
        item.children.unshift(copyOfItem);
      }

      triggerOnChange = true;

      if (onDrop && item) {
        const dragingNode = cloneDeep(copyOfItem);
        if ("children" in dragingNode) {
          delete dragingNode.children;
        }

        const dragNode = cloneDeep(item);
        if ("children" in dragNode) {
          delete dragNode.children;
        }

        onDrop(dragingNode, dragNode, "inner");
      }
    }
  };

  const moveIdBefore = (id: string, beforeId: string) => {
    const copyOfItem = removeByIdWithoutOnChange(id);
    let dragNode: ReactTreeListItemType | null = null;
    let breakRecursion = false;

    if (!copyOfItem) return;

    const recursiveMoveIdAfter = (
      item: ReactTreeListItemType,
      index: number,
      array: ReactTreeListItemType[]
    ) => {
      if (breakRecursion) return;

      if (item.id === beforeId) {
        array.splice(index, 0, copyOfItem);
        breakRecursion = true;
        dragNode = cloneDeep(item);
      } else if (item.children) {
        item.children.forEach(recursiveMoveIdAfter);
      }
    };

    data.forEach(recursiveMoveIdAfter);

    triggerOnChange = true;

    if (onDrop && dragNode) {
      const dragingNode = cloneDeep(copyOfItem);
      if ("children" in dragingNode) {
        delete dragingNode.children;
      }

      if ("children" in dragNode) {
        delete (dragNode as ReactTreeListItemType).children;
      }

      onDrop(dragingNode, dragNode, "before");
    }
  };

  const moveIdAfter = (id: string, afterId: string) => {
    const copyOfItem = removeByIdWithoutOnChange(id);
    let dragNode = null;
    let breakRecursion = false;

    if (!copyOfItem) return;

    const recursiveMoveIdAfter = (
      item: ReactTreeListItemType,
      index: number,
      array: ReactTreeListItemType[]
    ) => {
      if (breakRecursion) return;

      if (item.id === afterId) {
        array.splice(index + 1, 0, copyOfItem);
        breakRecursion = true;
        dragNode = cloneDeep(item);
      } else if (item.children) {
        item.children.forEach(recursiveMoveIdAfter);
      }
    };

    data.forEach(recursiveMoveIdAfter);

    triggerOnChange = true;

    if (onDrop && dragNode) {
      const dragingNode = cloneDeep(copyOfItem);
      if ("children" in dragingNode) {
        delete dragingNode.children;
      }

      if ("children" in dragNode) {
        delete (dragNode as ReactTreeListItemType).children;
      }

      onDrop(dragingNode, dragNode, "after");
    }
  };

  const renderContent = () => {
    /**
     * The children will be rendered as flat, contrary to the tree
     * structure of data.
     */
    const children: React.ReactNode[] = [];
    /**
     * A counter for the indentation of items
     */
    let indent = 0;
    const renderItem = (
      listItem: ReactTreeListItemType,
      index: number,
      array: ReactTreeListItemType[],
      parentOpen?: boolean,
      isFirstLoop?: boolean
    ) => {
      const isFirstItemInFirstLoop = isFirstLoop && index === 0;

      if (!listItem.id) {
        triggerOnChange = true;
        array[index].id = generateUniqueId();
      }

      const item = array[index];

      if (parentOpen) {
        children.push(
          <ReactTreeListItem
            key={item.id}
            draggable={draggable ?? true}
            selectedId={currentSelectedId || ""}
            item={{ ...itemDefaults, ...item }}
            options={itemOptions}
            indent={indent}
            allowDropBefore={isFirstItemInFirstLoop}
            onSelected={() => {
              updateSelectedItemById(item.id);
              selectedNode(item);
            }}
            onArrowClick={() => updateItemById(item.id, { open: !item.open })}
            onDragging={(drag) => {
              if (drag) {
                lastOpenState.current = !!item.open;
                updateItemById(item.id, { open: false });
              } else {
                updateItemById(item.id, { open: lastOpenState.current });
              }
            }}
            onDropInside={(id, toId) => moveIdTo(id, toId)}
            onDropBefore={(id, beforeId) => moveIdBefore(id, beforeId)}
            onDropAfter={(id, afterId) => moveIdAfter(id, afterId)}
          />
        );
      }

      if (item.children) {
        // Indent up before processing children
        indent += 1;

        item.children.forEach((nestedListItem, nestedIndex, nestedArray) =>
          renderItem(
            nestedListItem,
            nestedIndex,
            nestedArray,
            parentOpen ? item.open : false
          )
        );

        // Indent down after children processed
        indent -= 1;
      }
    };

    data.forEach((listItem, index, array) =>
      renderItem(listItem, index, array, true, true)
    );

    return children;
  };

  useEffect(() => {
    if (triggerOnChange) {
      onChange(cloneDeep(data));
    }
  }, [triggerOnChange]);

  return <Root>{renderContent()}</Root>;
};

const Root = styled.div``;
