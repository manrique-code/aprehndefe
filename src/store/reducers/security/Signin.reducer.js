const defaultSignup = { tipo: "", isLoading: false, errors: [] };

export const signUpReducer = (state = defaultSignup, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ON_SIGNUP_TYPE":
      return { tipo: payload.tipo, isLoading: false };
    case "ON_SIGNUP_LOADING":
      return { ...state, isLoading: true };
    case "ON_SIGNUP_SUCCESS":
      break;
    case "ON_SIGNUP_ERROR":
      break;
    default:
      return state;
  }
};
