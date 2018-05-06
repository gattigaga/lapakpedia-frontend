import React from "react";
import { storiesOf } from "@storybook/react";

import Avatar from "components/Avatar";

storiesOf("Avatar", module)
  .add("default", () => (
    <Avatar src={require("assets/images/dummy240x240.png")} alt="Buyer" />
  ))
  .add("with custom size", () => (
    <Avatar
      src={require("assets/images/dummy240x240.png")}
      alt="Buyer"
      size={96}
    />
  ));
