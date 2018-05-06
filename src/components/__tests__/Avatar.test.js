import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Avatar from "components/Avatar";

describe("Avatar", () => {
  const setup = propOverrides => {
    const props = {
      src: require("assets/images/dummy240x240.png"),
      ...propOverrides
    };

    const wrapper = shallow(<Avatar {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders with custom size", () => {
    const { wrapper } = setup({ size: 96 });

    expect(wrapper.props().size).toEqual(96);
  });
});
