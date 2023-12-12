"use client";
import React, { useState } from "react";
import Link from "next/link";

const menuItems = [
  { text: "Features", href: "/features" },
  { text: "About Us", href: "/about-us" },
  { text: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const desktopLinkStyles =
    "text-gray-200 text-sm font-sans hover:bg-gray-600 hover:bg-opacity-30 px-4 py-2 rounded-lg";
  const mobileLinkStyles =
    "text-gray-200 text-sm font-sans hover:bg-gray-600 hover:bg-opacity-30 block px-4 py-2 ml-4";

  return (
    <nav className="border-b border-gray-500">
      <div className="container mx-auto py-4 flex justify-between items-center px-6">
        <Link
          href="/"
          className="text-gray-200 text-lg font-bold font-sans flex items-center"
        >
          <span className="mr-2">🛰️</span>
          <span className="tracking-wide">ModePad</span>
        </Link>

        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-200 hover:bg-gray-600 hover:bg-opacity-30 px-4 py-2 rounded-lg text-lg font-medium flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="hidden lg:flex space-x-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link className={desktopLinkStyles} href={item.href}>
                {item.text}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className="text-gray-200 text-sm border border-gray-600 font-sans px-4 py-2 ml-4 mr-4 rounded-lg"
              href="/register"
            >
              Connect Wallet
            </Link>
          </li>
        </ul>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="container mx-auto py-4">
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link className={mobileLinkStyles} href={item.href}>
                    {item.text}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="border border-gray-600 font-sans text-gray-200 px-4 py-2 ml-4 mr-4 rounded-lg w-full text-center"
                  href="/register"
                >
                  Connect Wallet
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
