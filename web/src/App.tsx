import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/404'
import { Home } from './pages/home'
import { Redirect } from './pages/redirect'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Toaster } from 'sonner'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect/:id" element={<Redirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors />
    </QueryClientProvider>
  )
}
