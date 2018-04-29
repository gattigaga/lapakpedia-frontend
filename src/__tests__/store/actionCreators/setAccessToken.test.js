import { setAccessToken } from "store/actionCreators";
import { SET_ACCESS_TOKEN } from "store/actions";

test("should return expected action", () => {
  const token = "this.is.my.token";
  const expected = {
    type: SET_ACCESS_TOKEN,
    payload: token
  };

  expect(setAccessToken(token)).toEqual(expected);
});
