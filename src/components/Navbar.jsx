import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  UserPlus,
  LayoutDashboard,
  Image,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const navVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const menuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1 },
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="relative text-[#EDEDCE] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#629FAD] after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
      className="bg-[#0C2C55] sticky top-0 z-50 shadow"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <span className="text-[#EDEDCE] text-sm font-semibold leading-tight">
            Svabhiman Siksha <br />
            Sanskriti Samaajotthaan
          </span>
        </motion.div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Posts">
            <span className="flex items-center gap-1">
              <Image size={16} /> Posts
            </span>
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/sangathan">संगठन</NavLink>

          <NavLink to="/contact">Contact</NavLink>

          {!user && (
            <>
              <NavLink to="/login">
                <span className="flex items-center gap-1">
                  <LogIn size={16} /> Login
                </span>
              </NavLink>
              <NavLink to="/register">
                <span className="flex items-center gap-1">
                  <UserPlus size={16} /> Register
                </span>
              </NavLink>
            </>
          )}

          {user && (
            <>
              {!user.joined && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/join")}
                  className="bg-[#296374] text-[#EDEDCE] px-4 py-1.5 rounded-full"
                >
                  Join
                </motion.button>
              )}

              {user.joined && (
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                  Member
                </span>
              )}

              {user.role === "admin" && (
                <NavLink to="/admin">
                  <span className="flex items-center gap-1">
                    <LayoutDashboard size={16} /> Admin
                  </span>
                </NavLink>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="bg-[#296374] text-[#EDEDCE] px-3 py-1.5 rounded flex items-center gap-1"
              >
                <LogOut size={16} /> Logout
              </motion.button>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#EDEDCE]"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#296374] overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/Posts">Posts</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>

              {!user && (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/register">Register</NavLink>
                </>
              )}

              {user && (
                <>
                  {!user.joined && (
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate("/join");
                      }}
                      className="text-left bg-[#0C2C55] text-[#EDEDCE] px-4 py-2 rounded"
                    >
                      Join NGO
                    </button>
                  )}

                  {user.joined && (
                    <span className="w-fit px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Member
                    </span>
                  )}

                  {user.role === "admin" && (
                    <NavLink to="/admin">Admin</NavLink>
                  )}

                  <button
                    onClick={handleLogout}
                    className="text-left text-[#EDEDCE]"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
