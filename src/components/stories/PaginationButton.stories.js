import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import PaginationButton from "components/PaginationButton";

storiesOf("PaginationButton", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default (in next)", () => <PaginationButton />)
  .add("in previous", () => <PaginationButton type="prev" />)
  .add("in disable mode", () => <PaginationButton isDisabled />);
