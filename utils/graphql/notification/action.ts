import { GET_MY_NOTIFICATIONS_QUERY } from "./query";
import type { GetNotificationsResponse } from "@/types/notification";
import { fetchGraphQLQuery } from "@/utils/graphql";

export async function getMyNotifications(input: { limit: number; page: number }): Promise<GetNotificationsResponse> {
  const response = await fetchGraphQLQuery(GET_MY_NOTIFICATIONS_QUERY, { input });
  return (response as any).getMyNotifications;
}
