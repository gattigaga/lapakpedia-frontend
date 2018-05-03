import React from "react";
import { storiesOf, action } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import Button from "components/Button";

const onClick = action("clicked");

storiesOf("Button", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => <Button onClick={onClick} />)
  .add("with custom caption", () => (
    <Button caption="Login" onClick={onClick} />
  ))
  .add("with outline", () => <Button onClick={onClick} isOutlined />)
  .add("with link", () => <Button href="https://github.com" />);
