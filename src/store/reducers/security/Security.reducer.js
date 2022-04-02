import { setJWT } from "../../../lib/apiClient";
const defaultSecurity = {
  jwToken: "",
  user: {
    _id: "",
    email: "",
    tipo: "",
  },
  errors: [],
  isLoading: false,
};

export const SecurityReducer = (state = defaultSecurity, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ON_LOGIN_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "ON_LOGIN_SUCCESS":
      setJWT(payload.jwToken);
      return { ...state, ...payload, isLoading: false };
    case "ON_LOGIN_ERROR":
      return { ...state, errors: payload.errors, isLoading: false };
    default:
      return state;
  }
};
