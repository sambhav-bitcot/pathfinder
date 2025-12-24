"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "@/utils/graphql";
import { GET_USERS_QUERY } from "@/utils/graphql/users/query";
import { UsersResponse, UsersFilter } from "@/types/users";
import { UPDATE_USER_MUTATION } from "./query";
import { GET_USER_QUERY } from "./query";
import { UpdateUserType } from "@/types/profile";
import { User } from "@/types/users";

export const getUsersAction = async (
  filter?: UsersFilter
): Promise<UsersResponse> => {
  const variables = filter || {};
  const res = await fetchGraphQLQuery<UsersResponse>(
    GET_USERS_QUERY,
    variables as Record<string, unknown>
  );
  return res as UsersResponse;
};

export const updateUserAction = async (form: UpdateUserType, selectedFilePath?: string): Promise<any> => {
  const { updateUserId, first_name, last_name, phone } = form;
  const updateUserInput: Record<string, any> = {
    first_name,
    last_name,
    phone,
    ...(selectedFilePath && { file_path: selectedFilePath }),
  };
  const variables = {
    updateUserId,
    updateUserInput,
  };
  const res: any = await fetchGraphQLMutation(
    UPDATE_USER_MUTATION,
    variables
  );
  return res;
};

export const getUserAction = async (userId: string): Promise<User | null> => {
  const variables = { userId };
  const res: any = await fetchGraphQLQuery<{ user: User }>(GET_USER_QUERY, variables);
  return res && res.user ? res.user : null;
};

export const updateUserStatus = async (input: any): Promise<any> => {
  const res: any = await fetchGraphQLMutation(
    UPDATE_USER_MUTATION,
    input
  );
  return res;
};


