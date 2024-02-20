import React, { Children, useState } from "react";
import type {
  ReactNode,
  FC,
  FunctionComponentElement,
  MouseEvent,
} from "react";
import classNames from "classnames";
import { ITabItemProps } from "./tabItem";

export interface ITabsProps {
  /**
   * 默认选中
   */
  defaultIndex?: number;
  /**
   * 选中的回调函数
   */
  onSelect?: (selectedIndex: number) => void;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * Tabs的样式，两种可选，默认为 line
   */
  type?: "line" | "card";
  children?: ReactNode;
}

export const Tabs: FC<ITabsProps> = ({
  defaultIndex,
  onSelect,
  className,
  children,
  type,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const navClasses = classNames("min-tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === "card",
  });

  const handleClick = (e: MouseEvent, index: number, disabled: boolean) => {
    if (!disabled) { // 没有禁用
      setActiveIndex(index);
      onSelect && onSelect(index);
    }
  }

  // 渲染nav
  const renderNavLinks = () => {
    return Children.map(children, (child, index) => {
      const childEl = child as FunctionComponentElement<ITabItemProps>;
      const { label, disabled = false } = childEl.props;
      const classes = classNames("min-tabs-nav-item", {
        disabled: disabled,
        "is-active": activeIndex === index,
      });

      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={(e) => handleClick(e, index, disabled)}
        >
          {label}
        </li>
      );
    });
  };

  // 渲染内容
  const renderContent = () => {
    return Children.map(children, (child, index) => { 
      if (index === activeIndex) {
        // 显示当前选中的内容
        return child;
      }
    })
  }

  return (
    <div className={className}>
      <ul className={navClasses}>{renderNavLinks()}</ul>
      <div className="min-tabs-content">{renderContent()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  type: "line"
}

export default Tabs