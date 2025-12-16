const Message = ({ message }) => {
  const { username, body } = message
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {body}
    </div>
  )
}

export default Message
