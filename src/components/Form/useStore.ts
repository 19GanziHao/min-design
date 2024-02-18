import { useState, useReducer } from "react";
import Schema, { RuleItem, ValidateError } from "async-validator";
import { mapValues, each } from "lodash-es";
// 用于自定义规则的类型
type CustomRuleFunc = ({ getFieldValue }: { getFieldValue: any }) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;

export interface FieldDetail {
  name: string;
  value: string;
  rules: CustomRule[];
  isValid: boolean;
  errors: ValidateError[];
}

export interface FieldsState {
  [key: string]: FieldDetail;
}

export interface FormState {
  isValid: boolean;
  isSubmitting: boolean; // 表单是否在提交中
  errors: Record<string, ValidateError[]>; // 错误的集合
}

interface ValidateErrorType extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
}

export interface FieldsAction {
  type: "addField" | "updateValue" | "updateValidateResult";
  name: string; // 修改的字段
  value: any; // 修改的值
}

function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case "addField":
      return {
        ...state,
        [action.name]: { ...action.value },
      };
    case "updateValue":
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      };
    case "updateValidateResult":
      const { isValid, errors } = action.value;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors },
      };
    default:
      return state;
  }
}

function useStore(initialValues?: Record<string, any>) {
  const [form, setForm] = useState<FormState>({
    isValid: true,
    isSubmitting: false,
    errors: {},
  });
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  // 获取字段的值
  const getFieldValue = (key: string) => {
    return fields[key]?.value;
  };
  // 获取所有字段的值 {'username': value, 'password': value}
  const getFieldsValue = () => {
    return mapValues(fields, (item) => item.value);
  };
  // 设置字段的值
  const setFieldValue = (name: string, value: any) => {
    if (fields[name]) {
      dispatch({ type: "updateValue", name, value });
    }
  };
  // 恢复默认值
  const resetFields = () => {
    if (initialValues) {
      each(initialValues, (value, name) => {
        if (fields[name]) {
          dispatch({type: 'updateValue', name, value})
        }
      });
    }
  };
  // 转换rules的类型
  const transformRules = (rules: CustomRule[]) => {
    return rules.map((rule) => {
      return typeof rule === "function" ? rule({ getFieldValue }) : rule;
    });
  };
  // 验证字段函数
  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const alterRules = transformRules(rules);
    // 验证的规则
    const descriptor = {
      [name]: alterRules,
    };
    // 验证的值
    const valueMap = {
      [name]: value,
    };
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];
    try {
      // 进行验证
      await validator.validate(valueMap);
    } catch (error) {
      isValid = false;
      const err = error as ValidateErrorType;
      errors = err.errors;
    } finally {
      // 更新验证结果
      dispatch({
        type: "updateValidateResult",
        name,
        value: { isValid, errors },
      });
    }
  };
  // 验证表单
  const validateAllFields = async () => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};
    // 需要验证的值
    const valueMap = mapValues(fields, (item) => item.value);
    // {'username': value}
    const descriptor = mapValues(fields, (item) => transformRules(item.rules));
    // {'username': rules}

    const validator = new Schema(descriptor);
    setForm({ ...form, isSubmitting: true });
    try {
      await validator.validate(valueMap);
    } catch (error) {
      isValid = false; // 不合法
      const err = error as ValidateErrorType;
      errors = err.fields;

      each(fields, (value, name) => {
        
        // errors 中有对应的key
        if (errors[name]) {
          const itemErrors = errors[name];
          dispatch({
            type: "updateValidateResult",
            name,

            value: { isValid: false, errors: itemErrors },
          });
        } else if (value.rules.length > 0) {
          // 有对应的rules 并没有errors
          dispatch({
            type: "updateValidateResult",
            name,

            value: { isValid: true, errors: [] },
          });
        }
      });
    } finally {
      setForm({ ...form, isSubmitting: false, isValid, errors });
      return {
        isValid,
        errors,
        values: valueMap,
      };
    }
  };
  return {
    fields,
    dispatch,
    form,
    validateField,
    validateAllFields,
    resetFields,
    setFieldValue,
    getFieldsValue,
  };
}

export default useStore;
