import { gql, DocumentNode } from '@apollo/client';

export const GET_SESSION_BY_ID: DocumentNode = gql`
 query GetSessionDetailsBySessionId($getSessionDetailsBySessionIdId: String!) {
  getSessionDetailsBySessionId(id: $getSessionDetailsBySessionIdId) {
    message
    session {
      active_status
      cancelledBy {
        active_status
        avatar_path
        email
        first_name
        id
        last_name
        phone
        platform
        profile {
          amount
        }
        role
        timezone
      }
      cancelled_at
      cancelled_by
      created_at
      description
      duration_min
      educator {
        first_name
        last_name
        email
        id
        avatar_path
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
        id
        avatar_path
        role
      }
      student_id
      title
      updated_at
    }
    success
  }
}
`;

export const GET_SESSION_BY_ID_FOR_STUDENT: DocumentNode = gql`
 query GetSessionByIdForStudent($getSessionByIdForStudentId: ID!) {
  getSessionByIdForStudent(id: $getSessionByIdForStudentId) {
    cancelledAt
    createdAt
    description
    durationMin
    educator {
      first_name
      avatar_path
      last_name
      id
    }
    educatorId
    endedAt
    id
    rescheduledAt
    roomUrl
    scheduledAt
    startedAt
    status
    student {
      first_name
      avatar_path
      last_name
      id
    }
    studentId
    title
    updatedAt
  }
}
`;

export const COMPLETE_SESSION = gql`
mutation CompleteSession($sessionId: String!) {
  completeSession(sessionId: $sessionId) {
    message
    success
  }
}
`;

export const SESSION_NOTES = gql`
mutation AddSessionNote($input: AddSessionNoteInput!) {
  addSessionNote(input: $input) {
    message
    success
  }
}
`;