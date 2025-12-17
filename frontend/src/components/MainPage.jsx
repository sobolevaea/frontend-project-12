import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import Chat from './Chat/Chat.jsx'
import ChatForm from './Chat/ChatForm.jsx'
import ChatHeader from './Chat/ChatHeader.jsx'
import ChannelsList from './ChannelsList.jsx'
import LoaderWrapper from './Loader/LoaderWrapper.jsx'
import ChannelsHeader from './ChannelsHeader.jsx'
import { useGetChannels } from '../store/channelsApi.js'
import { useGetMessages } from '../store/messagesApi.js'
import { selectCurrentChannelId } from '../store/uiSlice.js'

const scrollToBottom = (element) => {
  if (element.current) {
    element.current.scrollTo({
      top: element.current.scrollHeight,
    })
  }
}

const MainPage = () => {
  const { isLoading: isChannelsLoading, data: channels } = useGetChannels()
  const { isLoading: isMessagesLoading, data: messages } = useGetMessages()

  const currentChannelId = useSelector(selectCurrentChannelId)

  const messagesBoxRef = useRef(null)
  const channelsBoxRef = useRef(null)

  useEffect(() => {
    scrollToBottom(messagesBoxRef)
  }, [messages, currentChannelId])

  useEffect(() => {
    scrollToBottom(channelsBoxRef)
  }, [channels])

  return (
    <LoaderWrapper isLoading={isMessagesLoading || isChannelsLoading}>
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelsHeader />
          <ChannelsList channelsBoxRef={channelsBoxRef} />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChatHeader />
            <Chat messagesBoxRef={messagesBoxRef} />
            <div className="mt-auto px-5 py-3">
              <ChatForm />
            </div>
          </div>
        </div>
      </div>
    </LoaderWrapper>
  )
}

export default MainPage
