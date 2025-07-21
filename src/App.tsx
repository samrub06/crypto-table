import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CityDetails from './pages/CityDetails'
import CityGridPage from './pages/CityGridPage'

function App() {

  return (
    <>
         <HashRouter>
      <Routes>
        <Route path="/" element={<CityGridPage />} />
        <Route path="/city/:name" element={<CityDetails />} />
      </Routes>
    </HashRouter>
    </>
  )
}

export default App
