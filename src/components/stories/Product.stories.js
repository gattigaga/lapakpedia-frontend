import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import { MemoryRouter } from "react-router-dom";

import Product from "components/Product";

const Container = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1;
  padding: 0px 32px;
  box-sizing: border-box;
`;

storiesOf("Product", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>
      <Container>
        <Column>{story()}</Column>
        <Column />
        <Column />
        <Column />
      </Container>
    </MemoryRouter>
  ))
  .add("default", () => (
    <Product
      image={require("assets/images/dummy240x240.png")}
      name="MacBook Pro 2018"
      category="Technology"
      price={2800}
      href="https://github.com"
      rating={4}
      totalReviews={4}
    />
  ))
  .add("in no stock state", () => (
    <Product
      image={require("assets/images/dummy240x240.png")}
      name="MacBook Pro 2018"
      category="Technology"
      price={2800}
      href="https://github.com"
      rating={4}
      totalReviews={4}
      isNoStock
    />
  ));
