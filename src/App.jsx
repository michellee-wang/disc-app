import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Landing from './pages/Landing'
import Discover from './pages/Discover'
import Saved from './pages/Saved'
import Profile from './pages/Profile'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
