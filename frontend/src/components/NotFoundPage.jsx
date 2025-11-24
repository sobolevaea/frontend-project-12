import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">{t('titles.home')}</a>
            <button type="button" className="btn btn-primary">{t('buttons.exit')}</button>
          </div>
        </nav>
        <div className="text-center">
          <img alt="Страница не найдена" className="img-fluid h-25" src="./src/assets/404.svg" />
          <h1 className="h4 text-muted">{t('titles.notFound')}</h1>
          <p className="text-muted">
            {t('texts.goTo')} <a href="/">{t('texts.toMainPage')}</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
