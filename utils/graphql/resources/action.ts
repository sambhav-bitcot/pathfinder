"use server";
import { fetchGraphQLQuery, fetchGraphQLMutation } from "@/utils/graphql";
import { CREATE_RESOURCE_MUTATION, GET_ALL_RESOURCES_QUERY, REMOVE_RESOURCE_MUTATION } from "@/utils/graphql/resources/query";
import { GetAllResourcesResponse, PaginationType, CreateResourceInput, CreateResourceResponse } from "@/types/resources"

export const getAllResourcesAction = async (
  paginate: PaginationType
): Promise<GetAllResourcesResponse> => {
  const variables = {
    searchFilter: {...paginate},
  }
  const res = await fetchGraphQLQuery<GetAllResourcesResponse>(
    GET_ALL_RESOURCES_QUERY,
    variables
  );
  return res as GetAllResourcesResponse;
};

export const removeResourceAction = async (id: string): Promise<{ success: boolean; message?: string }> => {
  const variables = { id };
  const res = await fetchGraphQLMutation<{ RemoveResource: { success?: boolean; message?: string } }>(
    REMOVE_RESOURCE_MUTATION,
    variables
  );
  if (res && typeof res === 'object' && 'RemoveResource' in res) {
    const result = (res as { RemoveResource: { success?: boolean; message?: string } }).RemoveResource;
    return { success: Boolean(result?.success), message: result?.message };
  }
  // Error case from fetchGraphQLMutation
  const message = (res as { message?: string })?.message || 'Failed to remove resource';
  return { success: false, message };
};

export const createResourceAction = async (
  input: CreateResourceInput
): Promise<CreateResourceResponse> => {
  const variables = {
    createResourceInput: {
      title: input.title,
      description: input.description,
      resource_type: input.resource_type,
      file_url: input.file_url,
      file_type: input.file_type,
      active_status: input.active_status ?? true,
    },
  };

  const res = await fetchGraphQLMutation<CreateResourceResponse>(
    CREATE_RESOURCE_MUTATION,
    variables
  );

  return res as CreateResourceResponse;
};

