import React from "react";

const Banner = ({ title = "📋 This page shows your tasks list" }) => {
  return (
    <div className="bg-blue-100 border border-blue-300 text-blue-800 text-center p-4 rounded-lg shadow-md my-4">
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default Banner;
