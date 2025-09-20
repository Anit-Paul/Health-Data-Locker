import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./store/userContext";

import Details from "./components/details/details";
import Login from "./components/login/login";
import Registration from "./components/registration/registration";
import Profile from "./components/profile/profile";

// Protected Route: only accessible if user is logged in
function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  console.log(user)
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}


function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route
        path="/login"
        element={
          
            <Login />
          
        }
      />
      <Route
        path="/registration"
        element={
         
            <Registration />
          
        }
      />

      {/* Protected routes */}
      <Route
        path="/details"
        element={
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Catch-all: redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
