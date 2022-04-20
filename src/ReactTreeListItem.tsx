import { rgba } from "polished";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactTreeListItemType } from "./types/ItemTypes";

export interface ItemOptions {
  /**
   * Color of the focused item outline & on the drop area outline
   */
  focusedOutlineColor?: string;

  /**
   * Width of the focused item outline & of the drop area outline
   */
  focusedOutlineWidth?: number;

  /**
   * Border radius of the focused item
   */
  focusedBorderRadius?: number;

  /**
   * Background color of the focused item
   */
  focusedBackgroundColor?: string;
}

const DEFAULT_COLOR = rgba(0, 0, 255, 1);

export interface ReactTreeListItemProps {
  item: ReactTreeListItemType;
  selectedId: string;
  indent: number;
  allowDropBefore?: boolean;
  onSelected?(item: ReactTreeListItemType): void;
  onFocusEnter?(item: ReactTreeListItemType): void;
  onArrowClick?(item: ReactTreeListItemType): void;
  onDragging?(dragging: boolean): void;
  onDropInside?(id: string, toId: string): void;
  onDropBefore?(id: string, toId: string): void;
  onDropAfter?(id: string, toId: string): void;
  options: ItemOptions;
}

export const ReactTreeListItem: React.FC<ReactTreeListItemProps> = ({
  onDragging,
  onDropInside,
  onDropBefore,
  onDropAfter,
  allowDropBefore,
  ...props
}) => {
  const { item } = props;
  const { label } = item;
  const RootRef = useRef<HTMLDivElement>(null);
  const DropAreaRef = useRef<HTMLDivElement>(null);
  const BeforeDropAreaRef = useRef<HTMLDivElement>(null);
  const AfterDropAreaRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const [isDragged, setIsDragged] = useState(false);

  const setDragOver = (dragOver: boolean) => {
    if (dragOver) {
      RootRef.current?.classList.add("dragOver");
    } else if (RootRef.current?.classList.contains("dragOver")) {
      RootRef.current?.classList.remove("dragOver");
    }
  };

  const setBeforeDropAreaDragOver = (dragOver: boolean) => {
    if (dragOver) {
      BeforeDropAreaRef.current?.classList.add("dragOver");
    } else if (BeforeDropAreaRef.current?.classList.contains("dragOver")) {
      BeforeDropAreaRef.current?.classList.remove("dragOver");
    }
  };

  const setAfterDropAreaDragOver = (dragOver: boolean) => {
    if (dragOver) {
      AfterDropAreaRef.current?.classList.add("dragOver");
    } else if (AfterDropAreaRef.current?.classList.contains("dragOver")) {
      AfterDropAreaRef.current?.classList.remove("dragOver");
    }
  };

  const onDrag: React.HTMLAttributes<HTMLDivElement>["onDrag"] = () => {
    // setIsDragged(true);
  };

  const onDragStart: React.HTMLAttributes<HTMLDivElement>["onDragStart"] = (
    event
  ) => {
    onDragging && onDragging(true);

    if (item.id) {
      event.dataTransfer.setData("itemId", item.id);
    }
  };

  const onDragEnd: React.HTMLAttributes<HTMLDivElement>["onDragEnd"] = () => {
    onDragging && onDragging(false);
  };

  const onFocusKeyPress: React.HTMLAttributes<HTMLDivElement>["onKeyPress"] = (
    event
  ) => {
    if (event.which === 13) {
      onArrowClick();
    }
  };

  const onArrowClick = () => props.onArrowClick && props.onArrowClick(item);

  const onSelected = () => props.onSelected && props.onSelected(item);

  useEffect(() => {
    const dragStartHandler = () => {
      setDragging(true);
    };
    const dragEndHandler = () => {
      setDragging(false);
      setIsDragged(false);
    };

    document.addEventListener("dragstart", dragStartHandler);
    document.addEventListener("dragend", dragEndHandler);
    return () => {
      document.removeEventListener("dragstart", dragStartHandler);
      document.removeEventListener("dragend", dragEndHandler);
    };
  }, []);

  const dropArea: React.HTMLAttributes<HTMLDivElement> = {
    onDrop: (event) => {
      if (
        event.dataTransfer.getData("itemId") !== item.id &&
        onDropInside &&
        item.id
      ) {
        onDropInside(event.dataTransfer.getData("itemId"), item.id);
      }

      setDragOver(false);
    },
    onDragOver: (event) => event.preventDefault(),
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
  };

  const beforeDropArea: React.HTMLAttributes<HTMLDivElement> = {
    onDrop: (event) => {
      if (
        event.dataTransfer.getData("itemId") !== item.id &&
        onDropBefore &&
        item.id
      ) {
        onDropBefore(event.dataTransfer.getData("itemId"), item.id);
      }

      setBeforeDropAreaDragOver(false);
    },
    onDragOver: (event) => event.preventDefault(),
    onDragEnter: () => setBeforeDropAreaDragOver(true),
    onDragLeave: () => setBeforeDropAreaDragOver(false),
  };

  const afterDropArea: React.HTMLAttributes<HTMLDivElement> = {
    onDrop: (event) => {
      if (
        item.children &&
        item.children.length &&
        item.open &&
        onDropInside &&
        item.id
      ) {
        onDropInside(event.dataTransfer.getData("itemId"), item.id);
      } else if (
        event.dataTransfer.getData("itemId") !== item.id &&
        onDropAfter &&
        item.id
      ) {
        onDropAfter(event.dataTransfer.getData("itemId"), item.id);
      }

      setAfterDropAreaDragOver(false);
    },
    onDragOver: (event) => event.preventDefault(),
    onDragEnter: () => setAfterDropAreaDragOver(true),
    onDragLeave: () => setAfterDropAreaDragOver(false),
  };

  const onClick: React.HTMLAttributes<HTMLDivElement>["onClick"] = (event) => {
    onSelected();
  };

  return (
    <Root
      ref={RootRef}
      {...props}
      // Custom properties
      dragging={dragging}
      isDragged={isDragged}
      onClick={onClick}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onKeyPress={onFocusKeyPress}
    >
      {item.arrow && (
        <Arrow
          onClick={(event) => {
            event.stopPropagation();
            onArrowClick();
          }}
        >
          {item.arrow}
        </Arrow>
      )}
      {item.icon && <Icon>{item.icon}</Icon>}
      <Label>{label}</Label>

      {allowDropBefore && (
        <React.Fragment>
          <BeforeDropArea ref={BeforeDropAreaRef} {...beforeDropArea} />
          <BeforeDropAreaHighlight />
        </React.Fragment>
      )}

      <DropArea ref={DropAreaRef} {...dropArea} />
      <AfterDropArea ref={AfterDropAreaRef} {...afterDropArea} />
      <AfterDropAreaHighlight />
    </Root>
  );
};

