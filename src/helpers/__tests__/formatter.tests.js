import { toCurrency } from "helpers/formatter";

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
