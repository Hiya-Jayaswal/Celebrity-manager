import React, { useState } from 'react';
import CelebrityList from './components/CelebrityList';
import SearchBar from './components/SearchBar';
import celebritiesData from './data/celebrities.json';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCelebrities = celebritiesData.filter((celebrity) =>
    `${celebrity.first} ${celebrity.last}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Celebrity Manager</h1>
      <SearchBar onSearch={handleSearch} />
      <CelebrityList celebrities={filteredCelebrities} />
    </div>
  );
};

export default App;
