export const MAIN_PAGE = 'MAIN_PAGE'
export const LOGIN_PAGE = 'LOGIN_PAGE'
export const SIGNUP_PAGE = 'SIGNUP_PAGE'
export const NOT_FOUND_PAGE = 'NOT_FOUND_PAGE'

const Paths = {
  [MAIN_PAGE]: '/',
  [LOGIN_PAGE]: 'login',
  [SIGNUP_PAGE]: 'signup',
  [NOT_FOUND_PAGE]: '*',
}

export const getPath = page => Paths[page] || Paths[MAIN_PAGE]

const host = '/api'
const version = 'v1'

export const LOGIN_API = 'LOGIN_API'
export const SIGNUP_API = 'SIGNUP_API'
export const CHANNELS_API = 'CHANNELS_API'
export const MESSAGES_API = 'MESSAGES_API'

const APIs = {
  [LOGIN_API]: 'login',
  [SIGNUP_API]: 'signup',
  [CHANNELS_API]: 'channels',
  [MESSAGES_API]: 'messages',
}

export const getApiPath = path => `${host}/${version}/${APIs[path]}`
