import { gql, DocumentNode } from '@apollo/client';

export const ADMIN_SETTINGS_MUTATION: DocumentNode = gql`
mutation AdminUpdateSettings($input: SettingsDto!) {
  adminUpdateSettings(input: $input) {
    message
    success
    settings {
      cancellation_time {
        hours
        minutes
      }
      created_at
      default_admin_token
      id
      reschedule_time {
        hours
        minutes
      }
      session_amount
      updated_at
    }
  }
}
`;

export const ADMIN_SETTINGS_QUERY: DocumentNode = gql`
query GetSettings {
  getSettings {
    message
    settings {
      cancellation_time {
        hours
        minutes
      }
      created_at
      default_admin_token
      id
      reschedule_time {
        hours
        minutes
      }
      session_amount
      updated_at
    }
    success
  }
}
`;
