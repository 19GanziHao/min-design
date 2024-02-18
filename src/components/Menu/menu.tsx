import React, { useState, createContext } from "react";
import classNames from "classnames";
import { IMenuItemProps } from './menuItem';

type MenuMode = "horizontal" | "vertical"; // 横向 | 竖向
type SelectCallback = (selectedIndex: string) => void;

export interface IMenuProps {
  /**
   * 默认选中高亮
   */
  defaultIndex?: string;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 排列模式
   */
  mode?: MenuMode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 选中哪一项的函数
   */
  onSelect?: SelectCallback;

  children?: React.ReactNode;
  /**
   * 默认展开subMenus
   */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

// 创建context
export const MenuContext = createContext<IMenuContext>({ index: "0" });

export const Menu: React.FC<IMenuProps> = (props) => {
  const {
    mode = "horizontal",
    defaultIndex,
    style,
    className,
    children,
    onSelect,
    defaultOpenSubMenus,
  } = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  // 基础的className
  const classes = classNames("min-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  function handleClick(index: string) {
    setCurrentActive(index);
    onSelect && onSelect(index);
  }
  // 要传入的context
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<IMenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        // 可以不传入index属性了 默认添加上
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: []
};
