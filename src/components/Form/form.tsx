import { createContext, forwardRef, useImperativeHandle } from "react";
import { ValidateError } from "async-validator";
import type { FC, ReactNode, FormEvent } from "react";
import useStore, { FormState } from "./useStore";

type RenderProps = (form: FormState) => ReactNode;

export interface IFormProps {
  /**
   * form的名称
   */
  name?: string;
  children?: ReactNode | RenderProps;
  /**
   * 每项默认值
   */
  initialValues?: any;
  /**
   * 成功的回调
   */
  onFinish?: (values: Record<string, any>) => void;
  /**
   * 失败的回调
   */
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void;
}

export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  "dispatch" | "fields" | "validateField"
> &
  Pick<IFormProps, "initialValues">;

export const FormContext = createContext<IFormContext>({} as IFormContext);

// 组件暴露的实例方法类型
export type FormRef = Omit<
  ReturnType<typeof useStore>,
  "fields" | "dispatch" | "form"
>;

export const Form = forwardRef<FormRef, IFormProps>((props, ref) => {
  const { name, children, initialValues, onFinish, onFinishFailed } = props;

  const { form, fields, dispatch, ...restProps } = useStore(initialValues);
  const { validateField, validateAllFields } = restProps;

  useImperativeHandle(ref, () => {
    return {
      ...restProps,
    };
  });

  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    console.log(123);
    e.preventDefault();
    e.stopPropagation();
    const { isValid, errors, values } = await validateAllFields();
    // 成功回调
    if (isValid && onFinish) onFinish(values);
    // 失败回调
    if (!isValid && onFinishFailed) onFinishFailed(values, errors);
  };

  // 支持自定义render props
  let childrenRender: ReactNode;

  if (typeof children === "function") {
    childrenRender = children(form);
  } else {
    childrenRender = children;
  }

  return (
    <form name={name} className="min-form" onSubmit={submitForm}>
      <FormContext.Provider value={passedContext}>
        {childrenRender}
      </FormContext.Provider>
    </form>
  );
});

Form.defaultProps = {
  name: "min_form",
};
