import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex justify-center m-4 p-4">
      HomePage
      <button className="bg-amber-200 rounded-3xl p-3 m-3 text-9xl">
        <Link href="/admin/">Admins</Link>
      </button>
    </div>
  );
};

export default HomePage;
