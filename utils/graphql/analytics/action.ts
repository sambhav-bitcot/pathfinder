"use server";
import { AnalyticsResponse } from "@/lib/types";
import { fetchGraphQLQuery } from "..";
import { ADMIN_ANYLYTICS_QUERY } from "../analytics/query";

export const analyticsAction = async (): Promise<AnalyticsResponse> => {
  const res = await fetchGraphQLQuery<AnalyticsResponse>(ADMIN_ANYLYTICS_QUERY);
  return res as AnalyticsResponse; ;
};
