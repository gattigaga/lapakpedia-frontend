import React from "react";
import { storiesOf, action } from "@storybook/react";

import MenuButton from "components/MenuButton";

const onClick = action("clicked");

storiesOf("MenuButton", module)
  .add("default", () => <MenuButton onClick={onClick} />)
  .add("open", () => <MenuButton onClick={onClick} isOpen />);
