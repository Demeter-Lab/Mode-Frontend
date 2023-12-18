"use client";
import React from "react"
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";

/* 


*/

export default function Pools() {

    const router = useParams();
    const { id } = router;

    const searchParams = useSearchParams();


    // const { name, status } = props.project;
    // console.log('Name & Status', project);




  return (
    <div>
      <h1>Launchpad Details Page</h1>
      <h2>{searchParams.get("name")}</h2>
      <img src={searchParams.get("image")} fill="true" alt="image" className="w-12 h-12" />
      <p>Example: id && Project ID: {id} </p>
    </div>
  );
}