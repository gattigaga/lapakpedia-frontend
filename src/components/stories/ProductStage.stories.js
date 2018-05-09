import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import uuid from "uuid/v4";

import ProductStage from "components/ProductStage";

const product = {
  _id: uuid(),
  image: require("assets/images/dummy240x240.png"),
  name: "MacBook Pro",
  category: "Technology",
  price: 2800,
  href: "#",
  rating: 4,
  totalReviews: 4
};

const products = [...Array(4)].map(() => product);

storiesOf("ProductStage", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <ProductStage
      label="New Arrival"
      link="http://lapakpedia.com/products"
      products={products}
    />
  ));
