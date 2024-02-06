import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Input, type IInputProps } from "../Input/input";
import type { FC, ChangeEvent, ReactNode, KeyboardEvent } from "react";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface IAutoCompleteProps extends Omit<IInputProps, "onSelect"> {
  /**
   * 获取数据 也可能是异步
   */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /**
   * 选中某一项后的回调函数
   */
  onSelect?: (item: DataSourceType) => void;
  /**
   * 自定义子项的模板
   */
  renderOption?: (item: DataSourceType) => ReactNode;
}

/**
 * AutoComplete component
 * ```js
 * import {AutoComplete} from 'min-design'
 * ```
 */
export const AutoComplete: FC<IAutoCompleteProps> = (props) => {
  const { fetchSuggestions, value, onSelect, renderOption, ...restProps } =
    props;
  // 输入框的值
  const [inputValue, setInputValue] = useState(value as string);
  // 获取的数据选项集
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  // loading 加载动画
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // 防抖hook
  const debounceValue = useDebounce(inputValue, 400);
  // 选中项的下标
  const [highlightIndex, setHighlightIndex] = useState(-1);
  //用来控制是否搜索
  const triggerSearch = useRef(false);
  // 点击外部可以关闭子选项
  const componentRef = useRef<HTMLDivElement>(null);
  useClickOutside(componentRef, () => {
    setShowDropdown(false);
    setSuggestions([]);
  });
  // 对输入框的值进行请求数据项时做防抖
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const result = fetchSuggestions(debounceValue);
      // 数据两种方式 同步和异步
      if (result instanceof Promise) {
        setLoading(true);
        result.then((res) => {
          setLoading(false);
          setSuggestions(res);
          if (res.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(result);
        if (result.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [fetchSuggestions, debounceValue]);

  // 选择时的一些规则
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;
    setHighlightIndex(index);
  };

  // 根据键盘来选择
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp":
        highlight(highlightIndex - 1);
        break;
      case "ArrowDown":
        highlight(highlightIndex + 1);
        break;
      case "Enter":
        highlightIndex >= 0 && handleSelect(suggestions[highlightIndex]);
        break;
      case "Escape":
        setShowDropdown(false);
        break;
    }
  };

  // 输入框内容改变时
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setInputValue(val);
    triggerSearch.current = true;
  };

  // 选中某项后 输入框的值替换
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    onSelect && onSelect(item);
    triggerSearch.current = false;
  };

  // 根据用户的自定义模板来渲染子选项
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  // 生成子选项
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([]);
          setShowDropdown(false)
        }}
      >
        <ul className="min-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const classnames = classNames("suggestion-item", {
              "is-active": highlightIndex === index,
            });
            return (
              <li
                key={index}
                className={classnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className="min-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...restProps}
      />

      {generateDropdown()}
    </div>
  );
};
