import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import CartItem, { CloseButton } from "components/CartItem";

describe("CartItem", () => {
  jest.mock("../Counter", () => "Counter");

  const setup = propOverrides => {
    const props = {
      ...propOverrides,
      value: 10,
      maximum: 15,
      image: require("assets/images/dummy240x240.png"),
      name: "MacBook Pro 2018",
      price: 2800,
      onClickClose: jest.fn(),
      onClickMinus: jest.fn(),
      onClickPlus: jest.fn(),
      onChange: jest.fn()
    };

    const wrapper = shallow(<CartItem {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should call 'onClickClose' callback while close button clicked", () => {
    const { wrapper, props } = setup();

    wrapper.find(CloseButton).simulate("click");

    expect(props.onClickClose).toBeCalled();
  });
});
