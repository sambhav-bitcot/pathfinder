"use server";
// import { ChangePasswordType } from "@/types/profile";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import {
  CHANGE_PASSWORD_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  GET_PRESIGNED_URL_MUTATION,
  REFRESH_TOKEN_MUTATION,
  GET_USER_TOKEN,
  RESET_PASSWORD_MUTATION,
  SIGN_IN_MUTATION,
  SIGN_UP_MUTATION,
  UPDATE_USER_MUTATION,
} from "./query";
import { TokenResponse, UpdateUserType } from "@/utils/types/user";
// import { RefreshTokenRes } from "@/types/authType";
import {
  SignInInput,
  SignInResponse,
  SignUpRespose,
  SignupFormType,
} from "@/utils/types/auth-type";

export const signInAction = async ({
  variables,
}: {
  variables: { input: SignInInput };
}): Promise<SignInResponse> => {
  const res = await fetchGraphQLMutation<SignInResponse>(
    SIGN_IN_MUTATION,
    variables
  );
  
  return res as SignInResponse;
};


export const signUpAction = async (variables: {
  input: SignupFormType;
}): Promise<SignUpRespose> => {
  const res = await fetchGraphQLMutation<SignUpRespose>(
    SIGN_UP_MUTATION,
    variables
  );
  return res as SignUpRespose;
};

export const changePasswordAction = async (
  form:any
): Promise<any> => {
  const variables = {
    input: { ...form },
  };
  const res: any = await fetchGraphQLMutation<any>(
    CHANGE_PASSWORD_MUTATION,
    variables
  );
  return res;
};
export const forgotPasswordAction = async ({
  variables,
}: {
  variables: { username: string };
}): Promise<any> => {
  const res: any = await fetchGraphQLMutation<any>(
    FORGOT_PASSWORD_MUTATION,
    variables
  );
  return res;
};
export const resetPasswordAction = async ({
  variables,
}: {
  variables: { code: string; newPassword: string; username: string };
}): Promise<any> => {
  const res: any = await fetchGraphQLMutation<any>(
    RESET_PASSWORD_MUTATION,
    variables
  );
  return res;
};

export const getPresignedUrlAction = async (
  selectedFile: File
): Promise<any> => {
  // Extract extension from file name reliably (e.g., 'xyz.docx' gets '.docx')
  const extension =
    selectedFile.name.lastIndexOf(".") !== -1
      ? selectedFile.name.substring(selectedFile.name.lastIndexOf("."))
      : "";
  const variables = {
    input: { extensions: [extension] },
  };
  const res: any = await fetchGraphQLMutation<any>(
    GET_PRESIGNED_URL_MUTATION,
    variables
  );
  debugger;
  return res;
};

export const updateUserAction = async (
  form: UpdateUserType,
  selectedFilePath?: string,
  profile?: any
): Promise<any> => {
  const { updateUserId, first_name, last_name, phone } = form;
  console.log("check");

  console.log(form, selectedFilePath, profile);

  const updateUserInput: Record<string, any> = {
    first_name,
    last_name,
    phone,
    ...(selectedFilePath && { file_path: selectedFilePath }),
    ...(profile && { profile: { ...profile } }),
  };
  const variables = {
    updateUserId,
    updateUserInput,
  };
  const res: any = await fetchGraphQLMutation<any>(
    UPDATE_USER_MUTATION,
    variables
  );
  return res;
};

export const refreshToken = async (
  refreshToken: string
): Promise<any> => {
  const variables = { refreshToken };
  const res = await fetchGraphQLMutation<any>(
    REFRESH_TOKEN_MUTATION,
    variables
  );
  return res;
};

export const getUpdatedTokenAction = async () => {
  try {
    const res = await fetchGraphQLQuery<TokenResponse>(GET_USER_TOKEN);
    return res?.gettoken?.tokenBalance as number;
  } catch {
    return false;
  }
};
