"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import TgIcon from "../assets/icons/tg.svg";
import Twitter_X from "../assets/icons/twitter_x.svg";
import LoadingSpinner from "@/components/LoadingSpinner";
import "../../styles/Launchpad.css";
import { SearchPools } from "@/components/SearchPools";
import Pools from "./[id]/page";
import {
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "@/firebase/firebase";
import { Footer } from "@/components/Footer";

export default function Page() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
      const collectionRef = collection(db, "pools");
      const querySnapshot = await getDocs(collectionRef);

      const data = querySnapshot.docs.map((doc) => doc.data());
      console.log(data);
      setFetchedData(data);
      setLoading(false);
      } catch (error) {
        console.log("Error Fetching Data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sortProjects = () => {
      const sortedProjects = [...fetchedData].sort((a, b) => {
        const order = { live: 1, upcoming: 2, ended: 3 };
        return order[a.status] - order[b.status];
      });
      setFilteredProjects(sortedProjects);
    };

    sortProjects();
  }, [fetchedData]);

  const handleSearch = (filteredProjects) => {
    setFilteredProjects(filteredProjects);
    setSearchQuery(""); 
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
          projects={fetchedData}
          onSearch={handleSearch}
          onSort={handleSort}
        />
        {loading ? (
          <LoadingSpinner />
        ) : (
        <div className="px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {filteredProjects.length > 0 ? (
            <>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="relative bg-[#0f0c29] border border-[#blue] p-6 rounded-lg shadow-md flex flex-col py-24 space-y-4"
                onClick={() => setSelectedProject(project)}
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
                  <img
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
                  {`${
                    project.totalInvested +
                    "/" +
                    (
                      parseFloat(project.hardCap.replace(/[^\d.]/g, "")) /
                      parseFloat(project.tokenPrice.replace(/[^\d.]/g, ""))
                    ).toLocaleString()
                  } ${project.name.slice(0, 3).toUpperCase()}`}
                </span>
                <Link
                  href={{
                    pathname: `/launchpad/${project.id}`,
                    query: {
                      name: project.name,
                      image: project.image,
                      status: project.status,
                      twitterLink: project.twitterLink,
                      telegramLink: project.telegramLink,
                      hardCap: project.hardCap,
                      tokenPrice: project.tokenPrice,
                      totalInvested: project.totalInvested,
                      startDate: project.startDate,
                      content: project.content,
                    },
                  }}
                  className="border border-gray-700 px-4 py-2 rounded text-gray-400 block mx-auto text-center"
                >
                  read more
                </Link>
              </div>
            ))} 
            </>
            
          ) : (
            <div className="text-center text-gray-500 font-bold">
              {searchQuery
                ? ""
                : "No pools available at the moment."}
            </div>
          )}
          
        </div> )}
        {selectedProject && <Pools project={selectedProject} />}
      </div> 
      <Footer />
    </>
  );
}
