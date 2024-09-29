import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadVideo from './pages/UploadVideo';
import PlayingVideo from './pages/PlayingVideo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadVideo />} />
        {/* Rota com parâmetro opcional para o videoId */}
        <Route path="/video/:id" element={<PlayingVideo />} />
        {/* Rota de fallback para páginas não encontradas */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
