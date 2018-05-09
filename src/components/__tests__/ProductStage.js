import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import ProductStage from "components/ProductStage";

describe("ProductStage", () => {
  jest.mock("components/Product", () => "Product");

  const setup = propOverrides => {
    const product = {
      _id: "72d4dc1b-2238-4550-b3fa-0d589fa1047f",
      image: require("assets/images/dummy240x240.png"),
      name: "MacBook Pro",
      category: "Technology",
      price: 2800,
      href: "#",
      rating: 4,
      totalReviews: 4
    };

    const props = {
      link: "https://lapakpedia.com/products",
      label: "New Arrival",
      products: [...Array(4)].map(() => product),
      ...propOverrides
    };

    const wrapper = shallow(<ProductStage {...props} />);

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
