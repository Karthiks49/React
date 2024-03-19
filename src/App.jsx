import ParentComponent from "./components/Practice1/ParentComponent"
import Transactions from "./components/Practice2/Transactions"
import ContactsLayout from "./components/Practice3/Layouts/Main/ContactsLayout"
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <ContactsLayout/>
    </QueryClientProvider>
  )
}

export default App
