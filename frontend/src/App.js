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
        <Route path='/video/:videoId?' element={<PlayingVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
