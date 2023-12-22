import Image from "next/image";
import Link from "next/link";
import AboutImage from "../app/assets/images/Mode-Launchpad.png";

export function AboutUs() {
  return (
    <div
      className="container mx-auto py-8 flex flex-col lg:flex-row items-center"
      id="about-us"
    >
      <div className="container mx-auto px-4 lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
        <h1 className="text-4xl font-bold mb-4 text-gray-200">
          ...the First IDO Launchpad Built On The Mode Blockchain
        </h1>
        <p className="text-gray-400">Join the best GameFi, AI & DeFi IDOs</p>
        <p className="text-gray-400 mb-4">
          ModePad is where you can access the best new tokens before they are
          listed on other centralized or decentralized exchanges. It is a
          decentralized fundraising platform that enables projects to raise
          capital and ensures the safety of early-stage participants.
        </p>
        <div className="flex space-x-4 mb-8">
          <Link href="https://bridge.mode.network/" className="blue-button">
            Bridge ETH(mode)
          </Link>

          <a
            href="/launchpad"
            className="border border-gray-500 text-gray-300 px-4 py-2 rounded-lg relative overflow-hidden gradient-button"
          >
            Launch App
          </a>
        </div>
      </div>

      <div className="lg:w-1/2">
        <Image
          src={AboutImage}
          alt="About Us"
          loading="lazy"
          className="w-full p-2 lg:w-auto"
        />
      </div>
    </div>
  );
}
