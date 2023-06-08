import React from "react";
import { Dropdown as ItemDropDown } from "antd";
import "./dropdown.scss";

interface ItemsProp {
  key: string;
  label: string;
}

interface Props {
  items: ItemsProp[];
  children: React.ReactNode;
  disabled?: boolean;
  parent: string;
  handleSortChange?: (e: any) => void;
}

const Dropdown = ({ items, children, disabled, parent, handleSortChange }: Props) => {
  return (
    <ItemDropDown
      trigger={["click"]}
      getPopupContainer={() => document.getElementById(parent) as HTMLElement}
      menu={{
        items,
        selectable: true,
        onClick: handleSortChange,
      }}
      overlayClassName="item-dropdown"
      disabled={disabled}
    >
      {children}
    </ItemDropDown>
  );
};

export default Dropdown;
