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

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders with custom type, caption and outline mode", () => {
    const { wrapper } = setup({
      type: "submit",
      caption: "Login",
      isOutlined: true
    });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should call 'onClick' callback while clicked", () => {
    const onClick = jest.fn();
    const { wrapper } = setup({ onClick });

    wrapper.simulate("click");

    expect(onClick).toBeCalled();
  });
});
