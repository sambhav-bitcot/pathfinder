import { gql, DocumentNode } from '@apollo/client';

export const GET_MY_NOTIFICATIONS_QUERY = `
  query GetMyNotifications($input: GetNotificationsInput) {
    getMyNotifications(input: $input) {
      limit
      message
      notifications {
        receiver_id
        read
        id
        active_status
        sender_id
        title
        body
      }
      page
      success
      total
    }
  }
`;
