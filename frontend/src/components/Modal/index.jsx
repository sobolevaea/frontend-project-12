import ModalBootstrap from 'react-bootstrap/Modal'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import AddForm from './AddForm.jsx'
import RenameForm from './RenameForm.jsx'
import RemoveForm from './RemoveForm.jsx'
import { selectModalShow, selectModalType, setModalConfig } from '../../store/uiSlice.js'

const Modal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const show = useSelector(selectModalShow)
  const type = useSelector(selectModalType)

  const getTitle = () => {
    switch (type) {
      case 'add': return t('modals.add')
      case 'rename': return t('modals.rename')
      case 'remove': return t('modals.remove')
      default: return ''
    }
  }

  const getForm = () => {
    switch (type) {
      case 'add': return <AddForm />
      case 'rename': return <RenameForm />
      case 'remove': return <RemoveForm />
      default: return ''
    }
  }

  const onHide = () => {
    dispatch(setModalConfig({ show: false, type: null, channel: null }))
  }

  return (
    <ModalBootstrap
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBootstrap.Header closeButton>
        <ModalBootstrap.Title id="contained-modal-title-vcenter">
          {getTitle()}
        </ModalBootstrap.Title>
      </ModalBootstrap.Header>

      <ModalBootstrap.Body>
        {getForm()}
      </ModalBootstrap.Body>
    </ModalBootstrap>
  )
}

export default Modal
