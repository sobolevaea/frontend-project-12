import cn from 'classnames'
import filter from 'leo-profanity'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectModalShow } from '../../store/uiSlice.js'
import { selectModalChannel, setModalConfig } from '../../store/uiSlice.js'
import { useUpdateChannel, selectChannelsNames } from '../../store/channelsApi.js'

const RenameForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [renameChannel] = useUpdateChannel()

  const channel = useSelector(selectModalChannel)
  const names = useSelector(selectChannelsNames)

  const filteredNames = names.filter(name => name !== channel?.name)

  const validationSchema = object({
    name: string()
      .trim()
      .min(3, t('errors.from3to20Symbols'))
      .max(20, t('errors.from3to20Symbols'))
      .notOneOf(filteredNames, t('errors.mustBeUnique')),
  })

  const formik = useFormik({
    initialValues: { name: channel?.name || '' },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        values.name = filter.clean(values.name)
        await renameChannel({ id: channel.id, ...values })
        toast.success(`${t('toasts.rename')}`)
        onHide()
        formik.resetForm()
      }
      catch (error) {
        toast.error(`Failed to rename channel: ${error.message}`)
      }
    },
  })

  const inputClass = cn('mb-2', 'form-control', {
    'is-invalid': formik.errors.name,
  })

  const show = useSelector(selectModalShow)

  const inputRef = useRef(null)

  const onHide = () => {
    dispatch(setModalConfig({ show: false }))
  }

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [show])

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          ref={inputRef}
          name="name"
          id="name"
          className={inputClass}
          onChange={formik.handleChange}
          value={formik.values.name}
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
  )
}

export default RenameForm
