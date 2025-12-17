import { useTranslation } from 'react-i18next'

import notFoundImg from '../assets/404.svg'
import { getPath, MAIN_PAGE } from '../routes'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <div className="text-center h-100 d-flex flex-column justify-content-center align-items-center">
      <img alt={t('images.pageNotFound')} className="img-fluid w-25" src={notFoundImg} />
      <h1 className="h4 text-muted">{t('titles.notFound')}</h1>
      <p className="text-muted">
        {t('texts.goTo')}
        {' '}
        <a href={getPath(MAIN_PAGE)}>{t('texts.toMainPage')}</a>
      </p>
    </div>
  )
}

export default NotFoundPage
