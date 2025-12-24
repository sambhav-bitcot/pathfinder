import { gql, DocumentNode } from '@apollo/client';

export const GET_ALL_RESOURCES_QUERY: DocumentNode = gql`
  query GetAllResources($searchFilter: ResourceSearchFilterInput) {
    GetAllResources(searchFilter: $searchFilter) {
      total
      items {
        attachment {
          file_url
          file_type
          uploadedByUser {
            first_name
            last_name
          }
        }
        created_at
        description
        id
        resource_type
        title
        updated_at
      }
    }
  }
`;

export const REMOVE_RESOURCE_MUTATION: DocumentNode = gql`
  mutation RemoveResource($id: String!) {
    RemoveResource(id: $id) {
      message
      success
    }
  }
`;

export const CREATE_RESOURCE_MUTATION: DocumentNode = gql`
  mutation CreateResource($createResourceInput: CreateResourceInput!) {
    CreateResource(createResourceInput: $createResourceInput) {
      id
      title
      description
      resource_type
      created_at
      updated_at
      attachment {
        file_type
        file_url
        uploadedByUser {
          first_name
          last_name
        }
      }
    }
  }
`;
