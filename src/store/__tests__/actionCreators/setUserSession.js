import { setUserSession } from "store/actionCreators";
import { SET_USER_SESSION } from "store/actions";

test("should return expected action", () => {
  const user = {
    name: "Gattigaga Hayyuta Dewa",
    username: "developer",
    password: "developer"
  };

  const expected = {
    type: SET_USER_SESSION,
    payload: user
  };

  expect(setUserSession(user)).toEqual(expected);
});
