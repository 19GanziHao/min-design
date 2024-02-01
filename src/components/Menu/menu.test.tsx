/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Menu, { IMenuProps } from "./menu";
import MenuItem from "./menuItem";

const testProps: IMenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: IMenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const generateMenu = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index="0">active</MenuItem>
      <MenuItem index="1" disabled>
        disabled
      </MenuItem>
      <MenuItem index="2">xyz</MenuItem>
    </Menu>
  );
};

const initialization = () => {
  const { container } = render(generateMenu(testProps));

  return {
    container,
  };
};

describe("test Menu and MenuItem component", () => {
  // 每个测试用例执行前都要执行的钩子函数
  beforeEach(() => {});

  test("Menu和MenuItem的默认props", () => {
    const { container } = initialization();

    const menuEle = container.querySelector("ul");
    const activeEle = screen.getByText("active");
    const disabledEle = screen.getByText("disabled");

    expect(menuEle).toBeInTheDocument();
    expect(menuEle).toHaveClass("min-menu test");
    expect(menuEle?.querySelectorAll("li").length).toEqual(3);
    expect(activeEle).toHaveClass("menu-item is-active");
    expect(disabledEle).toHaveClass("menu-item is-disabled");
  });

  test("点击改变active", () => {
    const { container } = initialization();
    const thirdItem = screen.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
  });

  test("mode设置为vertical", () => {});
});
