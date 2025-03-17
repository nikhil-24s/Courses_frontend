import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CourseProvider } from './context/CourseContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CourseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CourseProvider>
  </AuthProvider>
)
