import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadVideo />
            </ProtectedRoute>
          }
        />
        {/* Rota com parâmetro opcional para o videoId */}
        <Route
          path="/video/:id"
          element={
            <ProtectedRoute>
              <PlayingVideo />
            </ProtectedRoute>
          }
        />
        {/* Rota de fallback para páginas não encontradas */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
