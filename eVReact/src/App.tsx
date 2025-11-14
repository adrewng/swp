import { ToastContainer } from 'react-toastify'
import useRouteElements from './routers/useRouteElements'

function App() {
  const routeElements = useRouteElements()

  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
