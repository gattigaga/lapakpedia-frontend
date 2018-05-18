import React from "react";
import { storiesOf, action } from "@storybook/react";
import styled from "styled-components";

import InputBox from "components/InputBox";

const onChange = action("changed");

const Container = styled.div`
  width: 240px;
`;

storiesOf("InputBox", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("default (type text)", () => (
    <InputBox onChange={onChange} placeholder="Username" value="username99" />
  ))
  .add("with type password", () => (
    <InputBox
      type="password"
      onChange={onChange}
      placeholder="Password"
      value="secret"
    />
  ))
  .add("in disabled state", () => (
    <InputBox
      onChange={onChange}
      placeholder="Username"
      value="it's disabled"
      helperText="it should contains alphanumeric and symbol"
      isDisabled
    />
  ))
  .add("in error state", () => (
    <InputBox
      onChange={onChange}
      placeholder="Username"
      value="it's error"
      helperText="it should contains alphanumeric and symbol"
      isError
    />
  ))
  .add("with helper text", () => (
    <InputBox
      onChange={onChange}
      placeholder="Username"
      value="it's helper text"
      helperText="it should contains alphanumeric and symbol"
    />
  ));
