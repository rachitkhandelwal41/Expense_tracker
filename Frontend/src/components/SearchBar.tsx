import React from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search by description or notes"
      className="bg-black border border-white px-3 py-1 rounded text-white w-full"
    />
  );
};

export default SearchBar;
