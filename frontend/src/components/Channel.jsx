import cn from 'classnames'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useDispatch, useSelector } from 'react-redux'

import { MODAL_RENAME, MODAL_REMOVE } from '../const.js'
import { selectCurrentChannelId, setCurrentChannel, setModalConfig } from '../store/uiSlice.js'

const Channel = ({ channel }) => {
  const { id, name, removable } = channel
  const currentChannelId = useSelector(selectCurrentChannelId)
  const isCurrent = id === currentChannelId

  const dispatch = useDispatch()

  const handleShowRenameModal = channel => dispatch(setModalConfig({ show: true, type: MODAL_RENAME, channel }))
  const handleShowRemoveModal = channel => dispatch(setModalConfig({ show: true, type: MODAL_REMOVE, channel }))

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
            <Dropdown.Item href="#" onClick={() => handleShowRemoveModal({ id, name })}>Удалить</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleShowRenameModal({ id, name })}>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      {!removable && button}
    </li>
  )
}

export default Channel
