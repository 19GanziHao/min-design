import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./index";

const defaultProps = {
  onClick: jest.fn(),
};
const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("Button component", () => {
  test("默认渲染", () => {
    // 将Button渲染到真实dom上
    render(<Button {...defaultProps}>Nice</Button>);
    // 查看页面上有没有Nice这个文本 返回的是HTMLElement
    const element = screen.getByText("Nice") as HTMLButtonElement;
    // 断言在不在document中
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    // 是否包含类
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
    expect(element.disabled).toBeFalsy();
  });

  test("不同props进行渲染", () => {
    render(<Button {...testProps}>Nice</Button>);
    const element = screen.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-lg");
  });

  test("类型是Link并且有href时渲染", () => {
    render(
      <Button btnType="link" href="http://baidu.com">
        Link
      </Button>
    );
    const element = screen.getByText("Link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
  });

  test("disabled设置为true时渲染", () => {
    render(<Button {...disabledProps}>Nice</Button>);
    const element = screen.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
