import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Button from "components/Button";

describe("Button", () => {
  const setup = propOverrides => {
    const props = {
      ...propOverrides
    };

    const wrapper = shallow(<Button {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders with link", () => {
    const { wrapper } = setup({ href: "https://github.com" });

    expect(wrapper.find("Link").props().to).toEqual("https://github.com");
  });

  it("should renders with custom type", () => {
    const { wrapper } = setup({ type: "submit" });

    expect(wrapper.props().type).toEqual("submit");
  });

  it("should renders with custom caption", () => {
    const { wrapper } = setup({ caption: "Login" });

    expect(wrapper.props().children).toEqual("Login");
  });

  it("should renders with outline", () => {
    const { wrapper } = setup({ isOutlined: true });

    expect(wrapper.props().isOutlined).toEqual(true);
  });

  it("should renders in full width", () => {
    const { wrapper } = setup({ isFullWidth: true });

    expect(wrapper.props().isFullWidth).toEqual(true);
  });

  it("should call 'onClick' callback while clicked", () => {
    const onClick = jest.fn();
    const { wrapper } = setup({ onClick });

    wrapper.simulate("click");

    expect(onClick).toBeCalled();
  });
});
