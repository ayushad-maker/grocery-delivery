import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { MinusIcon, ShoppingBagIcon, XIcon } from "lucide-react";

const CartSidebar = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const {
    items,
    updateQuantity,
    removeCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const navigate = useNavigate();

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;

  const grandTotal = cartTotal + deliveryFee;

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-50 transition-opacity">
        {/* SideBar */}
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
          {/* Header */}
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="size-5" />
            <h2 className="text-lg font-medium">Your Cart</h2>
            <span className="px-2 py-0.5 text-xs font-semibold bg-app-cream rounded-full">
              {items.length} items
            </span>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl hover:bg-app-cream transition-colors"
            >
              <XIcon className="size-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBagIcon className="size-16 text-app-border mb-4" />
                <h4 className="text-lg font-medium mb-1">Your cart is empty</h4>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex gap-3 bg-app-cream/60 rounded-xl p-3 "
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="size-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate">
                      {item.product.name}
                    </h4>
                    <p>
                      {currency}
                      {item.product.price.toFixed(2)} / {item.product.unit}
                    </p>
                    <div>
                      <div>
                        <button>
                          <MinusIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CartSidebar;
