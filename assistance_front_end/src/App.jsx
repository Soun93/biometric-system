// REACT
import { RouterProvider } from 'react-router-dom'

// COMPONENTS
import router from './routes.jsx'
import { AuthProvider } from './auth/AuthProvider.jsx'

// STYLES
import './constants.css'

function App() {
  return  (
    <AuthProvider>
      <RouterProvider router={router} />  
    </AuthProvider>    
  )
}

export default App