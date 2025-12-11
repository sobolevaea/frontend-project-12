import cn from 'classnames'

import Loader from './Loader.jsx'

const LoaderWrapper = ({ isLoading, children }) => {
  const wrapperClass = cn('h-100', {
    'container': !isLoading,
    'my-4': !isLoading,
    'overflow-hidden': !isLoading,
    'rounded': !isLoading,
    'shadow': !isLoading,
    'd-flex': isLoading,
    'justify-content-center': isLoading,
    'align-items-center': isLoading,
  })

  return (
    <div className={wrapperClass}>
      {isLoading ? <Loader /> : children}
    </div>
  )
}

export default LoaderWrapper
