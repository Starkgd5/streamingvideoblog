import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import UploadVideo from "./pages/UploadVideo";
import PlayingVideo from "./pages/PlayingVideo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <Router>
      <Routes>
        <ProtectedRoute>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadVideo />} />
          {/* Rota com parâmetro opcional para o videoId */}
          <Route path="/video/:id" element={<PlayingVideo />} />
          {/* Rota de fallback para páginas não encontradas */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </ProtectedRoute>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
