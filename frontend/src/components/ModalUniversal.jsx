import cn from 'classnames'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import filter from 'leo-profanity'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { useAddChannel, useUpdateChannel, useDeleteChannel, selectChannelsNames } from '../store/channelsApi.js'
import { setCurrentChannel } from '../store/uiSlice.js'
import { selectDefaultChannelId, selectCurrentChannelId } from '../store/uiSlice.js'

const ModalUniversal = ({ show, onHide, type, channel }) => {
  const [addChannel] = useAddChannel()
  const [renameChannel] = useUpdateChannel()
  const [removeChannel] = useDeleteChannel()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const names = useSelector(selectChannelsNames)
  const currentChannelId = useSelector(selectCurrentChannelId)
  const defaultChannelId = useSelector(selectDefaultChannelId)

  let inputRef = useRef(null)

  const filteredNames = type === 'rename'
    ? names.filter(name => name !== channel?.name)
    : names

  const validationSchema = object({
    name: string()
      .trim()
      .min(3, t('errors.from3to20Symbols'))
      .max(20, t('errors.from3to20Symbols'))
      .notOneOf(filteredNames, t('errors.mustBeUnique')),
  })

  const formik = useFormik({
    initialValues: { name: channel?.name || '' },
    validationSchema: type !== 'remove' ? validationSchema : null,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        values.name = filter.clean(values.name)
        if (type === 'add') {
          const response = await addChannel(values)
          const newChannelId = response.data.id
          dispatch(setCurrentChannel({ id: newChannelId }))
          toast.success(`${t('toasts.add')}`)
        }
        else if (type === 'rename') {
          await renameChannel({ id: channel.id, ...values })
          toast.success(`${t('toasts.rename')}`)
        }
        onHide()
        formik.resetForm()
      }
      catch (error) {
        toast.error(`Failed to ${type} channel: ${error.message}`)
      }
    },
  })

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

  const getTitle = () => {
    switch (type) {
      case 'add': return t('modals.add')
      case 'rename': return t('modals.rename')
      case 'remove': return t('modals.remove')
      default: return ''
    }
  }

  const inputClass = cn('mb-2', 'form-control', {
    'is-invalid': formik.errors.name,
  })

  useEffect(() => {
    if (show && inputRef.current) {
      setTimeout(() => {
        inputRef.current.select()
      }, 0)
    }
  }, [show])

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {getTitle()}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {type === 'remove'
          ? (
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
          : (
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    ref={inputRef}
                    name="name"
                    id="name"
                    className={inputClass}
                    onFocus={() => console.log(1)}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    autoFocus
                  />
                  <label className="visually-hidden" htmlFor="name">
                    {t('modals.name')}
                  </label>
                  {formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={onHide}>
                      {t('buttons.cansel')}
                    </Button>
                    <Button variant="primary" type="submit">
                      {t('buttons.send')}
                    </Button>
                  </div>
                </div>
              </form>
            )}
      </Modal.Body>
    </Modal>
  )
}

export default ModalUniversal
