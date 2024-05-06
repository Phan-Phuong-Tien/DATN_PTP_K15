import React from "react";

const SearchHeading = ({ children }) => {
  return (
    <div className="flex items-start justify-between p-4">
      <h2 className="text-xl font-bold">Gần đây</h2>
      {children}
    </div>
  );
};

export default SearchHeading;
