import React from "react";
import { useRouter } from "next/navigation"; // Import `next/router` instead of `next/navigation`

export function PoolDetailPage({ project }) {
  // Use `useRouter` from `next/router` instead of `next/navigation`
  const router = useRouter();
  const { id } = project;

  return (
    <>
      <div>
        <h1>Pool Detail Page</h1>
        {/* Display detailed information here */}
        <h1>{project.name} Details</h1>
        <p>Example: id && <p>Project ID: {id}</p> </p>
      </div>
    </>
  );
}
