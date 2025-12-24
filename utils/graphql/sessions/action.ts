"use server";
import { fetchGraphQLQuery, fetchGraphQLMutation } from "@/utils/graphql";
import { GET_EDUCATOR_SESSIONS_QUERY, CANCEL_SESSION_QUERY, GET_EDUCATORS_LIST_QUERY, GET_EDUCATOR_PROFILE_QUERY, GET_SLOTS_QUERY, CREATE_SESSION_MUTATION, GET_SESSION_NOTES_QUERY ,RESCHEDULE_SESSION_MUTATION, APPROVE_CANCEL_SESSION_BY_EDUCATOR   } from "@/utils/graphql/sessions/query";
import { GetMySessionsResponse, CancelSessionResponse, EducatorsListResponse, EducatorsPaginationType, GetEducatorProfileResponse, GetSlotsResponse, GetSlotInput, CreateSessionVariables, CreateSessionResponse, GetSessionNotesResponse, GetSessionNotesInput } from "@/types/sessions";

export const getSessionsAction = async (
  variables: { input: { limit: number, page: number, filter: string } }
): Promise<GetMySessionsResponse> => {
  const res = await fetchGraphQLQuery<GetMySessionsResponse>(
    GET_EDUCATOR_SESSIONS_QUERY,
    variables as unknown as Record<string, unknown>
  );
  return res as GetMySessionsResponse;
};


export const cancelSessionAction = async (
  variables: { input: { cancelAfter10minutes: boolean, id: string } }
): Promise<{ success: boolean; message?: string }> => {
  const res = await fetchGraphQLQuery<CancelSessionResponse>(
    CANCEL_SESSION_QUERY,
    variables
  );
  const result = (res as CancelSessionResponse)?.cancelSession;
  return { success: Boolean(result?.success), message: result?.message };
};

export const getEducatorsListAction = async (
  paginate: EducatorsPaginationType
): Promise<EducatorsListResponse> => {
  const variables = {
    filter: {
      limit: paginate.limit,
      page: paginate.page,
      search: paginate.search
    },
  };
  const res = await fetchGraphQLQuery<EducatorsListResponse>(
    GET_EDUCATORS_LIST_QUERY,
    variables
  );
  return res as EducatorsListResponse;
};

export const getEducatorProfileAction = async (
  userId: string
): Promise<GetEducatorProfileResponse> => {
  const variables = { userId };
  const res = await fetchGraphQLQuery<GetEducatorProfileResponse>(
    GET_EDUCATOR_PROFILE_QUERY,
    variables
  );
  return res as GetEducatorProfileResponse;
};

export const getSlotsAction = async (
  variables: GetSlotInput
): Promise<GetSlotsResponse> => {
  const res = await fetchGraphQLQuery<GetSlotsResponse>(GET_SLOTS_QUERY, variables as Record<string, unknown>);
  return res as GetSlotsResponse;
};

export const createSessionAction = async (
  variables: CreateSessionVariables
): Promise<CreateSessionResponse> => {
  const res = await fetchGraphQLMutation<CreateSessionResponse>(
    CREATE_SESSION_MUTATION,
    variables as unknown as Record<string, unknown>
  );
  return res as CreateSessionResponse;
};

export const rescheduleSession = async (
  variables: any
): Promise<CreateSessionResponse> => {
  const res = await fetchGraphQLMutation<CreateSessionResponse>(
    RESCHEDULE_SESSION_MUTATION,
    variables as unknown as Record<string, unknown>
  );
  return res as CreateSessionResponse;
};
export const getSessionNotesAction = async (
  input: GetSessionNotesInput
): Promise<GetSessionNotesResponse> => {
  const variables = {
    sessionId: input.sessionId,
  };
  const res = await fetchGraphQLQuery<GetSessionNotesResponse>(
    GET_SESSION_NOTES_QUERY,
    variables
  );
  return res as GetSessionNotesResponse;
};

export const approveOrCancelSessionAction = async (
  variables: { input: { id: string, status: string } }
): Promise<{ success: boolean; message?: string }> => {
  const res = await fetchGraphQLMutation<any>(
    APPROVE_CANCEL_SESSION_BY_EDUCATOR,
    variables
  );
  if(res?.approveOrCancelSession?.success){
    return { success: true, message: res?.approveOrCancelSession?.message };
  }
  return { success: false, message: typeof res === 'string' ? res : "Something went wrong " };
  
};  

