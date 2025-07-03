import { createBrowserRouter } from 'react-router-dom'
import { NotFound } from './pages/404'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home Page</div>,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <div>Welcome to the Home Page</div>,
      },
      {
        path: ':link',
        element: <div>Detail Page</div>,
      },
    ],
  },
])
