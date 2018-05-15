import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import SideMenu from "components/SideMenu";

const items = [
  {
    label: "Home",
    url: "/"
  },
  {
    label: "Products",
    url: "/products"
  },
  {
    label: "Carts",
    url: "/carts"
  },
  {
    label: "About",
    url: "/about"
  }
];

storiesOf("SideMenu", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => <SideMenu items={items} />);
