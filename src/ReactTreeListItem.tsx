import React from "react";
import styled from "styled-components";
import { ReactTreeListItemType } from "./ReactTreeList";

export interface ReactTreeListItemProps {
  item: ReactTreeListItemType;
  indent: number;
  onFocusEnter?(item: ReactTreeListItemType): void;
  onArrowClick?(item: ReactTreeListItemType): void;
}

export const ReactTreeListItem: React.FC<ReactTreeListItemProps> = (props) => {
  const { indent, item } = props;

  const { label } = item;

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

  return (
    <Root {...props} onKeyPress={onFocusKeyPress}>
      {item.arrow && <Arrow onClick={onArrowClick}>{item.arrow}</Arrow>}
      {item.icon && <Icon>{item.icon}</Icon>}
      <Label>
        {label} {indent}
      </Label>
    </Root>
  );
};

const RootComponent: React.FC<
  ReactTreeListItemProps & React.HTMLAttributes<HTMLDivElement>
> = ({ indent, item, onFocusEnter, onArrowClick, ...props }) => (
  <div draggable={true} tabIndex={0} {...props} />
);

const Arrow = styled.div``;
const Icon = styled.div``;
const Label = styled.div``;
const Root = styled(RootComponent)`
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: 8px;
  padding: 8px;
  padding-left: ${({ indent }) => indent * 24 + 12}px;
  align-items: center;

  &:focus {
    outline: 1px solid red;
  }

  ${Arrow} {
    transition: 100ms;
    visibility: ${({ item }) => (item.children ? "visible" : "hidden")};
    transform: rotate(${({ item }) => (item.open ? 90 : 0)}deg);
  }
`;
