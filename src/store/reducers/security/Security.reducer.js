const defaultSecurity = {
  jwToken: "",
  user: {
    _id: "",
    email: "",
    tipo: "",
  },
  errors: [],
};

export const SecurityReducer = (state = defaultSecurity, action) => {
  const { type, payload } = action || {};
  switch (type) {
    case "ON_LOGIN_LOADING":
      break;
    case "ON_LOGIN_SUCCESS":
      break;
    case "ON_LOGIN_ERROR":
      break;
    default:
      return state;
  }
};
