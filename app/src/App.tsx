import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'

export const App = () => {

  return (
    <Box>
      <Routes>
        <Route path='home' element={<Home/>}/>
      </Routes>
    </Box>
  )
}

export default App
