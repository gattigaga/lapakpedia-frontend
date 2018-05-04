import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import PaginationButton from "components/PaginationButton";

describe("PaginationButton", () => {
  const setup = propOverrides => {
    const props = {
      ...propOverrides
    };

    const wrapper = shallow(<PaginationButton {...props} />);

    return {
      props,
      wrapper
    };
  };

  it("should renders default", () => {
    const { wrapper } = setup();

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders in type 'prev'", () => {
    const { wrapper } = setup({ type: "prev" });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should renders as disabled", () => {
    const { wrapper } = setup({ isDisabled: true });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should render with link", () => {
    const { wrapper } = setup({ href: "https://github.com" });

    expect(wrapper.find("Link").props().to).toEqual("https://github.com");
  });
});
