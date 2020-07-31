import React from "react";
import styled from "styled-components";

export interface ReactTreeListItemProps {
  indent: number;
  label?: string;
  hasChildren: boolean;
  open?: boolean;
  onArrowClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export const ReactTreeListItem: React.FC<ReactTreeListItemProps> = (props) => {
  const { indent, label, onArrowClick } = props;

  return (
    <Root {...props}>
      <Arrow onClick={onArrowClick}>ᐅ</Arrow>
      <Icon>⬛</Icon>
      <Label>
        {label} {indent}
      </Label>
    </Root>
  );
};

const RootComponent: React.FC<ReactTreeListItemProps> = ({
  indent,
  label,
  hasChildren,
  open,
  onArrowClick,
  ...props
}) => <div draggable={true} {...props} />;

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

  &:hover {
    outline: 1px solid red;
  }

  ${Arrow} {
    transition: 100ms;
    visibility: ${({ hasChildren }) => (hasChildren ? "visible" : "hidden")};
    transform: rotate(${({ open }) => (open ? 90 : 0)}deg);
  }
`;
