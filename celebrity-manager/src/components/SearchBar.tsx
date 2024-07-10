import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search celebrities..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
