import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface IMenuItemProps {
  /**
   * 当前哪一项 是否高亮
   */
  index?: string;
  /**
   * 是否禁止
   */
  disabled?: boolean;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;

  children?: React.ReactNode;
}

export const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;

  const context = useContext(MenuContext);

  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.defaultProps = {
  index: "0",
  disabled: false,
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
