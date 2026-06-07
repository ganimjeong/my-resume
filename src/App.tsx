import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Resume from './pages/Resume'
import ResumePrint from './pages/ResumePrint'
import ProjectShowcase from './pages/ProjectShowcase'
import ProjectDetail from './pages/ProjectDetail'
import ScrollToTop from './components/shared/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter basename="/my-resume">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resume/:lang" element={<Resume />} />
        <Route path="/resume/:lang/print" element={<ResumePrint />} />
        <Route path="/resume/:lang/projects" element={<ProjectShowcase />} />
        <Route path="/resume/:lang/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
