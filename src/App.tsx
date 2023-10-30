import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Todo } from './components/Todo'
import { useState } from 'react'

const [queryClient] = useState(() => new QueryClient())

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Todo />
      </QueryClientProvider>
    </>
  )
}

export default App
