import React from "react";
import { storiesOf, action } from "@storybook/react";

import Counter from "components/Counter";

const onChange = action("changed");
const onClickPlus = action("plus clicked");
const onClickMinus = action("minus clicked");

storiesOf("Counter", module)
  .add("default", () => (
    <Counter
      onChange={onChange}
      onClickPlus={onClickPlus}
      onClickMinus={onClickMinus}
    />
  ))
  .add("with custom value", () => (
    <Counter
      onChange={onChange}
      onClickPlus={onClickPlus}
      onClickMinus={onClickMinus}
      value={10}
    />
  ));
