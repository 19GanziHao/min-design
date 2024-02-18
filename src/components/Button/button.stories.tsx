import type { Meta, StoryObj } from "@storybook/react";

import {Button} from "./button";

const meta: Meta<typeof Button> = {
  title: "custom/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    btnType: "primary",
    children: "primary button",
  },
};

export const Default: Story = {
  args: {
    btnType: "danger",
    children: "default button",
  },
};
