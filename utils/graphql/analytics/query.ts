import { gql, DocumentNode } from '@apollo/client';

export const ADMIN_ANYLYTICS_QUERY: DocumentNode = gql`
query GetAnalytics {
  getAnalytics {
    message
    sessionStatus {
      booked
      cancelled
      completed
      total
      upcoming
      expired
      waitingForApproval
    }
    success
    userOverview {
      educators
      students
      total
    }
  }
}
`;
