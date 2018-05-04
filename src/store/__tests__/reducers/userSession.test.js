import { setUserSession } from "store/actionCreators";
import { userSession } from "store/reducers";

describe("userSession", () => {
  it("should return initial state", () => {
    const initial = null;

    expect(userSession(initial, {})).toEqual(initial);
  });

  it("should return user session", () => {
    const user = {
      name: "Gattigaga Hayyuta",
      username: "developer",
      password: "developer"
    };

    const action = setUserSession(user);

    expect(userSession(null, action)).toEqual(user);
  });
});
