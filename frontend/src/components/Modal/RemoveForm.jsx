import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { useDeleteChannel } from '../../store/channelsApi.js'
import { selectModalChannel, setModalConfig, selectDefaultChannelId, selectCurrentChannelId, setCurrentChannel } from '../../store/uiSlice.js'

const RemoveForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [removeChannel] = useDeleteChannel()

  const channel = useSelector(selectModalChannel)
  const currentChannelId = useSelector(selectCurrentChannelId)
  const defaultChannelId = useSelector(selectDefaultChannelId)

  const handleRemove = async () => {
    try {
      await removeChannel({ id: channel.id })
      if (channel.id === currentChannelId) {
        dispatch(setCurrentChannel({ id: defaultChannelId }))
      }
      toast.success(`${t('toasts.remove')}`)
      onHide()
    }
    catch (error) {
      console.error('Failed to remove channel:', error)
    }
  }

  const onHide = () => {
    dispatch(setModalConfig({ show: false, type: null, channel: null }))
  }

  return (
    <div>
      <p className="lead">
        {t('texts.confirm')}
      </p>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={onHide}>
          {t('buttons.cansel')}
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          {t('buttons.remove')}
        </Button>
      </div>
    </div>
  )
}

export default RemoveForm
