import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { dummyAddressData } from "../assets/assets";
import { useState } from "react";
import type { Address } from "../types";
import { CheckIcon, CreditCardIcon, MapPinIcon } from "lucide-react";

const CheckOut = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL;
  const navigate = useNavigate();

  const { items, cartTotal } = useCart();
  const { user } = { user: { addresses: dummyAddressData } };

  const [step, setStep] = useState("address");
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState<Address>({
    _id: "",
    label: "Home",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
    lat: 0,
    lng: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + deliveryFee + tax;

  const steps: { key: string; label: string; icon: typeof MapPinIcon }[] = [
    { key: "address", label: "Address", icon: MapPinIcon },
    { key: "payment", label: "Payment", icon: CreditCardIcon },
    { key: "review", label: "Review", icon: CheckIcon },
  ];

  const handlePlaceOrder = async () => {
    setLoading(true);
    navigate("/orders");
  };

  // Populate address from user's default address;

  useState(() => {
    if (user?.addresses?.length) {
      const defaultAddress =
        user.addresses.find((a) => a.isDefault) || user.addresses[0];
      setAddress({
        _id: defaultAddress?._id,
        label: defaultAddress?.label,
        address: defaultAddress?.address,
        city: defaultAddress?.city,
        state: defaultAddress?.state,
        zip: defaultAddress?.zip,
        isDefault: defaultAddress?.isDefault,
        lat: defaultAddress?.lat,
        lng: defaultAddress?.lng,
      });
    }
  });

  if(items.length === 0){
    return(
      <div className="min-h-screen bg-app-cream flex-center ">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-app-green mb-2">Your Cart is Empty</h2>
          <p className="text-sm text-app-text-light mb-4">Add some products to checkout</p>
          <button onClick={()=>navigate("/products ")} className="px-5 py-2.5 bg-app-green text-white rounded-2xl hover:bg-app-green-light hover:scale-105 transition-colors ">Browse Products</button>
        </div>
      </div>
    )
  }

  return <div>CheckOut</div>;
};

export default CheckOut;
