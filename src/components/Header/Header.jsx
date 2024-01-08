import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-slate-900">
      <Container>
        <nav className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center">
            <Link to="/">
              <Logo width="70px" className="text-white" />
            </Link>
          </div>

          <div className="hidden md:flex flex-grow justify-center">
            <ul className="flex space-x-20 gap-6 justify-center items-center">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name} className="py-2">
                      <button
                        onClick={() => navigate(item.slug)}
                        className="text-white hover:text-yellow-300 transition duration-200"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Menu - Aligned to End */}
          <div className="flex items-center md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Items */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col items-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="py-2">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(item.slug);
                      }}
                      className="text-white hover:text-yellow-300 transition duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;
