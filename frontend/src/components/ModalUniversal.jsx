import cn from 'classnames'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useAddChannel, useUpdateChannel, useDeleteChannel, selectChannelsNames } from '../store/channelsApi.js'
import { setCurrentChannel } from '../store/uiSlice.js'
import { selectDefaultChannelId, selectCurrentChannelId } from '../store/uiSlice.js'

const ModalUniversal = ({ show, onHide, type, channel }) => {
  const [addChannel] = useAddChannel()
  const [renameChannel] = useUpdateChannel()
  const [removeChannel] = useDeleteChannel()
  const dispatch = useDispatch()
  const names = useSelector(selectChannelsNames)
  const currentChannelId = useSelector(selectCurrentChannelId)
  const defaultChannelId = useSelector(selectDefaultChannelId)

  // Фильтруем имена для валидации (для переименования исключаем текущее имя канала)
  const filteredNames = type === 'rename'
    ? names.filter(name => name !== channel?.name)
    : names

  const validationSchema = object({
    name: string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(filteredNames, 'Должно быть уникальным'),
  })

  const formik = useFormik({
    initialValues: { name: channel?.name || '' },
    validationSchema: type !== 'remove' ? validationSchema : null,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (type === 'add') {
          const response = await addChannel(values)
          const newChannelId = response.data.id
          dispatch(setCurrentChannel({ id: newChannelId }))
        }
        else if (type === 'rename') {
          await renameChannel({ id: channel.id, ...values })
          // После переименования остаемся в том же канале
        }
        onHide()
        formik.resetForm()
      }
      catch (error) {
        console.error(`Failed to ${type} channel:`, error)
      }
    },
  })

  const handleRemove = async () => {
    try {
      await removeChannel({ id: channel.id })
      if (channel.id === currentChannelId) {
        dispatch(setCurrentChannel({ id: defaultChannelId }))
      }
      onHide()
    }
    catch (error) {
      console.error('Failed to remove channel:', error)
    }
  }

  // Функции для определения текстов в зависимости от типа
  const getTitle = () => {
    switch (type) {
      case 'add': return 'Добавить канал'
      case 'rename': return 'Переименовать канал'
      case 'remove': return 'Удалить канал'
      default: return ''
    }
  }

  const getSubmitButtonText = () => {
    switch (type) {
      case 'add': return 'Добавить'
      case 'rename': return 'Переименовать'
      default: return 'Отправить'
    }
  }

  const inputClass = cn('mb-2', 'form-control', {
    'is-invalid': formik.errors.name,
  })

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
        // Контент для удаления
              <div>
                <p className="lead">
                  Уверены?
                </p>
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="me-2" onClick={onHide}>
                    Отменить
                  </Button>
                  <Button variant="danger" onClick={handleRemove}>
                    Удалить
                  </Button>
                </div>
              </div>
            )
          : (
        // Контент для добавления/переименования
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    name="name"
                    id="name"
                    className={inputClass}
                    onChange={formik.handleChange}
                    value={formik.values.name} // Исправлено: было values.body
                    autoFocus
                  />
                  <label className="visually-hidden" htmlFor="name">
                    Имя канала
                  </label>
                  {formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={onHide}>
                      Отменить
                    </Button>
                    <Button variant="primary" type="submit">
                      {getSubmitButtonText()}
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
