"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import animalialogo from "../assets/images/animalialogo.jpg";
import axesmetaverse from "../assets/images/axesmetaverse.jpg";
import ivendpay from "../assets/images/ivendpay.jpg";
import lifetise from "../assets/images/lifetise.png";
import metaclash from "../assets/images/metaclash.jpg";
import scriptnetwork from "../assets/images/scriptnetwork.jpg";
import TgIcon from "../assets/icons/tg.svg";
import Twitter_X from "../assets/icons/twitter_x.svg";
import "../../styles/Launchpad.css";
import { SearchPools } from "@/components/SearchPools";
import { PoolDetailPage } from "@/components/PoolDetailPage";

const projectsData = [
  {
    id: 1,
    name: "ANIMALIA",
    image: animalialogo,
    status: "live",
    twitterLink: "https://x.com",
    telegramLink: "https://t.me/",
    hardCap: "100011",
    tokenPrice: "0.5 USDT",
    totalInvested: "30003.3",
    startDate: "2023-12-01",
    width: "30%",
    content:
      "Animalia is an independent free-to-play online NFT trading card game featuring crypto-inspired meme creatures and gemstones. Powered by the BNB Chain, Animalia gives you complete ownership over your in-game collectibles. Collect rare cards, create your own NFTs, build your deck, battle with other players and sell cards to other traders.",
  },
  {
    id: 2,
    name: "AXESMETAVERSE",
    image: axesmetaverse,
    status: "upcoming",
    twitterLink: "https://x.com",
    telegramLink: "https://t.me/",
    hardCap: "237500",
    tokenPrice: "0.05 USDT",
    totalInvested: "0",
    startDate: "TBA",
    width: "0%",
    content:
      "Axes metaverse is a cascade of games that grew out of the blockchain version of Axes.io, which turned into one of our key worlds - Axes Battleground. In all games of the meta universe you can use the same NFTs and make in-game purchases for AXES Shards exactly as well as earning them for activities. Tied to the same universe, all Axes Metaverse games will share a common economy. Player resources earned in one game can be used in another. Train a hero in one game, and then send them to another? Easy! This is one world.",
  },
  {
    id: 3,
    name: "IVENDPAY",
    image: ivendpay,
    status: "ended",
    twitterLink: "https://x.com",
    telegramLink: "https://t.me/",
    hardCap: "142501",
    tokenPrice: "0.9 USDT",
    totalInvested: "142501",
    startDate: "2023-06-15",
    width: "100%",
    content:
      "ivendPay is an international payment service that allows businesses to accept cryptocurrency payments through point-of-sale (POS) terminals, mobile apps, e-commerce platforms, API, and vending machines. Currently, the service operates in seven countries with some 400 active merchants, and the number of new sales points continues to grow weekly. ivendPay is already one of the EU's largest cryptocurrency payment providers in vending and retail systems. IVPAY is a utility token of the ivendPay ecosystem. It was created to ensure a smooth transfer of value across the whole ecosystem. The token will be integrated into the services and products as payment, reward, and discount means.",
  },
  {
    id: 4,
    name: "Lifetise",
    image: lifetise,
    status: "upcoming",
    twitterLink: "https://x.com",
    telegramLink: "https://t.me/",
    hardCap: "190001",
    tokenPrice: "0.03 USDT",
    totalInvested: "0",
    startDate: "TBA",
    width: "0%",
    content:
      "Lifetise is the first fintech metaverse, a virtual world where people can plan their lives and visualise how to afford major goals (owning a home, starting a business, marriage, kids, retirement, etc). With Lifetise you create the life you want and we show you how to achieve it in real life. Your financial life is reimagined as a series of interconnected puzzles and visualisations, complex life decisions are broken down into step-by-step actions. As you progress towards your goals, you earn LIFE tokens that can be staked to earn higher APY as you progress further and ultimately earn more money to achieve your goals quicker. Play-to-earn becomes Earn-for-LIFE! Imagine feeling so confident about every decision you make in life. Knowing that you can play out different future outcomes before you commit. That's what Lifetise promises.",
  },
  {
    id: 5,
    name: "MetaClash",
    image: metaclash,
    status: "upcoming",
    twitterLink: "https://x.com",
    telegramLink: "https://t.me/",
    hardCap: "200000",
    tokenPrice: "0.00075 USDT",
    totalInvested: "0",
    startDate: "TBA",
    width: "0%",
    content:
      "MetaClash is a blockchain game built on Unreal Engine to create a hyper-realistic science fantasy Metaverse. MetaClash has developed an innovative new approach to NFT based games. To create a secure ecosystem of DAOs and Tokens, MetaClash uses blockchain technology to provide a seamless play and earn gaming experience for players. MetaClash shall construct a digital world for the community, and by the community. It will be an entire ecosystem of play and earn games, realistic visual event grounds, and ever-evolving entertainment. Fully decentralized DAOs will govern the ecosystem, which rewards users based on their skills, effort, and contributions",
  },
  {
    id: 6,
    name: "Script Network",
    image: scriptnetwork,
    status: "live",
    twitterLink: "https://x.com",
    telegramLink: "https://t.me/",
    hardCap: "250000",
    tokenPrice: "0.9 USDT",
    totalInvested: "25000",
    startDate: "2023-12-14",
    width: "10%",
    content:
      "Script TV is a decentralized video delivery network that furnishes an expansive range of blockchain-enabled solutions to the problems related to the traditional video-streaming sector. The platform offers high-quality video streaming as well as multiple incentive mechanisms for decentralized bandwidth and content-sharing at a reduced cost as compared to conventional service providers. Script Network allows users to simultaneously watch video content and earn token rewards for relaying video to other users who are also watching the same content.",
  },
];

