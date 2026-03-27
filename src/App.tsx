import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Resume from './pages/Resume'
import ResumePrint from './pages/ResumePrint'

export default function App() {
  return (
    <BrowserRouter basename="/my-resume">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resume/:lang" element={<Resume />} />
        <Route path="/resume/:lang/print" element={<ResumePrint />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
