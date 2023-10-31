import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import './App.css'
import { Todos, Store, Users } from './components'

function App() {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className='grid grid-cols-2 gap-4'>
          <Users />
          <Store />
          <Todos />
        </div>
        <ReactQueryDevtools buttonPosition='bottom-left' initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
