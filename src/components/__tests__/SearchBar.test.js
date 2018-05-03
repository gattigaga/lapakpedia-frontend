import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import SearchBar from "components/SearchBar";

describe("SearchBar", () => {
  const setup = propOverrides => {
    const props = {
      ...propOverrides
    };

    const wrapper = shallow(<SearchBar {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should call 'onChange' callback while changed", () => {
    const onChange = jest.fn();
    const { wrapper } = setup({ onChange });
    const event = {
      target: {
        value: "MacBook Pro"
      }
    };

    wrapper.simulate("change", event);

    expect(onChange).toBeCalledWith(event);
  });

  it("should call 'onPressEnter' callback while Enter key has been pressed", () => {
    const onPressEnter = jest.fn();
    const { wrapper } = setup({ onPressEnter });
    const event = {
      key: "Enter"
    };

    wrapper.simulate("keypress", event);

    expect(onPressEnter).toBeCalled();
  });
});
