import {useContext} from 'react'
import type { FC, ReactNode } from "react";
import classNames from "classnames";
import { SelectContext } from './select'
import Icon from '../Icon/icon';

export interface ISelectOPtionProps {
  index?: string;
  /**
   * 默认根据此属性值进行筛选 该值不能相同
   */
  value: string;
  /**
   * 选项的标签 若不设置则默认与value相同
   */
  label?: string;
  /**
   * 是否禁用该选项
   */
  disabled?: boolean;
  children?: ReactNode;
}

export const Option: FC<ISelectOPtionProps> = (props) => {
  const { index, value, label, disabled, children } = props;
  const {onSelect, multiple, selectedValues } = useContext(SelectContext);
  const isSelected = selectedValues.includes(value);
  const classes = classNames('min-select-item', {
    'is-selected': isSelected,
    'is-disabled': disabled
  })
  // 
  const handleClick = ( value: string, isSelected:boolean) => {
    
    // 不禁用
    if (onSelect && !disabled) {
      // 当前的值和状态
      onSelect(value, isSelected);
    }
  }
  return (
    <li
      key={index}
      className={classes}
      onClick={() => {
        handleClick(value, isSelected);
      }}
    >
      {children || label || value}
      {multiple && isSelected && <Icon icon="check" />}
    </li>
  );
}

Option.displayName = 'Option'