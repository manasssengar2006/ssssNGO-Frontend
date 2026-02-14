import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#EDEDCE]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
