import { Provider, ErrorBoundary } from '@rollbar/react' // Provider imports 'rollbar'

const rollbarConfig = {
  accessToken: 'f21d5e9b01f34943b49d33195670585e',
  environment: 'testenv',
}

function TestError() {
  const a = null
  return a.hello()
}

// Provider instantiates Rollbar client instance handling any uncaught errors or unhandled promises in the browser
// ErrorBoundary catches all React errors in the tree below and logs them to Rollbar
export default function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
      </ErrorBoundary>
    </Provider>
  )
}
