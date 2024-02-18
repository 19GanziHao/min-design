import React from "react";
import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import classNames from "classnames";

export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link";

interface IBaseButtonProps {
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 按钮大小
   */
  size?: ButtonSize;
  /**
   * 按钮类型
   */
  btnType?: ButtonType;
  /**
   * 子属性
   */
  children: ReactNode;
  /**
   * 类型为link时所填写的跳转链接
   */
  href?: string;
}
// 原生按钮
type NativeButtonProps = IBaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
// 超链接按钮
type AnchorButtonProps = IBaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * ```js
 * import {Button} from 'min-design'
 * ```
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const { className, disabled, size, btnType, href, children, ...restProps } =
    props;

  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};
