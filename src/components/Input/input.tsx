import {forwardRef} from 'react'
import classNames from "classnames";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { FC, ReactElement, InputHTMLAttributes } from "react";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";

export interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 尺寸大小
   */
  size?: InputSize;
  /**
   * icon图标
   */
  icon?: IconProp;
  /**
   * 添加前缀
   */
  prepand?: string | ReactElement;
  /**
   * 添加后缀
   */
  append?: string | ReactElement;
}
/**
 * Input component
 */

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (props, ref) => {
    const { disabled, size, icon, prepand, append, style, ...restProps } =
      props;

    const classes = classNames("min-input", {
      [`input-size-${size}`]: size,
      "is-disabled": disabled,
      "input-group": prepand || append,
      "input-group-append": !!append,
      "input-group-prepend": !!prepand,
    });

    return (
      <div className={classes} style={style}>
        {prepand && <div className="min-input-group-prepend">{prepand}</div>}
        <div>
          {icon && (
            <div className="icon-wrapper">
              <Icon icon={icon} title={`title-${icon}`} />
            </div>
          )}
          <input
            ref={ref}
            className="min-input-inner"
            disabled={disabled}
            {...restProps}
          />
        </div>
        {append && <div className="min-input-group-append">{append}</div>}
      </div>
    );
  }
); 
