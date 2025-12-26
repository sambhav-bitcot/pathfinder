"use client";
import { AppDispatch } from "../store";
import * as authReducer from "../reducers/authReducer";
import * as chatReducer from "../reducers/chatReducer";
import {
  getUpdatedTokenAction,
  signInAction,
  signUpAction,
  updateUserAction,
} from "@/utils/graphql/auth/action";
// import { TokenResponse } from "@/lib/types";
import { SignInInput, SignupFormType } from "@/utils/types/auth-type";
import { UpdateUserType } from "@/utils/types/user";

export const login = (form: SignInInput) => async (dispatch: AppDispatch) => {
  try {
    const res = await signInAction({ variables: { input: form } });
    console.log(res);

    console.log(res, "resssss");
    if (res?.signIn?.success) {
      const { accessToken, refreshToken, user, token } = res.signIn;
      dispatch(
        authReducer.login({
          access_token: accessToken,
          refresh_token: refreshToken,
          token: token,
          user: { ...user, role: user?.role?.toLowerCase() },
        })
      );
    }
    return {
      message: res.signIn.message,
      success: true,
      data: { user: res.signIn.user },
    };
  } catch (err: any) {
    return {
      message: err.message as string,
      success: false,
    };
  }
};

export const signUp = async (userData: SignupFormType) => {
  try {
    console.log(userData);

    const res = await signUpAction({ input: userData });
    console.log(res);
    if (res?.signUp) {
      return {
        message: res.signUp.message,
        success: res.signUp.success,
      };
    } else {
      return {
        message: res.message,
        success: res.success,
      };
    }
  } catch (err: any) {
    return {
      message: err.message as string,
      success: false,
    };
  }
};

export const appLogout = async (dispatch: AppDispatch) => {
  dispatch(authReducer.logout());
  dispatch(chatReducer.clearAll());
};

// export const forgotPassword = (formData: any) => async (dispatch: AppDispatch) => {
//   try {
//     const res = await forgetPd({ variables: { input: formData } });
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const updateUser =
  (form: UpdateUserType, selectedFilePath?: string, profile?: any) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await updateUserAction(form, selectedFilePath, profile);
      console.log(res);

      if (res?.updateUser?.success) {
        dispatch(authReducer.updateUser({ user: { ...res.updateUser.user } }));

        return {
          message: res.updateUser.message,
          success: res.updateUser.success,
        };
      }

      return {
        message: res.updateUser?.message,
        success: res.updateUser?.success,
      };
    } catch (err: any) {
      console.log(err);
      return {
        message: err?.message as string,
        success: false,
      };
    }
  };

export const getTokenAction = () => async (dispatch: AppDispatch) => {
  const res = await getUpdatedTokenAction();
  if (typeof res === "number") {
    dispatch(authReducer.updateToken(res));
  }
};
