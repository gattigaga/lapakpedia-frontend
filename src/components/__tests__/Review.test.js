import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Review from "components/Review";

describe("Review", () => {
  jest.mock("../Avatar", () => "Avatar");
  jest.mock("../Rating", () => "Rating");

  const setup = propOverrides => {
    const props = {
      rating: 4,
      time: "2018-05-06T15:00:14.376Z",
      text: "I love this product",
      reviewer: "markzuckerberg",
      avatar: require("assets/images/dummy240x240.png"),
      ...propOverrides
    };

    const wrapper = shallow(<Review {...props} />);

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
