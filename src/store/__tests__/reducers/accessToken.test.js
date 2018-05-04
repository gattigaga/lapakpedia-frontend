import { setAccessToken } from "store/actionCreators";
import { accessToken } from "store/reducers";

describe("accessToken", () => {
  it("should return initial state", () => {
    const initial = null;

    expect(accessToken(initial, {})).toEqual(initial);
  });

  it("should return access token", () => {
    const token = "this.is.my.token";
    const action = setAccessToken(token);

    expect(accessToken(null, action)).toEqual(token);
  });
});
