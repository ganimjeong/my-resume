import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6">
        <Header />
        <main className="pb-16">
          <About />
          <Skills />
          <Experience />
          <Projects />
        </main>
      </div>
    </div>
  )
}
