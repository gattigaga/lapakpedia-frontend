import { toCurrency, cutText } from "helpers/formatter";

describe("toCurrency()", () => {
  it("should returns formatted default value", () => {
    const result = toCurrency();
    const expected = "0";

    expect(result).toEqual(expected);
  });

  it("should returns formatted number into currency", () => {
    const result = toCurrency(1000000);
    const expected = "1,000,000";

    expect(result).toEqual(expected);
  });
});

describe("cutText()", () => {
  it("should returns cutted text", () => {
    const result = cutText(3, "[PRE-OWNED] MacBook Pro 2018");
    const expected = "[PRE-OWNED] MacBook Pro...";

    expect(result).toEqual(expected);
  });
});
