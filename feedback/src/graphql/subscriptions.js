/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFeedback = /* GraphQL */ `
  subscription OnCreateFeedback($owner: String) {
    onCreateFeedback(owner: $owner) {
      id
      sender
      recipient
      feedback
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateFeedback = /* GraphQL */ `
  subscription OnUpdateFeedback($owner: String) {
    onUpdateFeedback(owner: $owner) {
      id
      sender
      recipient
      feedback
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteFeedback = /* GraphQL */ `
  subscription OnDeleteFeedback($owner: String) {
    onDeleteFeedback(owner: $owner) {
      id
      sender
      recipient
      feedback
      createdAt
      updatedAt
      owner
    }
  }
`;
