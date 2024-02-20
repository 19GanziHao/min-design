import {FC } from 'react'
import { Form } from "./form";
import { FormItem, IFormItemProps } from "./formItem";

type FormComponent = typeof Form & {
  Item: FC<IFormItemProps>;
}

const TransForm: FormComponent = Form as FormComponent;

TransForm.Item = FormItem;

export default TransForm;