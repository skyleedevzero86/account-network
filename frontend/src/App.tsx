import { Routes, Route, Link } from 'react-router-dom'
import GraphPage from './pages/GraphPage'
import AccountPage from './pages/AccountPage'

function App() {
  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', gap: '1rem' }}>
        <Link to="/">Graph</Link>
        <Link to="/account">Account</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<GraphPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
