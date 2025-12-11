import { PlusSquare } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { MODAL_ADD } from '../const.js'
import { setModalConfig } from '../store/uiSlice.js'

const ChannelsHeader = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleShowAddModal = () => dispatch(setModalConfig({ show: true, type: MODAL_ADD, channel: null }))

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('titles.channels')}</b>
      <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleShowAddModal}>
        <PlusSquare size={20} />
        <span className="visually-hidden">+</span>
      </button>
    </div>
  )
}

export default ChannelsHeader
