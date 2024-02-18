import React, { useState, createContext, useEffect, useRef } from "react";
import classNames from "classnames";
import type { FC, FunctionComponentElement, ReactNode } from "react";
import { Input } from "../Input/input";
import Transition from "../Transition/transition";
import { ISelectOPtionProps } from "./option";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";

export interface ISelectProps {
  /**
   * 指定默认选中的条目
   */
  defaultValue?: string | string[];
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   *选择框默认文字
   */
  placeholder?: string;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * select input 的name属性
   */
  name?: string;
  /**
   * 选中值发生改变时触发
   */
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  /**
   * 下拉框出现/隐藏时触发
   */
  onVisibleChange?: (visible: boolean) => void;
  children?: ReactNode;
}

export interface ISelectContext {
  onSelect?: (value: string, isSelected?: boolean) => void;
  selectedValues: string[];
  multiple?: boolean;
}

export const SelectContext = createContext<ISelectContext>({
  selectedValues: [],
});

/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'min-design'
 * // 然后可以使用 <Select> 和 <Select.Option>
 * ~~~
 */
export const Select: FC<ISelectProps> = (props) => {
  const {
    disabled,
    multiple,
    name,
    onChange,
    defaultValue,
    onVisibleChange,
    placeholder,
    children,
  } = props;
  // 是否打开菜单
  const [menuOpen, setMenuOpen] = useState(false);
  // 多选
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  );
  // 单选
  const [value, setValue] = useState(
    typeof defaultValue === "string" ? defaultValue : ""
  );
  const containerRef = useRef<HTMLInputElement>(null);
  const containerWidth = useRef(0);
  const input = useRef<HTMLInputElement>(null);
  // 点击选项时的处理 当前项 当前状态
  const handleOptionClick = (value: string, isSelected?: boolean) => {
    if (!multiple) {
      // 不是多选 点击完赋值后就隐藏
      setMenuOpen(false);
      setValue(value);
      onVisibleChange?.(false);
    } else {
      setValue("");
    }
    let updatedValues = [value];
    if (multiple) {
      // 如果是多选 那么就应该根据当前项的状态来判断他应该是选中还是取消选中
      updatedValues = isSelected
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(updatedValues);
    }
    onChange?.(value, updatedValues);
  };

  useClickOutside(containerRef, () => {
    setMenuOpen(false);
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false);
    }
  });
  useEffect(() => {
    // focus input
    if (input.current) {
      input.current.focus();
      if (multiple && selectedValues.length > 0) {
        input.current.placeholder = "";
      } else {
        if (placeholder) input.current.placeholder = placeholder;
      }
    }
  }, [selectedValues, multiple, placeholder]);
  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current =
        containerRef.current.getBoundingClientRect().width;
    }
  });
  const handleClick = () => {
    if (!disabled) {
      // 没有禁止
      setMenuOpen(!menuOpen); // 切换菜单状态
      onVisibleChange?.(!menuOpen);
    }
  };

  const containerClass = classNames("min-select", {
    "menu-is-open": menuOpen,
    "is-disabled": disabled,
    "is-multiple": multiple,
  });
  // 传入的context
  const passedContext: ISelectContext = {
    onSelect: handleOptionClick,
    multiple: multiple,
    selectedValues: selectedValues,
  };

  // 生成子菜单
  const generateOptions = () => {
    return React.Children.map(children, (child, index) => {
      const childEle = child as FunctionComponentElement<ISelectOPtionProps>;
      if (childEle.type.displayName === "Option") {
        return React.cloneElement(childEle, {
          index: `select-${index}`,
        });
      } else {
        console.error(
          "Warning: Select has a child which is not a Option component"
        );
      }
    });
  };

  return (
    <div className={containerClass} ref={containerRef}>
      <div className="min-select-input" onClick={handleClick}>
        <Input
          ref={input}
          placeholder={placeholder}
          value={value}
          readOnly
          disabled={disabled}
          icon="angle-down"
          name={name}
        />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
          <ul className="min-select-dropdown">{generateOptions()}</ul>
        </Transition>
      </SelectContext.Provider>
      {multiple && (
        <div className="min-selected-tags">
          {selectedValues.map((value, index) => {
            return (
              <span className="min-tag" key={`tag-${index}`}>
                {value}
                <Icon
                  icon="times"
                  onClick={() => {
                    handleOptionClick(value, true);
                  }}
                />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
