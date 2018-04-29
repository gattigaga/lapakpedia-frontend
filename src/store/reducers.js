import { SET_ACCESS_TOKEN } from "./actions";

export const accessToken = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ACCESS_TOKEN:
      return payload;

    default:
      return state;
  }
};
