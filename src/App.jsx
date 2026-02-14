import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Posts from "./pages/Posts";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUpload from "./pages/AdminUpload";
import AdminEditPost from "./pages/AdminEditPost";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminMembers from "./pages/AdminMembers";
import AdminRequests from "./pages/AdminRequests";
import Sangathan from "./pages/Sangathan";

import MembershipRequest from "./pages/MembershipRequest";
import MainLayout from "./layouts/MainLayout";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* MAIN LAYOUT */}
      <Route element={<MainLayout />}>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/sangathan" element={<Sangathan />} />



        {/* JOIN NGO (USER ONLY) */}
        <Route
          path="/join"
          element={user ? <MembershipRequest /> : <Login />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Login />}
        />

        <Route
          path="/admin/requests"
          element={user?.role === "admin" ? <AdminRequests /> : <Login />}
        />

        <Route
          path="/admin/members"
          element={user?.role === "admin" ? <AdminMembers /> : <Login />}
        />

        <Route
          path="/admin/upload"
          element={user?.role === "admin" ? <AdminUpload /> : <Login />}
        />

        <Route
          path="/admin/edit/:id"
          element={user?.role === "admin" ? <AdminEditPost /> : <Login />}
        />

        <Route
          path="/admin/analytics"
          element={user?.role === "admin" ? <AdminAnalytics /> : <Login />}
        />
      </Route>
    </Routes>
  );
}

export default App;
