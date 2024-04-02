// MODULES
import { createBrowserRouter } from 'react-router-dom'

// PAGES
import { LoginPage } from './components/LoginComponents/LoginPage.jsx'
import { HomePage } from './components/HomeComponents/HomePage.jsx'
import { ProtectedRoute } from './auth/protectedRoute.jsx'
import { CameraPage } from './components/CameraComponent/CameraPage.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/camera",
        element: <CameraPage />,
      },
    ],
  },
]);

export default router;
