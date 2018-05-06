import React from "react";
import { storiesOf, action } from "@storybook/react";

import Rating from "components/Rating";

const onClick = action("clicked");

storiesOf("Rating", module)
  .add("default", () => <Rating onClick={onClick} value={3} />)
  .add("in disable state", () => <Rating value={2} isDisabled />);
