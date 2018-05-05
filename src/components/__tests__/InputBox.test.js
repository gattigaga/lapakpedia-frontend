import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import InputBox, { Input } from "components/InputBox";

describe("InputBox", () => {
  const setup = propOverrides => {
    const props = {
      ...propOverrides
    };

    const wrapper = shallow(<InputBox {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders with helper text", () => {
    const { wrapper } = setup({ helperText: "It's my helper text" });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders with custom placeholder", () => {
    const { wrapper } = setup({ placeholder: "Username" });

    expect(wrapper.find(Input).props().placeholder).toEqual("Username");
  });

  it("should renders with type 'password'", () => {
    const { wrapper } = setup({ type: "password" });

    expect(wrapper.find(Input).props().type).toEqual("password");
  });

  it("should renders in error state", () => {
    const { wrapper } = setup({
      isError: true,
      helperText: "It's my helper text"
    });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders ", () => {
    const { wrapper } = setup({ isDisabled: true });

    expect(wrapper.find(Input).props().disabled).toEqual(true);
  });
});
