import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Home } from "./pages/Home.tsx";
import { useAuth } from "./context/AuthContext";
import { CreateCouple } from "./pages/CreateCouple.tsx";
import { JoinCouple } from "./pages/JoinCouple.tsx";
import { ManageCouple } from "./pages/ManageCouple.tsx";
import { Experiences } from "./pages/Experiences.tsx";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function CoupleRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.couple_id ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

function NoCoupleRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.couple_id ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>{children}</>
  );
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-couple"
        element={
          <NoCoupleRoute>
            <CreateCouple />
          </NoCoupleRoute>
        }
      />
      <Route
        path="/join-couple"
        element={
          <NoCoupleRoute>
            <JoinCouple />
          </NoCoupleRoute>
        }
      />
      <Route
        path="/manage-couple"
        element={
          <CoupleRoute>
            <ManageCouple />
          </CoupleRoute>
        }
      />
      <Route
        path="/experiences"
        element={
          <CoupleRoute>
            <Experiences />
          </CoupleRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
