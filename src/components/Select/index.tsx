import {FC} from 'react'
import { Select, ISelectProps } from "./select";
import { Option, ISelectOPtionProps } from "./option";

type SelectComponent = FC<ISelectProps> & {
  Option: FC<ISelectOPtionProps>;
}

const transSelect: SelectComponent = Select as SelectComponent;

transSelect.Option = Option;

export default transSelect;