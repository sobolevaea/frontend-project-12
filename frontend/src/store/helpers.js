export const prepareHeaders = (headers, { getState }) => {
  const { auth } = getState()
  console.log(auth)
  headers.set('Authorization', `Bearer ${auth?.token}`)

  return headers
}