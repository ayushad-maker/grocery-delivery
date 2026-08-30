import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import Footer from "../components/Home/Footer";

const AppLayout = () => {
  return (
    <>
      <Banner />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <CartSidebar />
      <Footer/>
    </>
  );
};

export default AppLayout;
