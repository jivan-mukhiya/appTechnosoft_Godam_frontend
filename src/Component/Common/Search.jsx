/* eslint-disable react/prop-types */
import { IoSearch } from "react-icons/io5";

function Search({ search, setSearch, name, className, placeholder, buttonStyle }) {
  return (
   
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-1.5">
        <input
          type="text"
          placeholder={placeholder}
          aria-label="Search"
          className={className}
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state
        />
        <button
          type="submit"
          className={buttonStyle}
        >
          <IoSearch className="text-xl" />
          <span className="ml-2">{name}</span>
        </button>
      </form>
   
  );
}

export default Search;
