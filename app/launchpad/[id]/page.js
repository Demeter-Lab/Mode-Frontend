"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../../../styles/ProjectStyle.css";
import Image from "next/image";
import ModeLogo from "../../assets/images/Mode.JPG";
import Twitter_X from "../../assets/icons/twitter_x.svg";
import TgIcon from "../../assets/icons/tg.svg";
import JoinPool from "@/components/JoinPool";
import { ethers, N } from "ethers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* 


*/

export default function Pools() {
  const router = useRouter();
  const { id } = router;

  const [isConnected, setIsConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");

  const [signer, setSigner] = useState({});

  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const status = searchParams.get("status");
  const twitterLink = searchParams.get("twitterLink");
  const telegramLink = searchParams.get("telegramLink");
  const hardCap = searchParams.get("hardCap");
  const tokenPrice = searchParams.get("tokenPrice");
  const totalInvested = searchParams.get("totalInvested");
  const startDate = searchParams.get("startDate");
  const content = searchParams.get("content");

  /* console.log({
    name,
    status,
    twitterLink,
    telegramLink,
    hardCap,
    tokenPrice,
    totalInvested,
    startDate,
    content,
  }); */
  // const { name, status } = props.project;
  // console.log('Name & Status', project);

  const connectWallet = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const truncatedAddress = `${address.substring(0, 3)}...${address.slice(
      -2
    )}`;
    setSigner(signer);
    setIsConnected(true);
    setConnectedAddress(truncatedAddress);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-200">
          Launchpad Details Page
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0f0c29] shadow-md rounded-lg py-4">
            <div className="container mx-auto flex flex-col items-center">
              <div className="flex items-center">
                <img
                  src={searchParams.get("image")}
                  alt="image"
                  className="w-16 h-16 rounded-full mx-2 border-2 border-[white]"
                />
                <div className="block pl-6">
                  <h2 className="text-lg text-gray-200 projectName">{name}</h2>
                  <p className="text-sm font-medium text-gray-500">
                    {name && name.slice(0, 3)} / USDT
                  </p>
                </div>
              </div>

              <div className="block mt-8">
                <button
                  className="bg-[#0f0c29] border border-gray-600 text-sm text-white px-4 py-2 rounded"
                  onClick={connectWallet}
                >
                  {isConnected ? connectedAddress : "Connect Wallet"}
                </button>
              </div>
            </div>
            {isConnected ? <JoinPool /> : ""}

            <div className="p-6 price-styling">
              <h2>
                1 USDT = {(1 / parseFloat(tokenPrice)).toFixed(2)}{" "}
                {name && name.slice(0, 3)}
              </h2>
              <h2>
                1 {name && name.slice(0, 3)} = {tokenPrice}{" "}
              </h2>
            </div>

            {hardCap && tokenPrice && (
              <div className="mt-8 bg-gray-300 h-7 w-90% rounded-lg relative mx-4">
                <div
                  className="bg-green-500 h-full rounded-lg"
                  style={{
                    width: `${(totalInvested / hardCap) * 100}%`,
                  }}
                ></div>

                <span className="absolute inset-0 flex items-center justify-center text-gray-800 font-bold">
                  {(totalInvested / hardCap) * 100}%
                </span>
              </div>
            )}

            <span className="block text-right text-gray-500 font-light text-sm mx-5">
              {`${
                totalInvested +
                "/" +
                (hardCap && tokenPrice
                  ? parseFloat(hardCap.replace(/[^\d.]/g, "")) /
                    parseFloat(tokenPrice.replace(/[^\d.]/g, ""))
                  : "N/A"
                ).toLocaleString()
              } ${name && name.slice(0, 3).toUpperCase()}`}
            </span>

            <div className="block p-6 text-center mt-4">
              <span className="text-sm font-medium text-gray-400">
                Tokens are sent instantly upon joining the pool.
              </span>
              <br />
              <span className="text-sm font-medium text-gray-400">
                Anticipate Token Lock Feature Alongside Dev Mainnet Launch
              </span>
            </div>
          </div>

          <div className="bg-[#0f0c29] shadow-md rounded-lg p-6">
            <div className="container mx-auto flex flex-col ">
              <div className="flex mt-4">
                <img
                  src={searchParams.get("image")}
                  alt="image"
                  className="w-10 h-10 rounded-full mx-2 border-2 border-[white]"
                />
                <div className="pl-6">
                  <h2 className="text-lg text-gray-200 projectName-second">
                    {name}
                  </h2>
                  <p className="text-sm font-bold text-gray-500">USDT</p>
                </div>
                <div className="ml-auto">
                  <Image
                    src={ModeLogo}
                    alt="mode blockchain"
                    className="w-14 h-14"
                  />
                </div>
              </div>
              <div className="text-gray-400 mt-4 contentStyle">
                <p>{content}</p>
              </div>
              <div className="flex mt-6">
                <a href={twitterLink} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={Twitter_X}
                    alt="Twitter"
                    className="w-8 h-8 social-icon"
                  />
                </a>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4"
                >
                  <Image
                    src={TgIcon}
                    alt="Telegram"
                    className="w-8 h-8 social-icon"
                  />
                </a>
              </div>
              <div className="poolDetails">
                <h2 className="poolDetails-header mt-8">Pool Details</h2>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <p className="text-gray-400 font-light">Hard Cap</p>
                    <p className="text-gray-400 font-light mt-4">Start Date</p>
                    <p className="text-gray-400 font-light mt-4">End Date</p>
                    <p className="text-gray-400 font-light mt-4">Swap Rate</p>
                  </div>

                  <div>
                    <p className="text-[#6A0DAD] font-bold">${hardCap}</p>
                    <p className="text-gray-400 font-bold mt-4">{startDate}</p>
                    <p className="text-gray-400 font-bold mt-4">TBA</p>
                    <p className="text-gray-400 font-bold mt-4">
                      1 {name && name.slice(0, 3).toUpperCase()} ={" "}
                      <span className="text-green-500">{tokenPrice}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="poolDetails">
                <h2 className="poolDetails-header mt-8">Token Details</h2>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <p className="text-gray-400 font-light">Token Name:</p>
                    <p className="text-gray-400 font-light mt-4">
                      Total Supply:{" "}
                    </p>
                    <p className="text-gray-400 font-light mt-4">
                      Initial Supply
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 font-bold">{name}</p>
                    <p className="text-gray-400 font-bold mt-4">
                      1 000 000 000
                    </p>
                    <p className="text-gray-400 font-bold mt-4">5 490 000 </p>
                  </div>
                </div>
              </div>
              <div className="block p-6 text-center mt-4">
                <span className="text-sm font-medium text-gray-400">
                  Tokens are sent instantly upon joining the pool.
                </span>
                <br />
                <span className="text-sm font-medium text-gray-400">
                  Anticipate Token Lock Feature Alongside Dev Mainnet Launch
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
