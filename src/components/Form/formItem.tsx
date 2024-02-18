import React, { useContext, useEffect } from "react";
import type { FC, ReactNode } from "react";
import classNames from "classnames";
import { FormContext } from "./form";
import type { CustomRule } from "./useStore";
type SomeRequire<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export interface IFormItemProps {
  name: string;
  label?: string;
  children?: ReactNode;
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (e: any) => any;
  rules?: CustomRule[];
  validateTrigger?: string;
}

export const FormItem: FC<IFormItemProps> = (props) => {
  const {
    label,
    children,
    name,
    valuePropName,
    trigger,
    getValueFromEvent,
    rules,
    validateTrigger,
  } = props as SomeRequire<
    IFormItemProps,
    "getValueFromEvent" | "trigger" | "valuePropName" | "validateTrigger"
  >;
  const { dispatch, fields, initialValues, validateField } =
    useContext(FormContext);
  const rowClass = classNames("min-row", {
    "min-row-no-label": !label,
  });

  useEffect(() => {
    const value = initialValues[name] || "";
    dispatch({
      type: "addField",
      name,
      value: {
        label,
        name,
        value,
        rules: rules || [],
        errors: [],
        isValid: true,
      },
    });
  }, []);
  // 获取store对应的value
  const fieldState = fields[name];
  const value = fieldState?.value;
  const errors = fieldState && fieldState.errors;
  const isRequired = rules?.some(
    (rule) => typeof rule !== "function" && rule.required
  );
  const hasError = errors && errors.length > 0;
  const labelClass = classNames({
    "min-form-item-required": isRequired,
  });
  const itemClass = classNames("min-form-item-control", {
    "min-form-item-has-error": hasError,
  });
  // 更新的回调
  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e);
    dispatch({ type: "updateValue", name, value: value });
  };
  // 验证事件的触发
  const onValueValidate = async () => {
    await validateField(name);
  };
  // 1. 手动创建一个属性列表，需要有value以及onChange属性
  const controlProps: Record<string, any> = {};
  controlProps[valuePropName] = value;
  controlProps[trigger] = onValueUpdate;
  if (rules) {
    controlProps[validateTrigger] = onValueValidate;
  }
  // 2. 获取children数组的第一个元素
  const childList = React.Children.toArray(children);
  // 比如 表单元素
  const child = childList[0] as React.ReactElement;
  // 3. cloneElement,混合这个child以及手动的属性列表
  const returnChildNode = React.cloneElement(child, {
    ...child.props,
    ...controlProps,
  });
  return (
    <div className={rowClass}>
      {label && (
        <div className="min-form-item-label">
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      )}
      <div className="min-form-item">
        <div className={itemClass}>{returnChildNode}</div>
        {hasError && (
          <div className="min-form-item-explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

FormItem.defaultProps = {
  valuePropName: "value",
  trigger: "onChange",
  validateTrigger: "onBlur",
  getValueFromEvent: (e) => e.target.value,
};
