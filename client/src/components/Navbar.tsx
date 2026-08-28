import {
  BikeIcon,
  ChevronDownIcon,
  LogOutIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}

const Navbar = () => {
  const user: User | null = {
    name: "John Doe",
    email: "john@example.com",
    isAdmin: true,
  };

  const { cartCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = (): void => {
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-app-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[22px] font-medium shrink-0"
        >
          <BikeIcon />
          InstaCard
        </Link>

        <div className="w-full flex items-center justify-end gap-4 lg:gap-10">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <Link to="/" className="hover:text-zinc-900 transition-colors">
              Home
            </Link>

            <Link
              to="/products"
              className="hover:text-zinc-900 transition-colors"
            >
              Products
            </Link>

            <Link to="/deals" className="text-app-orange">
              Deals
            </Link>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm"
          >
            <div className="relative w-full">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />

              <input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="w-full pl-8 p-2 bg-orange-50 rounded-full ring ring-app-orange/15 focus:outline-none focus:ring-app-orange/30"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              type="button"
              className="relative p-2 rounded-xl hover:bg-zinc-100 transition-colors"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart"
            >
              <ShoppingCartIcon className="size-5 text-zinc-400" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 size-4 bg-app-orange text-white text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative">
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 p-2"
                    aria-label="Open user menu"
                  >
                    <div className="size-7 rounded-full bg-green-950 text-white flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <ChevronDownIcon className="size-3 text-zinc-500" />
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      />

                      <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50">
                        {/* User Info */}
                        <div className="px-4 py-2 border-b border-app-border">
                          <p className="text-sm font-medium text-zinc-900">
                            {user.name}
                          </p>

                          <p className="text-xs text-zinc-500">{user.email}</p>
                        </div>

                        {/* Menu Items */}
                        <div>
                          <Link
                            to="/orders"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                          >
                            <PackageIcon size={16} />
                            My Orders
                          </Link>

                          <Link
                            to="/addresses"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                          >
                            <PackageIcon size={16} />
                            Addresses
                          </Link>

                          <Link
                            to="/products"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                          >
                            <PackageIcon size={16} />
                            Products
                          </Link>

                          <Link
                            to="/deals"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                          >
                            <PackageIcon size={16} />
                            Deals
                          </Link>

                          {/* Admin Panel */}
                          {user.isAdmin && (
                            <Link
                              to="/admin/products"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-orange-dark hover:bg-orange-50 transition-colors"
                            >
                              <ShieldIcon size={16} />

                              <span>Admin Panel</span>
                            </Link>
                          )}

                          {/* Logout */}
                          <div className="border-t border-app-border pt-1">
                            <button
                              type="button"
                              onClick={handleLogout}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors"
                            >
                              <LogOutIcon size={16} />
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* Desktop Login */}
                  <Link
                    to="/login"
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-900 transition-colors"
                  >
                    <UserIcon size={16} />
                    Sign In
                  </Link>

                  {/* Mobile Menu */}
                  <button
                    type="button"
                    className="md:hidden p-2"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    aria-label="Toggle mobile menu"
                  >
                    {userMenuOpen ? (
                      <XIcon className="size-5" />
                    ) : (
                      <MenuIcon className="size-5" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
