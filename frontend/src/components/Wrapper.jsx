import Loader from './Loader.jsx'

const wrapperClass = 'h-100 d-flex justify-content-center align-items-center'

const Wrapper = ({ isLoading, children }) => (
  <div className={wrapperClass}>
    {isLoading ? <Loader /> : children}
  </div>
);

export default Wrapper