import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import UploadVideo from "./pages/UploadVideo";
import PlayingVideo from "./pages/PlayingVideo";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/Registerpage";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <PrivateRoute component={HomePage} path="/" />
          <PrivateRoute component={UploadVideo} path="/upload" />
          {/* Rota com parâmetro opcional para o videoId */}
          <PrivateRoute component={PlayingVideo} path="//video/:id" />
          {/* Rota de fallback para páginas não encontradas */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
