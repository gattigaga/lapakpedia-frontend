import React from "react";
import { storiesOf } from "@storybook/react";

import Logo from "components/Logo";

storiesOf("Logo", module)
  .add("default", () => <Logo />)
  .add("with custom font size", () => <Logo fontSize={48} />);
