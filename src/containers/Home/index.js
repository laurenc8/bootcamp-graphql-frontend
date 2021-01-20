/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ALL_AUTHORS, ADD_AUTHOR } from './graphql'

const Home = () => {
  const {
    data, loading, error,
  } = useQuery(ALL_AUTHORS)
  if (error) {
    throw new Error('query failed')
  }
  const [createAuthor, { error: createAuthorError, loading: createAuthorLoading }] = useMutation(ADD_AUTHOR, {
    update: (client, { data: { createAuthor } }) => {
      try {
        const temp = client.readQuery({ query: ALL_AUTHORS })
        temp.allAuthors = [...temp.allAuthors, createAuthor]
        client.writeQuery({ query: ALL_AUTHORS, temp })
      } catch (err) {
        throw new Error('cache failed')
      }
    },
    variables: {
      input: {
        firstName: 'Lauren',
        lastName: 'Chen',
        addressId: 'b9ee5775-88bf-43a2-954c-25a7cadd99a9',
      },
    },
    // refetchQueries: () => [{ query: ALL_AUTHORS }],
  })
  if (createAuthorError) {
    console.log(createAuthorError)
    throw new Error('query failed')
  }
  return (
    <>
      <button type="button" onClick={createAuthor}>ADD LAUREN</button>
      {loading ? 'loading...' : data.allAuthors.map(author => (
        <>
          <p>{author.firstName}</p>
          <p>{author.lastName}</p>
          <p>{author.books ? author.books.map(x => x.title) : ''}</p>
        </>
      ))}
    </>
  )
}


export default Home
