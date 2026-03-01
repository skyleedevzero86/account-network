import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import GraphPage from './pages/GraphPage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', gap: '1rem' }}>
        <Link to="/">그래프</Link>
        <Link to="/account">계정</Link>
      </nav>
      <Routes>
        <Route path="/" element={<GraphPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
