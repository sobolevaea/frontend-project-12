const host = '/api'
const version = 'v1'

export default {
  signupPath: () => [host, version, 'signup'].join('/'),
  loginPath: () => [host, version, 'login'].join('/'),
  channelsPath: () => [host, version, 'channels'].join('/'),
  currentChannelPath: id => [host, version, 'channels', id].join('/'),
  messagesPath: () => [host, version, 'messages'].join('/'),
  currentMessagePath: id => [host, version, 'channels', id].join('/'),
}