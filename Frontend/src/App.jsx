import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Upload from './Pages/Upload'
import View from './Pages/View'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

export default function App() {
  return (
    <Router>

    <Routes>
      <Route path='/' element={<Upload />} />
      <Route path='/view' element={<View />} />
    </Routes>

    </Router>
  )
}
