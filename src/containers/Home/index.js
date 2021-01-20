/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { ALL_AUTHORS, ADD_AUTHOR } from './graphql'

const Home = () => {
  const [authors, {
    data, loading, error, called,
  }] = useLazyQuery(ALL_AUTHORS)
  if (error) {
    throw new Error('query failed')
  }
  const [createAuthor, { error: createAuthorError, loading: createAuthorLoading }] = useMutation(ADD_AUTHOR, {
    variables: {
      input: {
        firstName: 'Lauren',
        lastName: 'Chen',
        addressId: 'b9ee5775-88bf-43a2-954c-25a7cadd99a9',
      },
    },
    refetchQueries: () => [{ query: ALL_AUTHORS }],
  })
  if (createAuthorError) {
    console.log(createAuthorError)
    throw new Error('query failed')
  }
  return (
    <>
      <button type="button" onClick={createAuthor}>ADD LAUREN</button>
      {!called || loading ? 'loading...' : data.allAuthors.map(author => (
        <>
          <p>{author.firstName}</p>
          <p>{author.lastName}</p>
          <p>{author.books.map(x => x.title)}</p>
        </>
      ))}
    </>
  )
}


export default Home
