import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { selectCurrentChannel } from '../../store/channelsApi.js'
import { selectCurrentMessages } from '../../store/messagesApi.js'

const ChatHeader = () => {
  const { t } = useTranslation()
  const currentChannel = useSelector(selectCurrentChannel)
  const currentMessages = useSelector(selectCurrentMessages)

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {`# ${currentChannel?.name}`}
        </b>
      </p>
      <span className="text-muted">
        {t('texts.messages.count', { count: currentMessages.length })}
      </span>
    </div>
  )
}

export default ChatHeader
