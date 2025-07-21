import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CryptoPage from './pages/CryptoPage'

const queryClient = new QueryClient()



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<CryptoPage />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
