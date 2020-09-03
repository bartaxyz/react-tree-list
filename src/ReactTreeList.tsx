import React, { useRef } from "react";
import styled from "styled-components";
import { ReactTreeListItem } from "./ReactTreeListItem";
import { useUniqueId } from "./utils/useUniqueId";

export interface ReactTreeListItemType {
  /**
   * Unique identificator of item. If not present, new one will be generated.
   */
  id?: string;

  /**
   * Text or custom component to be rendered as label/content of item
   */
  label?: React.ReactNode;

  /**
   * TODO:
   */
  children?: ReactTreeListItemType[];

  /**
   * Defines whether `children` should be displayed on screen
   *
   * Default: `false`
   */
  open?: boolean;

  /**
   * Custom component that'll be rendered as an icon
   */
  icon?: React.ReactNode;

  /**
   * Custom component that'll be rendered as an arrow
   *
   * Default: `"▸"`
   */
  arrow?: React.ReactNode;

  /**
   * Defines whether children can or cannot be passed into the item. If `false`, this element also
   * removes all current children. If you want to disallow only additional children but keep the
   * current, use `allowDropInside: false` instead.
   *
   * Default: `true`
   */
  allowChildren?: boolean;

  /**
   * Defines whether content can be dropped inside an item. Children are still allowed, it's just
   * impossible to drop any more children inside.
   *
   * Default: `true`
   */
  allowDropInside?: boolean;

  /**
   * Defines whether content can be dropped inside. Also adds a visual cue that the item is disabled.
   *
   * Default: `false`
   */
  disabled?: boolean;
}

export interface ReactTreeListProps {
  /**
   * TODO: Make a good documentation for this
   */
  data: ReactTreeListItemType[];

  /**
   * TODO: Make a good documentation for this
   */
  onChange(data: ReactTreeListItemType[]): void;

  /**
   * Defines the default values for item object
   *
   * Eg. `itemDefaults={{ open: true }}` will make all items open by default unless specified otherwise
   * inside each item separately.
   */
  itemDefaults?: Partial<Omit<ReactTreeListItemType, "id">>;
}

export const ReactTreeList: React.FC<ReactTreeListProps> = ({
  data,
  onChange,
  itemDefaults,
}) => {
  const { generate: generateUniqueId } = useUniqueId();

  const lastOpenState = useRef(false);

  const getById = (id: string): ReactTreeListItemType | undefined => {
    let item: ReactTreeListItemType | undefined;

    const recursiveGetById = (currentItem: ReactTreeListItemType) => {
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

  const updateById = (
    updateId: string | undefined,
    updateData: Partial<ReactTreeListItemType>
  ) => {
    if (!updateId) {
      return;
    }

    let breakUpdateId = false;

    const recursiveUpdateId = (
      item: ReactTreeListItemType,
      index: number,
      array: ReactTreeListItemType[]
    ) => {
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

    onChange([...data]);
  };

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

  const moveIdTo = (id: string, toId: string) => {
    const copyOfItem = removeByIdWithoutOnChange(id);

    if (!copyOfItem) return;

    const item = getById(toId);

    console.log("moveIdTo");

    if (item) {
      item.open = true;

      if (!item.children) {
        item.children = [copyOfItem];
      } else {
        item.children.unshift(copyOfItem);
      }

      onChange([...data]);
    }
  };

  const moveIdAfter = (id: string, afterId: string) => {
    const copyOfItem = removeByIdWithoutOnChange(id);
    let breakRecursion = false;

    console.log(copyOfItem);
    console.log(data);

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
      } else if (item.children) {
        item.children.forEach(recursiveMoveIdAfter);
      }
    };

    data.forEach(recursiveMoveIdAfter);

    onChange([...data]);
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
    /**
     * To make sure the event runs only once, we store in this variable
     * whether the event should run.
     */
    let triggerOnChange = false;

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
        array[index] = {
          ...itemDefaults,
          ...listItem,
          id: generateUniqueId(),
        };
      }

      const item = array[index];

      if (parentOpen) {
        children.push(
          <ReactTreeListItem
            key={item.id}
            item={item}
            indent={indent}
            allowDropBefore={isFirstItemInFirstLoop}
            onArrowClick={() => updateById(item.id, { open: !item.open })}
            onDragging={(drag) => {
              if (drag) {
                lastOpenState.current = !!item.open;
                updateById(item.id, { open: false });
              } else {
                updateById(item.id, { open: lastOpenState.current });
              }
            }}
            onDropInside={(id, toId) => moveIdTo(id, toId)}
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

    if (triggerOnChange) {
      onChange([...data]);
    }

    return children;
  };

  return <Root>{renderContent()}</Root>;
};

const Root = styled.div``;
