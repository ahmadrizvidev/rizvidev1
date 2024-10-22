import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Get the router instance

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to determine if the link is active
  const isActive = (path) => {
    return router.pathname === path ? 'text-[#f5c729]' : 'text-white'; // Set color based on active state
  };

  return (
    <header className="mybg text-white body-font">
      <div className="container mx-auto flex flex-wrap p-3 flex-row items-center justify-between">
        <Link href="/" className="flex title-font font-medium items-center mylogo md:mb-0">
          <h1>Rizvi</h1>
          <span className="ml-1">Dev</span>
        </Link>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        {/* Navigation links for larger screens */}
        <nav className="hidden md:flex md:ml-auto flex-wrap items-center text-base justify-center">
          <Link href="/" className={`mr-5 hover:text-[#f5c729] ${isActive('/')}`}>
            Home
          </Link>
          <Link href="/services" className={`mr-5 hover:text-[#f5c729] ${isActive('/services')}`}>
            Services
          </Link>
          <Link href="/portfolio" className={`mr-5 hover:text-[#f5c729] ${isActive('/portfolio')}`}>
            Portfolio
          </Link>
          <Link href="/blog" className={`mr-5 hover:text-[#f5c729] ${isActive('/blog')}`}>
            Blog
          </Link>
          <Link href="/contact" className={`mr-5 hover:text-[#f5c729] ${isActive('/contact')}`}>
            Contact
          </Link>
        </nav>
        {/* Background overlay for small devices */}
        <div
          className={`z-30 fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } md:hidden`}
          onClick={toggleMenu}
        />
        {/* Side-drawer menu for smaller screens */}
        <nav
          className={`z-30 fixed top-0 left-0 h-full w-64 mybg shadow-md transform transition-transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden`}
        >
          <div className="flex flex-col p-5">
            <button
              className="self-end mb-4 text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <Link href="/" className={`mr-5 hover:text-[#f5c729] ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/about" className={`mr-5 hover:text-[#f5c729] ${isActive('/about')}`}>
              About
            </Link>
            <Link href="/services" className={`mr-5 hover:text-[#f5c729] ${isActive('/services')}`}>
              Services
            </Link>
            <Link href="/portfolio" className={`mr-5 hover:text-[#f5c729] ${isActive('/portfolio')}`}>
              Portfolio
            </Link>
            <Link href="/blog" className={`mr-5 hover:text-[#f5c729] ${isActive('/blog')}`}>
              Blog
            </Link>
            <Link href="/contact" className={`mr-5 hover:text-[#f5c729] ${isActive('/contact')}`}>
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
