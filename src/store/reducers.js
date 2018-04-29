import { SET_ACCESS_TOKEN, SET_USER_SESSION } from "./actions";

export const accessToken = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ACCESS_TOKEN:
      return payload;

    default:
      return state;
  }
};

export const userSession = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_SESSION:
      return payload;

    default:
      return state;
  }
};
