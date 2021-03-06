import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Product from "components/Product";

describe("Product", () => {
  jest.mock("../Rating", () => "Rating");

  const setup = propOverrides => {
    const props = {
      name: "MacBook Pro",
      category: "Technology",
      price: 2800,
      href: "https://github.com",
      rating: 4,
      totalReviews: 4,
      ...propOverrides
    };

    const wrapper = shallow(<Product {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders in no stock state", () => {
    const { wrapper } = setup({ isNoStock: true });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
