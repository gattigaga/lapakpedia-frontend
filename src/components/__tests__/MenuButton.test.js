import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";

import MenuButton from "components/MenuButton";

describe("MenuButton", () => {
  const setup = propOverrides => {
    const props = {
      ...propOverrides
    };

    const wrapper = mount(<MenuButton {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should in open state", () => {
    const { wrapper } = setup({ isOpen: true });

    expect(wrapper.props().isOpen).toEqual(true);
  });

  it("should call 'onClick' callback while clicked", () => {
    const onClick = jest.fn();
    const { wrapper } = setup({ onClick });

    wrapper.simulate("click");

    expect(onClick).toBeCalled();
  });
});
