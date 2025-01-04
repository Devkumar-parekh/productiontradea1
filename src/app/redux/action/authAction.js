import { typeArray } from "../reducer/type";

export const setLoginDataAction = (payload) => {
  console.log("setLoginDataAction", typeArray.setLoginDataAction);
  return {
    type: typeArray.setLoginDataAction,
    payload,
  };
};
export const resetLoginData = (payload) => {
  console.log("resetLoginData");
  return {
    type: typeArray.setLoginDataAction,
    payload,
  };
};
