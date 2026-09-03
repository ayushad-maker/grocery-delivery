import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Order } from "../types";
import { dummyDashboardOrdersData } from "../assets/assets";
import Loading from "../components/Loading";
import { PackageIcon } from "lucide-react";

const MyOrders = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = ["all", "Placed", "Out for Delivery", "Delivered"];

  const { clearcart } = useCart();

  const fetchOrders = async () => {
    setOrders(dummyDashboardOrdersData as any);
  };

  useEffect(() => {
    if (searchParams.get("clearCart")) {
      clearcart();
      setSearchParams({});
      setTimeout(() => {
        fetchOrders();
      }, 2000);
    } else {
      fetchOrders();
    }
    setLoading(false);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-app-cream mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-app-green mb-6">
          My Orders
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-2 ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-xl font-medium whitespace-nowrap transition-colors ${activeTab === tab ? "bg-app-green text-white" : "bg-white text-app-text-light hover:bg-app-cream"}`}
            >
              {tab === "all" ? "All-Orders" : tab}
            </button>
          ))}
        </div>

        {/* Orders List*/}
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <PackageIcon className="size-16 border-black mx-auto mb-4" />
            <h2 className="text-lg font-medium text-app-green mb-2">
              No orders yet
            </h2>
            <p className="text-sm text-app-text-light mb-4">
              Start shopping to see your orders here
            </p>
            <Link
              to={"/products"}
              className="inline-flex px-4 py-2 bg-app-green text-white text-sm rounded-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="">
            {orders.map((order) => (
              <Link
                to={`/orders/${order._id}`}
                className="block max-w-4xl bg-white rounded-2xl p-5 hover:shadow transition-all"
              >
                {/* order id, date & status */}

                {/* Item thumbnails */}

                {/* total items & price */}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
