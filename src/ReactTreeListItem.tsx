import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactTreeListItemType } from "./ReactTreeList";

export interface ReactTreeListItemProps {
  item: ReactTreeListItemType;
  indent: number;
  onFocusEnter?(item: ReactTreeListItemType): void;
  onArrowClick?(item: ReactTreeListItemType): void;
  onDragging?(dragging: boolean): void;
  onDragDrop?(id: string, toId: string): void;
}

export const ReactTreeListItem: React.FC<ReactTreeListItemProps> = ({
  onDragging,
  onDragDrop,
  ...props
}) => {
  const { item } = props;
  const { label } = item;

  const [dragging, setDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const onFocusKeyPress: React.HTMLAttributes<HTMLDivElement>["onKeyPress"] = (
    event
  ) => {
    if (event.which === 13) {
      onArrowClick();
    }
  };

  const onArrowClick = () => {
    if (props.onArrowClick) {
      props.onArrowClick(item);
    }
  };

  const onDragOver: React.HTMLAttributes<HTMLDivElement>["onDragOver"] = (
    event
  ) => event.preventDefault();

  const onDragStart: React.HTMLAttributes<HTMLDivElement>["onDragStart"] = (
    event
  ) => {
    onDragging && onDragging(true);

    if (item.id) {
      event.dataTransfer.setData("itemId", item.id);
    }
  };

  const onDragEnd: React.HTMLAttributes<HTMLDivElement>["onDragStart"] = (
    event
  ) => onDragging && onDragging(false);

  const onDrop: React.HTMLAttributes<HTMLDivElement>["onDrop"] = (event) => {
    if (
      event.dataTransfer.getData("itemId") !== item.id &&
      onDragDrop &&
      item.id
    ) {
      onDragDrop(event.dataTransfer.getData("itemId"), item.id);
    }

    setDragOver(false);
  };

  const onDragEnter = () => {
    setDragOver(true);
  };

  const onDragLeave = () => {
    setDragOver(false);
  };

  useEffect(() => {
    const dragStartHandler = () => {
      setDragging(true);
    };
    const dragEndHandler = () => {
      setDragging(false);
    };

    document.addEventListener("dragstart", dragStartHandler);
    document.addEventListener("dragend", dragEndHandler);
    return () => {
      document.removeEventListener("dragstart", dragStartHandler);
      document.removeEventListener("dragend", dragEndHandler);
    };
  }, []);

  return (
    <Root
      {...props}
      // Custom properties
      dragging={dragging}
      dragOver={dragOver}
      // Native attributes
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onKeyPress={onFocusKeyPress}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      {item.arrow && <Arrow onClick={onArrowClick}>{item.arrow}</Arrow>}
      {item.icon && <Icon>{item.icon}</Icon>}
      <Label>{label}</Label>
    </Root>
  );
};

const RootComponent: React.FC<
  ReactTreeListItemProps &
    React.HTMLAttributes<HTMLDivElement> & {
      dragging?: boolean;
      dragOver?: boolean;
    }
> = ({
  indent,
  item,
  onFocusEnter,
  onArrowClick,
  dragging,
  dragOver,
  ...props
}) => <div draggable={true} tabIndex={0} {...props} />;

const Arrow = styled.div``;
const Icon = styled.div``;
const Label = styled.div``;
const Root = styled(RootComponent)`
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: 8px;
  padding: 4px;
  padding-left: ${({ indent }) => indent * 24 + 12}px;
  align-items: center;

  transition: 100ms;

  outline: ${({ dragOver }) => (dragOver ? 1 : 0)}px dashed rgba(0, 0, 0, 0.25);

  * {
    pointer-events: ${({ dragging }) => (dragging ? "none" : "")};
  }

  &:focus {
    background: rgba(0, 0, 0, 0.1);
  }

  ${Arrow} {
    display: flex;
    transition: 100ms;
    visibility: ${({ item }) =>
      item.children && item.children.length ? "visible" : "hidden"};
    transform: rotate(${({ item }) => (item.open ? 90 : 0)}deg);
  }

  ${Icon} {
    display: flex;
    transition: 100ms;
  }
`;
