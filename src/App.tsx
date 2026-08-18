// ─── App Root ─────────────────────────────────────────────────────────────────
import { ThemeProvider } from './context/ThemeContext'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import About         from './components/About'
import Skills        from './components/Skills'
import Projects      from './components/Projects'
import Contact       from './components/Contact'
import Footer        from './components/Footer'
import NeonCursor    from './components/NeonCursor'


export default function App() {
  return (
    <ThemeProvider>
      <NeonCursor />
      <div className="noise relative">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
