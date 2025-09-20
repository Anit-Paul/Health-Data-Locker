import Details from "./components/details/details";
import Login from "./components/login/login";
import Registration from "./components/registration/registration";
import Profile from "./components/profile/profile"
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/details" element={<Details />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
export default App;
