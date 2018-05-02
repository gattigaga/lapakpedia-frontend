import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Logo from "components/Logo";

describe("Logo", () => {
  const setup = propOverrides => {
    const props = {
      ...propOverrides
    };

    const wrapper = shallow(<Logo {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders with custom font size", () => {
    const { wrapper } = setup({ fontSize: 48 });

    expect(wrapper.props().fontSize).toEqual(48);
  });
});
