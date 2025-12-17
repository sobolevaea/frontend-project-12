import filter from 'leo-profanity'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { useRef, useEffect } from 'react'

import { selectUser } from '../../store/authSlice.js'
import { useAddMessage } from '../../store/messagesApi.js'
import { selectCurrentChannelId } from '../../store/uiSlice.js'

const ChatForm = () => {
  const username = useSelector(selectUser)
  const [addMessage] = useAddMessage()

  const { t } = useTranslation()
  const currentChannelId = useSelector(selectCurrentChannelId)

  const validationSchema = object({
    body: string().trim().required(),
  })

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: ({ body }) => {
      try {
        const newMessage = {
          body: filter.clean(body),
          channelId: currentChannelId,
          username,
        }
        addMessage(newMessage)
        formik.resetForm()
      }
      catch (e) {
        console.log(e)
      }
    },
  })

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentChannelId])

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input
          ref={inputRef}
          name="body"
          aria-label={t('buttons.newMessage')}
          placeholder={t('buttons.enterMessage')}
          className="border-0 p-0 ps-2 form-control"
          onChange={formik.handleChange}
          value={formik.values.body}
          autoFocus
        />
        <button type="submit" disabled="" className="btn btn-group-vertical">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('buttons.send')}</span>
        </button>
      </div>
    </form>
  )
}

export default ChatForm
