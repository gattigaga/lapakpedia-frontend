import { SET_ACCESS_TOKEN, SET_USER_SESSION } from "./actions";

/**
 * Set user access token
 *
 * @param {string} token - User access token
 */
export const setAccessToken = token => ({
  type: SET_ACCESS_TOKEN,
  payload: token
});

/**
 * Set user session
 *
 * @param {object} user - User data
 */
export const setUserSession = user => ({
  type: SET_USER_SESSION,
  payload: user
});
