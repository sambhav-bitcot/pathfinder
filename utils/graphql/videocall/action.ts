import { AddNoteResponse, SingleErrorResponse, SuccessResponse } from "@/lib/types";
import { fetchGraphQLQuery } from "..";
import { COMPLETE_SESSION, GET_SESSION_BY_ID, GET_SESSION_BY_ID_FOR_STUDENT, SESSION_NOTES } from "./query";

export const getSessionByIdAction = async (sessionId: string): Promise<any> => {
  const variables = {
    getSessionDetailsBySessionIdId: sessionId,
  };
  const res = await fetchGraphQLQuery<any>(GET_SESSION_BY_ID, variables);
  return res;
};

export const getSessionDetail = async (sessionId: string): Promise<any> => {
  const variables = {
    getSessionByIdForStudentId: sessionId,
  };
  const res = await fetchGraphQLQuery<any>(GET_SESSION_BY_ID_FOR_STUDENT, variables);
  return res;
};

export const endSessionAction = async (sessionId: string): Promise<SingleErrorResponse | SuccessResponse > => {
  const variables = { sessionId };
  const res = await fetchGraphQLQuery<SuccessResponse | SingleErrorResponse>(COMPLETE_SESSION, variables);
  return res;
};

export const sessionNotesAction = async (variables: any): Promise<AddNoteResponse > => {
  const res = await fetchGraphQLQuery<AddNoteResponse>(SESSION_NOTES, variables);
  return res as AddNoteResponse;
};
