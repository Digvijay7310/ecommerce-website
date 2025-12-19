import './App.css'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/admins/Dashboard'
import Login from './pages/admins/Login'

function App() {

  return (
   <BrowserRouter>
     <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="*" element={<Navigate to="/login" />} />
     </Routes>
   </BrowserRouter>
  )
}

export default App
