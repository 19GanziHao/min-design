import type { StoryFn, Meta, StoryObj } from "@storybook/react";

import {Select} from './select'
import { Option } from './option'
const meta: Meta<typeof Select> = {
  title: "custom/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;




export const DefaultSelect: StoryFn<typeof Select> = (args) => (
  <Select {...args} placeholder="请选择" multiple>
    <Option value="nihao" />
    <Option value="nihao1" />
    <Option value="nihao3" />
    <Option value="nihao4" />
    <Option value="nihao5" disabled />
  </Select>
);

