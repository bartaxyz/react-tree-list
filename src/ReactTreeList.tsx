import React from "react";
import styled from "styled-components";
import { ReactTreeListItem } from "./ReactTreeListItem";
import { useUniqueId } from "./utils/useUniqueId";

export interface ReactTreeListItemType {
  /**
   * Unique identificator of item. If not present, new one will be generated.
   */
  id?: string;

  /**
   * Custom component for arrow icon
   */
  arrowComponent?: React.ReactNode;

  /**
   * TODO
   */
  label?: string;

  /**
   * TODO
   */
  children?: ReactTreeListItemType[];

  /**
   * TODO
   */
  open?: boolean;

  /**
   * TODO
   */
  icon?: React.ReactNode;

  /**
   * Component that'll be rendered as arrow
   */
  arrow?: React.ReactNode;
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
   */
  itemDefaults?: Partial<Omit<ReactTreeListItemType, "id">>;
}

export const ReactTreeList: React.FC<ReactTreeListProps> = ({
  data,
  onChange,
  itemDefaults,
}) => {
  const { generate: generateUniqueId } = useUniqueId();

  const updateById = (
    updateId: string,
    updateData: Partial<ReactTreeListItemType>
  ) => {
    let breakUpdateId = false;

    const recursiveUpdateId = (
      item: ReactTreeListItemType,
      index: number,
      array: ReactTreeListItemType[]
    ) => {
      if (breakUpdateId) {
        return;
      }

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
      array: ReactTreeListItemType[]
    ) => {
      if (!listItem.id) {
        triggerOnChange = true;
        array[index] = {
          ...itemDefaults,
          ...listItem,
          id: generateUniqueId(),
        };
      }

      const item = array[index];

      children.push(
        <ReactTreeListItem
          key={item.id}
          item={item}
          indent={indent}
          onArrowClick={() => {
            if (item.id) {
              updateById(item.id, { open: !item.open });
            }
          }}
        />
      );

      if (item.children && item.open) {
        // Indent up before processing children
        indent += 1;

        item.children.forEach(renderItem);

        // Indent down after children processed
        indent -= 1;
      }
    };

    data.forEach(renderItem);

    if (triggerOnChange) {
      onChange([...data]);
    }

    return children;
  };

  return <Root>{renderContent()}</Root>;
};

const Root = styled.div``;
