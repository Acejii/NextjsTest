import React from 'react'

const fetchUser = async (userId: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    const data = await response.json()
    return data
    }

const UserId = async ({
    params: { userId },
  }: {
    params: { userId: string }
  }) => {
    const user = await fetchUser(userId)
  return (
    <div>{JSON.stringify(user)}</div>
  )
}

export default UserId