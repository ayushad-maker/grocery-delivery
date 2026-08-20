import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Products from "./pages/Products";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import SearchResult from "./pages/SearchResult";
import FlashDeals from "./pages/FlashDeals";
import CheckOut from "./pages/CheckOut";
import MyOrders from "./pages/MyOrders";
import OrdersTracking from "./pages/OrdersTracking";
import Addresses from "./pages/Addresses";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1B3022",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />

      <Routes>
        {/* Auth pages - No Navbar/Footer */}
        <Route path="/login" element={<Login />} />

        {/* Main pages - With Navbar/Footer */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="deals" element={<FlashDeals />} />
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<CheckOut />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="orders/:id" element={<OrdersTracking />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Route>
        <Route />
      </Routes>
    </>
  );
};

export default App;
