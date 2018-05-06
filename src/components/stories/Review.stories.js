import React from "react";
import { storiesOf } from "@storybook/react";

import Review from "components/Review";

storiesOf("Review", module).add("default", () => (
  <Review
    rating={4}
    text="Product is so good"
    time="2018-05-06T15:00:14.376Z"
    reviewer="markzuckerberg"
    avatar={require("assets/images/dummy240x240.png")}
  />
));
