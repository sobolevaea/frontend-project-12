import { useTranslation } from 'react-i18next'

import notFoundImg from '../assets/404.svg'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <div className="text-center h-100 d-flex flex-column justify-content-center align-items-center">
      <img alt="Страница не найдена" className="img-fluid w-25" src={notFoundImg} />
      <h1 className="h4 text-muted">{t('titles.notFound')}</h1>
      <p className="text-muted">
        {t('texts.goTo')}
        {' '}
        <a href="/">{t('texts.toMainPage')}</a>
      </p>
    </div>
  )
}

export default NotFoundPage
