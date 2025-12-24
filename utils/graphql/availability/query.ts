import { gql, DocumentNode } from '@apollo/client';

export const SET_EDUCATOR_AVAILABILITY_MUTATION: DocumentNode = gql`
mutation SetEducatorAvailability($input: SetAvailabilityInput!) {
  SetEducatorAvailability(input: $input) {
    message
    success
  }
}
`;

export const GET_EDUCATOR_AVAILABILITY_QUERY: DocumentNode = gql`
query GetEducatorAvailability {
  GetEducatorAvailability {
    availabilityDays {
      dayOfWeek
      endTime
      fullDay
      startTime
    }
    unavailabilityDays {
      dayOfWeek
      endTime
      
      startTime
      unavailableWholeDay
      unavailable_date_at
    }
 
    slot_duration
    overrides {
      dayOfWeek
      endDateTime
      
      startDateTime
    }
    message
    lunchBreak {
      endTime
      lunchBreak
      startTime
    }
    break {
      break_between_interval
      interval_status
    }
  }
}
`;