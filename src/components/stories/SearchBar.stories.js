import React from "react";
import { storiesOf, action } from "@storybook/react";

import SearchBar from "components/SearchBar";

const onChange = action("changed");
const onPressEnter = action("keypressed");

storiesOf("SearchBar", module)
  .add("default", () => (
    <SearchBar onChange={onChange} onPressEnter={onPressEnter} />
  ))
  .add("with keyword", () => (
    <SearchBar
      keyword="MacBook Pro 2018"
      onChange={onChange}
      onPressEnter={onPressEnter}
    />
  ));
