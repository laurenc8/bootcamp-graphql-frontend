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
  mutation createAuthor ($input: CreateAuthorInput!) {
  createAuthor (input: $input) {
    firstName
    lastName
  }
}
`