const RootComponent = React.forwardRef<
  HTMLDivElement,
  ReactTreeListItemProps &
    React.HTMLAttributes<HTMLDivElement> & {
      ref?: React.RefObject<HTMLDivElement>;
      dragging?: boolean;
      isDragged?: boolean;
    }
>(
  (
    {
      indent,
      selectedId,
      item,
      onFocusEnter,
      onSelected,
      onArrowClick,
      dragging,
      isDragged,
      ...props
    },
    ref
  ) => <div ref={ref} draggable={true} tabIndex={0} {...props} />
);

const Arrow = styled.div``;
const Icon = styled.div``;
const Label = styled.div``;
const DropArea = styled.div``;
const BeforeDropArea = styled.div``;
const BeforeDropAreaHighlight = styled.div``;
const AfterDropArea = styled.div``;
const AfterDropAreaHighlight = styled.div``;
const Root = styled(RootComponent)`
  position: relative;
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: 8px;
  padding: 4px;
  padding-left: ${({ indent }) => indent * 24 + 12}px;
  align-items: center;
  border-radius: ${({ options }) => options.focusedBorderRadius ?? 4}px;
  transition: background 100ms;
  background-color: ${({ item, selectedId, options }) =>
    item.selected || selectedId === item.id
      ? options.focusedBackgroundColor ?? rgba(DEFAULT_COLOR, 0.075)
      : "transparent"};

  opacity: ${({ isDragged }) => (isDragged ? 0.5 : 1)};

  &.dragOver {
    box-shadow: inset 0 0 0
      ${({ options }) => options.focusedOutlineWidth ?? 2}px
      ${({ options }) => options.focusedOutlineColor ?? DEFAULT_COLOR};
  }

  ${Arrow}, ${Arrow} *,
  ${Icon}, ${Icon} *,
  ${Label}, ${Label} * {
    pointer-events: ${({ dragging }) => (dragging ? "none" : "")};
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

  ${DropArea} {
    display: ${({ dragging }) => (dragging ? "block" : "none")};
    position: absolute;
    top: 15%;
    left: 0;
    width: 100%;
    height: 70%;
    z-index: 10;
  }

  ${BeforeDropArea}, ${AfterDropArea} {
    display: ${({ dragging }) => (dragging ? "block" : "none")};
    position: absolute;
    height: 30%;
    width: 100%;
    z-index: 11;
  }
  ${BeforeDropArea} {
    top: 0;
    transform: translateY(-50%);

    &.dragOver + ${BeforeDropAreaHighlight} {
      display: block;
    }
  }
  ${AfterDropArea} {
    bottom: 0;
    transform: translateY(50%);

    &.dragOver + ${AfterDropAreaHighlight} {
      display: block;
    }
  }

  ${BeforeDropAreaHighlight} ,${AfterDropAreaHighlight} {
    display: none;
    position: absolute;
    z-index: 9;
    height: ${({ options }) => options.focusedOutlineWidth ?? 2}px;
    background: ${({ options }) =>
      options.focusedOutlineColor ?? DEFAULT_COLOR};
    width: calc(
      100% -
        ${({ indent, item }) =>
          (indent +
            (item.open && item.children && item.children.length ? 1 : 0)) *
            24 +
          12}px
    );
    margin-left: ${({ indent, item }) =>
      (indent + (item.open && item.children && item.children.length ? 1 : 0)) *
        24 +
      12}px;
  }
  ${BeforeDropAreaHighlight} {
    top: -1px;
  }
  ${AfterDropAreaHighlight} {
    bottom: -1px;
  }
`;
