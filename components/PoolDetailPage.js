import React from "react";
import { useRouter } from "next/navigation"; 
export function PoolDetailPage({ project }) {
  const router = useRouter();
  const { id } = project;

  return (
    <>
      <div>
        <h1>Pool Detail Page</h1>
        <h1>{project.name} Details</h1>
        <p>Example: id && <p>Project ID: {id}</p> </p>
      </div>
    </>
  );
}
