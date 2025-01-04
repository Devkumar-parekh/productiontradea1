import { typeArray } from "./type";

const initialState = {
  loginData: {},
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeArray.resetLoginData:
      return initialState;
    case typeArray.setLoginDataAction:
      console.log("action.payload", action.payload);
      // return { ...state, loginData: action.payload };
      if (action.payload?.key)
        return {
          ...state,
          loginData: {
            ...(state?.loginData || {}),
            [action.payload?.key]: action.payload?.obj,
          },
        };
      return state;
    //
    default:
      return state;
  }
};
