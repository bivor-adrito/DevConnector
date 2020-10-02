import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from '../actions/types';

const inittialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = inittialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAutheticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
      case AUTH_ERROR:

      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: true,
        loading: false,
      };

    default:
      return state;
  }
}