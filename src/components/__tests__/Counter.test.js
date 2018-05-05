import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Counter, { Input, Button } from "components/Counter";

describe("Counter", () => {
  const setup = propOverrides => {
    const props = {
      ...propOverrides
    };

    const wrapper = shallow(<Counter {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders with custom value", () => {
    const { wrapper } = setup({ value: 10 });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders with max value", () => {
    const { wrapper } = setup({ value: 25, maximum: 25 });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should calls 'onClickPlus' callback while plus button clicked", () => {
    const onClickPlus = jest.fn();
    const { wrapper } = setup({ onClickPlus });

    wrapper
      .find(Button)
      .at(1)
      .simulate("click");

    expect(onClickPlus).toBeCalled();
  });

  it("should calls 'onClickMinus' callback while minus button clicked", () => {
    const onClickMinus = jest.fn();
    const { wrapper } = setup({ onClickMinus });

    wrapper
      .find(Button)
      .at(0)
      .simulate("click");

    expect(onClickMinus).toBeCalled();
  });

  it("should calls 'onChange' callback while input box value was changed", () => {
    const onChange = jest.fn();
    const { wrapper } = setup({ onChange });
    const event = {
      target: {
        value: 99
      }
    };

    wrapper.find(Input).simulate("change", event);

    expect(onChange).toBeCalledWith(event);
  });
});
