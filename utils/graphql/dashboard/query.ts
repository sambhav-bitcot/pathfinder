import { gql, DocumentNode } from '@apollo/client';

export const GET_STUDENT_DASHBOARD_QUERY: DocumentNode = gql`
  query GetStudentDashboard($userId: String!) {
    getStudentDashboard(userId: $userId) {
      completedSessions
      tokenBalance
      upcomingSessions
    }
  }
`;

export const GET_EDUCATOR_DASHBOARD_QUERY: DocumentNode = gql`
  query GetEducatorDashboard($userId: String!) {
    getEducatorDashboard(userId: $userId) {
      activeStudents
        averageRating
        sessionsThisWeek
        totalEarnings
        success
        message
    }
  }
`;


export const GET_ADMIN_DASHBOARD_QUERY: DocumentNode = gql`
query Users {
  getAdminDashboard {
    users {
      active_status
      created_at
      email
      first_name
      id
      last_name
      role
    }
    activeSessions
    growthRate
    revenue
    totalusers
  }
}
`;


export const GET_RECENT_TRANSACTIONS_QUERY: DocumentNode = gql`
query PaymentList {
  paymentList {
    completed
    pending
    total
    items {
      amount
      created_at
      user {
        first_name
        last_name
      }
    }
  }
}
`;


