import { gql, DocumentNode } from '@apollo/client';


export const GET_EDUCATOR_SESSIONS_QUERY: DocumentNode = gql`
query GetSessions($input: GetEducatorSessionsInput) {
  getSessions(input: $input) {
    message
    success
    sessions {
      active_status
      cancelledBy {
        first_name
        last_name
        id
        email
      }
      cancelled_at
      cancelled_by
      created_at
      description
      duration_min
      educator {
       profile {
          specialization
        }
        first_name
        last_name
        email
        id
      }
      educator_id
      ended_at
      id
      rescheduled_at_end_time
      rescheduled_at_start_time
      room_metadata
      room_url
      scheduled_at_end_time
      scheduled_at_start_time
      started_at
      status
      student {
        first_name
        last_name
        email
        id
      }
      student_id
      title
      updated_at
    }
    total
    completedCount
    canceledCount
    upcomingCount
    expiredCount
  }
}
`;

export const CANCEL_SESSION_QUERY: DocumentNode = gql`
query CancelSession($input: CancelSessionInput!) {
  cancelSession(input: $input) {
    message
    success
  }
}`

export const GET_EDUCATORS_LIST_QUERY: DocumentNode = gql` 
query EducatorsList($filter: EducatorListFilterInput) {
  educatorsList(filter: $filter) {
    total
    educators {
      session_amount
      id
      profile {
        session_topic
        amount
        bio
        created_at
        currency_type
        duration
        id
        specialization
        user_id
        user {
          avatar_path
          first_name
          last_name
        }
      }
    }
  }
}
`;

export const GET_EDUCATOR_PROFILE_QUERY: DocumentNode = gql`
  query GetEducatorProfile($userId: String!) {
    GetEducatorProfile(userId: $userId) {
      session_amount
      availabilities {
        active_status
        created_at
        day_of_week
        end_time
        id
        is_recurring
        start_time
        updated_at
        user_id
      }
      averageRating
      totalreviews
      user {
        last_name
        first_name
        avatar_path
        profile {
          amount
          bio
          duration
          specialization
          id
        }
        id
      }
    }
  }
`;

export const GET_SLOTS_QUERY: DocumentNode = gql`
  query GetSlot($input: GetSlotInput!) {
    getSlot(input: $input) {
      message
      success
      slots {
        end_datetime
        end_time
        is_available
        start_datetime
        start_time
      }
    }
  }
`;

export const CREATE_SESSION_MUTATION: DocumentNode = gql`
  mutation Mutation($input: CreateSessionInput!) {
    createSession(input: $input) {
      message
      success
    }
  }
`;


export const RESCHEDULE_SESSION_MUTATION: DocumentNode = gql`
 mutation RescheduledSession($input: RescheduleSessionInput!) {
  rescheduledSession(input: $input) {
    message
    success
  }
}
`;
export const GET_SESSION_NOTES_QUERY: DocumentNode = gql`
  query GetSessionNotes($sessionId: String!) {
    getSessionNotes(sessionId: $sessionId) {
      message
      session_notes {
        content
        created_at
        id
      }
      success
    }
  }
`;

export const APPROVE_CANCEL_SESSION_BY_EDUCATOR :DocumentNode = gql`
mutation ApproveOrCancelSession($input: ApproveOrCancelSessionInput!) {
  approveOrCancelSession(input: $input) {
    message
    success
  }
}`;

