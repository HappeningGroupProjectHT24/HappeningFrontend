import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventPage from "./pages/MainEventPage";
import UserPage from "./pages/MainUserPage";
import FriendsAll from "./components/FriendsAll";
import EditProfile from "./components/EditProfile";
import { Link } from "react-router-dom";
import LandingPage from './pages/MainLandingPage'
import AdminPage from "./pages/MainAdminPage";
import AboutUs from "./components/AboutUs";
import HamburgerLayout from "./components/HamburgerLayout"; // New layout component
import ForgotPassword from "./pages/ForgotPasswordPage"
import FriendPage from "./components/FriendPage";

function App() {
  return (
    <Router basename="/happening">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        {/* Protected Routes (Wrapped in HamburgerLayout) */}
        <Route element={<HamburgerLayout />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/friend" element={<FriendPage />} />
          <Route path="/allfriends" element={<FriendsAll />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
