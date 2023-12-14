import React, { useState, useEffect } from "react";
import Image from "next/image";
import SearchIcon from "../app/assets/icons/icons8-search.svg";

export function SearchPools({ projects, onSearch }) {

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const filteredProjects = projects.filter((project) =>
            project.name.toUpperCase().includes(searchQuery.toUpperCase())
        );

        onSearch(filteredProjects);
    }, [searchQuery, projects, onSearch]);


    return (
        <>
            <div className="my-4 flex items-center justify-center">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search projects"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#0f0c29] text-gray-400 px-4 py-2 border border-gray-600 rounded pl-10" 
                    />
                    <Image
                        src={SearchIcon} 
                        alt="Search"
                        className="absolute left-3 top-2 h-6 w-6" 
                        style={{ fill: "#ffffff" }}
                    />
                </div>
            </div>
        </>
    );
}