"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../../../styles/ProjectStyle.module.css";
import Image from "next/image";

/* 


*/

export default function Pools() {
  const router = useRouter();
  const { id } = router;

  const searchParams = useSearchParams();

  const name = searchParams.get("name");

  // const { name, status } = props.project;
  // console.log('Name & Status', project);

  return (
    <>
      <div className="container mx-auto mt-8 p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-200">
          Launchpad Details Page
        </h1>
        <div className="flex space-x-6">
          <div className="bg-[#0f0c29] w-2/4 shadow-md flex items-center rounded-lg">
            <img
              src={searchParams.get("image")}
              alt="image"
              className="w-16 h-16 mb-4 rounded-full"
            />
            <div className="block pl-6">
              <h2 className="text-lg font-bold text-gray-200">{name}</h2>
              <p className="text-sm text-gray-400">
                {name && name.slice(0, 3)} / USDT
              </p>
            </div>
          </div>
          <div className="bg-[#0f0c29] w-2/4 shadow-md rounded-lg">
            {/* Right Column Content */}
            <p>This is the right column</p>
          </div>
        </div>
      </div>
    </>
  );
}
