import Channel from './Channel.jsx'
import { useGetChannels } from '../store/channelsApi.js'

const ChannelsList = ({ channelsBoxRef }) => {
  const { data: channels } = useGetChannels()

  const renderedChannels = channels.map(channel => <Channel key={channel.id} channel={channel} />)

  return (
    <ul id="channels-box" ref={channelsBoxRef} className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels && renderedChannels}
    </ul>
  )
}

export default ChannelsList
