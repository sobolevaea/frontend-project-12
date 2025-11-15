export const prepareHeaders = (headers, { getState }) => {
  const { auth } = getState()
  headers.set('Authorization', `Bearer ${auth?.token}`)

  return headers
}
