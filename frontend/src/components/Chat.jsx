import { useSelector } from 'react-redux'

import Message from './Message.jsx'
import { selectCurrentMessages } from '../store/messagesApi.js'

const Chat = ({ messagesBoxRef }) => {
  const currentMessages = useSelector(selectCurrentMessages)

  const renderedMessages = currentMessages.map(message => <Message key={message.id} message={message} />)

  return (
    <div id="messages-box" ref={messagesBoxRef} className="chat-messages overflow-auto px-5 ">
      {currentMessages && renderedMessages}
    </div>
  )
}

export default Chat
