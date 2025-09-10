import React from 'react';
import { Search, Filter } from 'lucide-react';

const SortAndSearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  sortBy, 
  setSortBy 
}) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products by name..."
          className="input-field pl-10"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Filter className="h-4 w-4 text-gray-400" />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field pl-10 pr-8 appearance-none bg-white min-w-[200px]"
        >
          <option value="">Sort by...</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
          <option value="category">Category</option>
        </select>
      </div>
    </div>
  );
};

export default SortAndSearchBar;