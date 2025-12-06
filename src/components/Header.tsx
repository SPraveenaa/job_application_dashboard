import type { FC } from "react";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddJob: () => void;
}

const Header: FC<HeaderProps> = ({ searchTerm, setSearchTerm, onAddJob }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
      <h1 className="text-2xl font-bold text-center md:text-left">Job Dashboard</h1>

      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search jobs..."
          className="px-3 py-2 border rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={onAddJob}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add Job
        </button>
      </div>
    </div>
  );
};

export default Header;
