import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ItemOptions, ReactTreeListItem } from "./ReactTreeListItem";
import { useUniqueId } from "../hooks/useUniqueId";
import { ReactTreeListItemType } from "../types";
import {
  assignMissingIds,
  moveItemAfter,
  moveItemBefore,
  moveItemInside,
  setSelectedById,
  updateItemById,
} from "../tree";

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
  const [currentSelectedId, setCurrentSelectedId] = useState(selectedId);

  // Assign missing IDs when data changes
  useEffect(() => {
    const [newData, changed] = assignMissingIds(data, generateUniqueId);
    if (changed) onChange(newData);
  }, [data]);

  // Sync external selectedId prop
  useEffect(() => {
    if (selectedId !== undefined) {
      setCurrentSelectedId(selectedId);
    }
  }, [selectedId]);

  const stripChildren = (
    item: ReactTreeListItemType
  ): ReactTreeListItemType => {
    const { children, ...rest } = item;
    return rest;
  };

  const handleSelect = (item: ReactTreeListItemType) => {
    setCurrentSelectedId(item.id ?? "");
    onChange(setSelectedById(data, item.id!));
    onSelected?.({ ...item });
  };

  const handleMoveInside = (id: string, toId: string) => {
    const [newData, draggedItem, dropTarget] = moveItemInside(data, id, toId);
    if (!draggedItem) return;
    onChange(newData);
    if (onDrop && dropTarget) {
      onDrop(stripChildren(draggedItem), stripChildren(dropTarget), "inner");
    }
  };

  const handleMoveBefore = (id: string, beforeId: string) => {
    const [newData, draggedItem, dropTarget] = moveItemBefore(
      data,
      id,
      beforeId
    );
    if (!draggedItem) return;
    onChange(newData);
    if (onDrop && dropTarget) {
      onDrop(stripChildren(draggedItem), stripChildren(dropTarget), "before");
    }
  };

  const handleMoveAfter = (id: string, afterId: string) => {
    const [newData, draggedItem, dropTarget] = moveItemAfter(data, id, afterId);
    if (!draggedItem) return;
    onChange(newData);
    if (onDrop && dropTarget) {
      onDrop(stripChildren(draggedItem), stripChildren(dropTarget), "after");
    }
  };

  const renderContent = () => {
    const children: React.ReactNode[] = [];
    let indent = 0;

    const renderItem = (
      listItem: ReactTreeListItemType,
      index: number,
      array: ReactTreeListItemType[],
      parentOpen?: boolean,
      isFirstLoop?: boolean
    ) => {
      const isFirstItemInFirstLoop = isFirstLoop && index === 0;
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
            onSelected={() => handleSelect(item)}
            onArrowClick={() =>
              onChange(updateItemById(data, item.id!, { open: !item.open }))
            }
            onDragging={(drag) => {
              if (drag) {
                lastOpenState.current = !!item.open;
                onChange(updateItemById(data, item.id!, { open: false }));
              } else {
                onChange(
                  updateItemById(data, item.id!, {
                    open: lastOpenState.current,
                  })
                );
              }
            }}
            onDropInside={handleMoveInside}
            onDropBefore={handleMoveBefore}
            onDropAfter={handleMoveAfter}
          />
        );
      }

      if (item.children) {
        indent += 1;
        item.children.forEach((nestedListItem, nestedIndex, nestedArray) =>
          renderItem(
            nestedListItem,
            nestedIndex,
            nestedArray,
            parentOpen ? item.open : false
          )
        );
        indent -= 1;
      }
    };

    data.forEach((listItem, index, array) =>
      renderItem(listItem, index, array, true, true)
    );

    return children;
  };

  return <Root>{renderContent()}</Root>;
};

const Root = styled.div``;
