import { gql, DocumentNode } from '@apollo/client';

export const GET_USERS_QUERY: DocumentNode = gql`
query Query($filter: AdminUsersFilterInput) {
  users(filter: $filter) {
    totalEducators
    totalStudents
    totalUsers
    items {
      created_at
      active_status
      avatar_path
      first_name
      id
      role
      last_name
      profile {
        specialization
      }
    }
  }
}

  `;

export const UPDATE_USER_MUTATION = gql`
mutation UpdateUser($updateUserId: String!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $updateUserId, updateUserInput: $updateUserInput) {
    message
    success
    user {
      id
      avatar_path
      first_name
      last_name
      phone
      active_status
      role
      created_at
      profile {
        specialization
        session_description
        session_topic
      }
    }
  }
}`;

export const GET_USER_QUERY = gql`
  query Query($userId: String!) {
    user(id: $userId) {
      avatar_path
      email
      first_name
      last_name
      phone
      id
      role
      created_at
      platform
      profile {
        specialization
        amount
      }
      active_status
    }
  }
`;

