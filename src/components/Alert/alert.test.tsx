/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
// import { config } from "react-transition-group";
import { render, fireEvent, screen } from "@testing-library/react";

import Alert, { IAlertProps } from "./alert";
// config.disabled = true;

// jest.mock("../Icon/icon", () => {
//   return (props: any) => {
//     return <span>{props.icon}</span>;
//   };
// });

const testProps: IAlertProps = {
  title: "title",
  onClose: jest.fn(),
};

const typeProps: IAlertProps = {
  ...testProps,
  type: "success",
  description: "hello",
  closable: false,
};
describe("test Alert Component", () => {
  it("should render the correct default Alert", () => {
    const { container } = render(<Alert {...testProps} />);
    const el = container.querySelector(".min-alert");

    expect(el).toBeInTheDocument();

    expect(el).toHaveClass("min-alert min-alert-default");
    //fireEvent.click(getByText("times"));
    //expect(testProps.onClose).toHaveBeenCalled();
    //expect(el).not.toBeInTheDocument();
  });
  it("should render the correct Alert based on different type and description", () => {
    render(<Alert {...typeProps} />);
    const el = screen.getByText("title");

    //expect(el).toHaveClass("bold-title");
    //expect(el).toHaveClass("min-alert-success bold-title");
    //expect(queryByText("hello")).toBeInTheDocument();
    //expect(queryByText("times")).not.toBeInTheDocument();
  });
});
