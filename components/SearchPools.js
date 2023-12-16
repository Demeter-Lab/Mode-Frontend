import React, { useState, useEffect } from "react";
import Image from "next/image";
import SearchIcon from "../app/assets/icons/icons8-search.svg";

export function SearchPools({ projects, onSearch, onSort }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    const filteredProjects = projects.filter((project) =>
      project.name.toUpperCase().includes(searchQuery.toUpperCase())
    );

    if (JSON.stringify(filteredProjects) !== JSON.stringify(filteredProjects)) {
      onSearch(filteredProjects);
    }
  }, [searchQuery, projects, onSearch]);

  const handleSort = (status) => {
    const sortedProjects = projects.filter(
      (project) => project.status === status
    );
    onSort(sortedProjects);
    setSelectedStatus(status);
  };

  return (
    <>
      <div className="my-4 flex items-center justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0f0c29] text-gray-400 px-12 py-2 border border-[#0f0c29] rounded-lg pl-10"
          />
          <Image
            src={SearchIcon}
            alt="Search"
            className="absolute left-3 top-2 h-6 w-6"
            style={{ fill: "#ffffff" }}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        {["live", "upcoming", "ended"].map((status) => (
          <button
            key={status}
            className={`border border-gray-600 text-gray-400 px-4 py-2 rounded-lg ${
              selectedStatus === status ? "bg-[#0f0c29]  text-white" : ""
            }`}
            onClick={() => handleSort(status)}
          >
            {status === "upcoming" && "Upcoming"}
            {status === "ended" && "Ended"}
            {status === "live" && "Ongoing"}
          </button>
        ))}
      </div>
    </>
  );
}
