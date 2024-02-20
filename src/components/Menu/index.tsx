import { FC } from "react";
import { Menu, IMenuProps } from "./menu";
import { SubMenu, ISubMenuProps } from "./subMenu";
import { MenuItem, IMenuItemProps } from "./menuItem";

type MenuComponent = FC<IMenuProps> & {
  Item: FC<IMenuItemProps>;
  SubMenu: FC<ISubMenuProps>;
};

const TransMenu = Menu as MenuComponent;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;