export default function Page() {

  const router = useRouter();

  const [selectedProject, setSelectedProject] = useState(null);

  const [filteredProjects, setFilteredProjects] = useState(() => {
    const sortedProjects = [...projectsData].sort((a, b) => {
      const order = { live: 1, upcoming: 2, ended: 3 };
      return order[a.status] - order[b.status];
    });
    return sortedProjects;
  });

  const handleSearch = (filteredProjects) => {
    setFilteredProjects(filteredProjects);
  };

  const handleSort = (sortedProjects) => {
    setFilteredProjects(sortedProjects);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <SearchPools
          projects={projectsData}
          onSearch={handleSearch}
          onSort={handleSort}
        />
        <div className="px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="relative bg-[#0f0c29] border border-[#blue] p-6 rounded-lg shadow-md flex flex-col py-24 space-y-4"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 mt-4">
                <button
                  className={`${
                    project.status === "live"
                      ? "bg-green-600"
                      : project.status === "upcoming"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  } text-gray-200 px-4 py-2 rounded`}
                >
                  {project.status}
                </button>
              </div>

              <div className="flex items-center">
                <h2 className="text-white font-bold mr-14 justify-start">
                  {project.name}
                </h2>
                <Image
                  src={project.image}
                  alt={project.name}
                  className="w-12 h-12 border border-gray-200 rounded-full ml-auto"
                />
              </div>

              <div className="flex mt-2 social-icons-container">
                <a
                  href={project.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4"
                >
                  <Image
                    src={Twitter_X}
                    alt="Twitter"
                    className="w-6 h-6 social-icon"
                  />
                </a>
                <a
                  href={project.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4"
                >
                  <Image
                    src={TgIcon}
                    alt="Telegram"
                    className="w-6 h-6 social-icon"
                  />
                </a>
              </div>

              <p className="text-gray-500">
                {truncateText(project.content, 150)}
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <p className="text-gray-400 font-light">Total Raise</p>
                  <p className="text-gray-400 font-light mt-4">Starts</p>
                  <p className="text-gray-400 font-light mt-4">Price</p>
                </div>

                <div>
                  <p className="text-[#6A0DAD] font-bold">${project.hardCap}</p>
                  <p className="text-gray-400 font-bold mt-4">
                    {project.startDate}
                  </p>
                  <p className="text-gray-400 font-bold mt-4">
                    1 {project.name.slice(0, 3).toUpperCase()} ={" "}
                    <span className="text-green-500">{project.tokenPrice}</span>
                  </p>
                </div>
              </div>
              <div className="mt-6 bg-gray-300 h-8 w-full rounded-lg relative">
                <div
                  className="bg-green-500 h-full rounded-lg"
                  style={{
                    width: `${
                      (project.totalInvested / project.hardCap) * 100
                    }%`,
                  }}
                ></div>

                <span className="absolute inset-0 flex items-center justify-center text-gray-800 font-bold">
                  {(project.totalInvested / project.hardCap) * 100}%
                </span>
              </div>
              <span className="block text-right text-gray-500 font-light text-sm">
                {`${project.totalInvested + "/" + (
                  parseFloat(project.hardCap.replace(/[^\d.]/g, "")) /
                  parseFloat(project.tokenPrice.replace(/[^\d.]/g, ""))
                ).toLocaleString()} ${project.name.slice(0, 3).toUpperCase()}`}
              </span>
              <button onClick={() => router.push(`/launchpad/${project.id}`)}>
  View Details
</button>

            </div>
          ))}
        </div>
        {selectedProject && (
        <PoolDetailPage project={selectedProject} />
      )}
      </div>
    </>
  );
}
