import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import SideMenu from "components/SideMenu";

describe("SideMenu", () => {
  const setup = propOverrides => {
    const props = {
      items: [
        {
          label: "Home",
          url: "/home"
        },
        {
          label: "About",
          url: "/about"
        }
      ],
      ...propOverrides
    };

    const wrapper = shallow(<SideMenu {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
