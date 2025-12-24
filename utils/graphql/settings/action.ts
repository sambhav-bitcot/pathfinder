"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "@/utils/graphql";
import { ADMIN_SETTINGS_MUTATION, ADMIN_SETTINGS_QUERY } from "./query";


export const updateAdminSettings = async (
  variables: any
): Promise<any> => {
  const res = await fetchGraphQLMutation<any>(
    ADMIN_SETTINGS_MUTATION,
    variables as unknown as Record<string, unknown>
  );
  return res;
};


export const getAdminSettings = async (
): Promise<any> => {
  const res = await fetchGraphQLMutation<any>(
    ADMIN_SETTINGS_QUERY,
  );
  return res;
};