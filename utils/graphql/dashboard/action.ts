"use server";
import { fetchGraphQLQuery } from "@/utils/graphql";
import { GET_ADMIN_DASHBOARD_QUERY, GET_EDUCATOR_DASHBOARD_QUERY, GET_RECENT_TRANSACTIONS_QUERY, GET_STUDENT_DASHBOARD_QUERY } from "./query";
import { AdminDashboardResponse, EducatorDashboardResponse, RecentTransactionsResponse, StudentDashboardResponse } from "@/types/dashboard";


export const getStudentDashboardAction = async (variables:any ): Promise<any> => {
  const res = await fetchGraphQLQuery<StudentDashboardResponse>(
    GET_STUDENT_DASHBOARD_QUERY,
    variables
  );
  return res;
};

export const getEducatorDashboardAction = async (variables:any ): Promise<any> => {
  const res = await fetchGraphQLQuery<EducatorDashboardResponse>(
    GET_EDUCATOR_DASHBOARD_QUERY,
    variables
  );
  return res;
};

export const getAdminDashboardAction = async (): Promise<AdminDashboardResponse> => {
  const res = await fetchGraphQLQuery<AdminDashboardResponse>(
    GET_ADMIN_DASHBOARD_QUERY
  );
  return res as AdminDashboardResponse;
};


export const getRecentTransactionAction = async (): Promise<RecentTransactionsResponse> => {
  const res = await fetchGraphQLQuery<RecentTransactionsResponse>(
    GET_RECENT_TRANSACTIONS_QUERY
  );
  return res as RecentTransactionsResponse;
};




