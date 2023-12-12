"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";

const menuItems = [
  { text: "Features", href: "/features" },
  { text: "About Us", href: "/about-us" },
  { text: "FAQ", href: "/faq" },
];

const MAINNET_RPC_URL =
  "https://mainnet.infura.io/v3/a1cf6dbc78dc40d994ede1ead542d6d5";

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: MAINNET_RPC_URL,
    },
    {
      id: 42161,
      token: "ARB-ETH",
      label: "Arbitrum One",
      rpcUrl: "https://rpc.ankr.com/arbitrum",
    },
  ],
});



export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const desktopLinkStyles =
    "text-gray-200 text-sm hover:bg-gray-600 hover:bg-opacity-30 px-4 py-2 rounded-lg";
  const mobileLinkStyles =
    "text-gray-200 text-sm hover:bg-gray-600 hover:bg-opacity-30 block px-4 py-2 ml-4";

  // Function to handle wallet connection
  const handleConnectWallet = async () => {
    const walletAddress = await connectWallet();
    setConnectedWallet(walletAddress);

    localStorage.setItem("connectedWallet", walletAddress);
  };

  // Async function to connect the wallet
  const connectWallet = async () => {
    const wallets = await onboard.connectWallet();
    console.log(wallets);

    if (wallets[0]) {
      const ethersProvider = new ethers.BrowserProvider(
        wallets[0].provider,
        "any"
      );
      const signer = ethersProvider.getSigner();
      const promiseAddress = (await signer).getAddress();
      const address = await promiseAddress;

      // Truncate the wallet address
      const truncatedAddress = `${address.substring(0, 3)}...${address.slice(
        -2
      )}`;

      return truncatedAddress;
    }

    return null;
  };

  useEffect(() => {
    const storedWallet = localStorage.getItem("connectedWallet");
    if (storedWallet) {
        setConnectedWallet(storedWallet);
    }
}, []);

  return (
    <nav className="border-b border-gray-500">
      <div className="container mx-auto py-4 flex justify-between items-center px-6">
        <Link
          href="/"
          className="text-gray-200 text-lg font-bold flex items-center"
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
            <a
              onClick={handleConnectWallet}
              className={`text-gray-200 text-sm border border-gray-600 px-4 py-2 ml-4 mr-4 rounded-lg cursor-pointer bg-${
                connectedWallet ? "[#006400]" : ""
              }`}
            >
              {connectedWallet ? connectedWallet : "Connect Wallet"}
            </a>
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
                <a
                  onClick={handleConnectWallet}
                  className={`text-gray-200 text-sm border border-gray-600 px-4 py-2 ml-4 mr-4 rounded-lg cursor-pointer bg-${
                    connectedWallet ? "[#006400]" : ""
                  }`}
                >
                  {connectedWallet ? connectedWallet : "Connect Wallet"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
