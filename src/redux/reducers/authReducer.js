const initialState = {
  signUpData: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        signUpData: action.payload,
      };
    default:
      return state;
  }
}
