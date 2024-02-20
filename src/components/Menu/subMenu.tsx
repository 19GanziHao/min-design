import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { IMenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
export interface ISubMenuProps {
  index?: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 自定义类名
   */
  className?: string;

  children: React.ReactNode;
}

export const SubMenu: React.FC<ISubMenuProps> = ({
  index,
  className,
  title,
  children,
}) => {
  const context = useContext(MenuContext);
  const isOpened =
    context.defaultOpenSubMenus && index && context.mode === "vertical"
      ? context.defaultOpenSubMenus.includes(index)
      : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active":
      context.index === index || context.index.split("-")[0] === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });

  // 点击显示子列表 menu纵向排列就单击显示
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  // 悬浮显示 menu横向排列就单击显示
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault();
    clearTimeout(timer);

    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 200);
  };

  // 通过排列方式来判断使用哪个请求
  const clickEvents =
    context.mode === "vertical" ? { onClick: handleClick } : {};
  const mouseEvents =
    context.mode === "horizontal"
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {};

  // 渲染子列表
  const renderChildren = () => {
    const subMenuClasses = classNames("min-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<IMenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };
  // 渲染当前列表
  return (
    <li key={index} className={classes} {...mouseEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
