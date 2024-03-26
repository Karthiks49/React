import ParentComponent from "./components/Practice1/ParentComponent"
import Transactions from "./components/Practice2/Transactions"
import ContactsLayout from "./components/Practice3/Layouts/Main/ContactsLayout"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from "./routes/root"
import ErrorPage from "./error-page"
import ContactModal from "./components/Practice3/Pages/Modal/ContactModal"

const router = createBrowserRouter([
  {
      path: '/',
      element: <Root/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: '/parent',
          element: <ParentComponent/>
        },
        {
          path: '/transactions',
          element: <Transactions/>
        },
        {
          path: '/contact-manager',
          element: <ContactsLayout/>
        },
        {
          path: '/contact-manager/form',
          element: <ContactModal/>
        }
      ]
  }
])

function App() {
  return (
    <div className="main-page">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
