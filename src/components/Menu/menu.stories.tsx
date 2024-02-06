import type { StoryFn, Meta, StoryObj } from "@storybook/react";

import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const meta: Meta<typeof Menu> = {
  title: "custom/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof Menu>;

const Ele = () => {
  return (
    <>
      <div>123</div>
    </>
  );
};

export const ADefault: Story = {
  args: {
    children: <Ele />,
  },
};

export const DefaultMenu: StoryFn<typeof Menu> = (args) => (
  <Menu defaultIndex="0" {...args}>
    <MenuItem>cool link</MenuItem>
    <MenuItem>cool link 2</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
  </Menu>
);

export const DefaultSubMenu: StoryFn<typeof Menu> = (args) => (
  <Menu defaultIndex="0" {...args}>
    <MenuItem>cool link</MenuItem>
    <MenuItem>cool link 2</MenuItem>
    <SubMenu title="cool link 3">
      <MenuItem>cool link 4</MenuItem>
      <MenuItem>cool link 5</MenuItem>
    </SubMenu>
    <MenuItem disabled>disabled</MenuItem>
  </Menu>
);
