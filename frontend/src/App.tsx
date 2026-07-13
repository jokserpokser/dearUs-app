import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Home } from "./pages/Home.tsx";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
    </Routes>
  );
}

export default App;
