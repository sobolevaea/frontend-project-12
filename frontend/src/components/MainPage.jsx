import cn from 'classnames'
import filter from 'leo-profanity'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useFormik } from 'formik'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import ModalUniversal from './ModalUniversal.jsx'
import LoaderWrapper from './LoaderWrapper.jsx'
import store from '../store/index.js'
import { actions as authActions } from '../store/authSlice.js'
import { selectCurrentChannel, useGetChannels } from '../store/channelsApi.js'
import { useGetMessages, useAddMessage, selectCurrentMessages } from '../store/messagesApi.js'
import { selectCurrentChannelId, setCurrentChannel } from '../store/uiSlice.js'

const RenderChannels = ({ children, onRename, onRemove }) => {
  const dispatch = useDispatch()
  const currentChannelId = useSelector(selectCurrentChannelId)

  return children.map(({ id, name, removable }) => {
    const isCurrent = id === currentChannelId
    const button = (
      <Button
        className={cn('w-100', 'rounded-0', 'text-start', {
          'text-truncate': removable,
        })}
        onClick={() => dispatch(setCurrentChannel({ id }))}
        variant={isCurrent && 'secondary'}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
    )
    return (
      <li className="nav-item w-100" key={id}>
        {removable && (
          <Dropdown as={ButtonGroup} className="d-flex">
            {button}
            <Dropdown.Toggle split id="dropdown-custom-toggle" variant={isCurrent && 'secondary'} className="flex-grow-0">
              <span className="visually-hidden">Управление каналом</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => onRemove({ id, name })}>Удалить</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => onRename({ id, name })}>Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {!removable && button}
      </li>
    )
  })
}

const RenderMessages = ({ children }) => {
  return children.map(message => (
    <div className="text-break mb-2" key={message.id}>
      <b>{message.username}</b>
      {': '}
      {message.body}
    </div>
  ))
}

const MainPage = () => {
  const state = store.getState()
  const [addMessage] = useAddMessage()

  const { t } = useTranslation()

  const { isLoading: isChannelsLoading, data: channels } = useGetChannels()
  const { isLoading: isMessagesLoading } = useGetMessages()

  const inputRef = useRef(null)

  const currentChannelId = useSelector(selectCurrentChannelId)
  const currentChannel = useSelector(selectCurrentChannel)
  const currentMessages = useSelector(selectCurrentMessages)

  const [modal, setModal] = useState({
    show: false,
    type: null,
    channel: null,
  })

  const handleShowAddModal = () => setModal({ show: true, type: 'add', channel: null })
  const handleShowRenameModal = channel => setModal({ show: true, type: 'rename', channel })
  const handleShowRemoveModal = channel => setModal({ show: true, type: 'remove', channel })
  const handleCloseModal = () => setModal({ show: false, type: null, channel: null })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleExit = () => {
    dispatch(authActions.logout())
    navigate('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
  }, [navigate])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentChannelId])

  const messageForm = useFormik({
    initialValues: { body: '' },
    onSubmit: ({ body }) => {
      const newMessage = {
        body: filter.clean(body),
        channelId: currentChannelId,
        username: state.auth.username,
      }
      addMessage(newMessage)
      messageForm.resetForm()
    },
  })

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">{t('titles.home')}</a>
            {state.auth.isAuth && <button type="button" className="btn btn-primary" onClick={() => handleExit()}>{t('buttons.exit')}</button>}
          </div>
        </nav>
        <ModalUniversal
          show={modal.show}
          onHide={handleCloseModal}
          type={modal.type}
          channel={modal.channel}
        />
        <LoaderWrapper isLoading={isMessagesLoading || isChannelsLoading}>
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('titles.channels')}</b>
                <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleShowAddModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z">
                    </path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4">
                    </path>
                  </svg>
                  <span className="visually-hidden">+</span>
                </button>
              </div>
              <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels && <RenderChannels onRename={handleShowRenameModal} onRemove={handleShowRemoveModal}>{channels}</RenderChannels>}
              </ul>
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
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
                <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                  {currentMessages && <RenderMessages>{currentMessages}</RenderMessages>}
                </div>
                <div className="mt-auto px-5 py-3">
                  <form onSubmit={messageForm.handleSubmit} noValidate="" className="py-1 border rounded-2">
                    <div className="input-group has-validation">
                      <input
                        ref={inputRef}
                        name="body"
                        aria-label="Новое сообщение"
                        placeholder="Введите сообщение..."
                        className="border-0 p-0 ps-2 form-control"
                        onChange={messageForm.handleChange}
                        value={messageForm.values.body}
                        autoFocus
                      />
                      <button type="submit" disabled="" className="btn btn-group-vertical">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
                          <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z">
                          </path>
                        </svg>
                        <span className="visually-hidden">{t('buttons.send')}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </LoaderWrapper>
      </div>
    </div>

  )
}

export default MainPage
