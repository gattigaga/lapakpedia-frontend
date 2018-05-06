import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Rating, { StyledStar } from "components/Rating";

describe("Rating", () => {
  const setup = propOverrides => {
    const props = {
      onClick: jest.fn(),
      value: 3,
      ...propOverrides
    };

    const wrapper = shallow(<Rating {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders in disable state", () => {
    const { wrapper } = setup({ isDisabled: true });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should calls 'onClick' callback while a star clicked", () => {
    const { props, wrapper } = setup();
    const value = 4;

    wrapper
      .find(StyledStar)
      .at(value - 1)
      .simulate("click");

    expect(props.onClick).toBeCalledWith(value);
  });
});
