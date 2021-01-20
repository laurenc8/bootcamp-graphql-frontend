import gql from 'graphql-tag'

export const ALL_AUTHORS = gql`
  query allAuthors{
  allAuthors {
    firstName
    lastName
    books {
      title
    }
  }
}
`

export const ADD_AUTHOR = gql`
  mutation createAuthor ($createAuthorInput: CreateAuthorInput!) {
  createAuthor (input: $createAuthorInput) {
    firstName
    lastName
  }
}
`