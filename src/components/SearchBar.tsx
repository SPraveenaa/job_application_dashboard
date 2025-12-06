import type { ChangeEvent } from "react";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

const SearchBar = ({ query, onQueryChange }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by title or company..."
        className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default SearchBar;
