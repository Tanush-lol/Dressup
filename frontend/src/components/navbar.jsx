import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Collection", path: "/collection" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex items-center justify-between py-5">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-grey-700">
        {menuLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-1"
          >
            <p className="nixie-one-regular">{item.label}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        />

        {/* Auth Section */}
        {token ? (
          // Logged-in user dropdown
          <div className="group relative">
            <img
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="user"
            />

            <div className="hidden group-hover:block absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-gray-50 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Not logged in → Show login button
          <button
            onClick={() => navigate("/login")}
            className="text-sm border border-gray-700 px-3 py-1 rounded hover:bg-gray-100"
          >
            Login
          </button>
        )}

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 cursor-pointer"
            alt="cart"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Menu Icon (Mobile) */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden mr-4"
          alt="menu"
        />
      </div>

      {/* Sidebar Menu (Mobile) */}
      <div
        className={`absolute top-0 right-0 bottom-0 bg-white transition-all overflow-hidden ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="w-3" alt="back" />
            <p>Back</p>
          </div>

          {menuLinks.map((item) => (
            <NavLink
              key={item.path}
              onClick={() => setVisible(false)}
              className="py-2 pl-6 m-1"
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}

          {/* Login for mobile */}
          {!token && (
            <button
              onClick={() => {
                setVisible(false);
                navigate("/login");
              }}
              className="py-2 pl-6 m-1 text-left text-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
