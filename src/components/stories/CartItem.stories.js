import React from "react";
import { storiesOf, action } from "@storybook/react";
import styled from "styled-components";

import CartItem from "components/CartItem";

const onClickClose = action("close clicked");
const onClickMinus = action("minus clicked");
const onClickPlus = action("plus clicked");
const onChange = action("changed");

const Container = styled.div`
  width: 640px;
`;

storiesOf("CartItem", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("default", () => (
    <CartItem
      onClickClose={onClickClose}
      onClickMinus={onClickMinus}
      onClickPlus={onClickPlus}
      onChange={onChange}
      value={10}
      maximum={15}
      image={require("assets/images/dummy240x240.png")}
      name="MacBook Pro 2018"
      price={2800}
    />
  ));
