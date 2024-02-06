import type { Meta, StoryObj } from "@storybook/react";

import Alert from "./alert";

const meta: Meta<typeof Alert> = {
  title: "custom/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
  args: {
    title: "这是一个标题",
    type: "success",
    closable: true,
  },
};

export const TitleAndDesc: Story = {
  args: {
    title: "这是一个有描述的标题",
    description: "我的一条描述",
    type: "default",
    closable: true,
  },
};
