import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation(); //shows current url

  const [onSearchPage, setOnSearchPage] = useState(false);

  useEffect(() => {
    const onSearch = location.pathname === "/search";
    setOnSearchPage(onSearch);
  }, [location]); //When location is change useEffect will run every time thats why [location] dependency is used.

  console.log("search", onSearchPage);
  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <div className=" w-full min-w-[300px] lg:min-w-[430px] h-9 lg:h-10 rounded-lg border p-1 overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-yellow-500">
      <button className=" flex items-center justify-center h-full p-3 text-neutral-600 group-focus-within:text-yellow-500">
        <IoSearch size={23} />
      </button>
      <div className=" w-full h-full flex items-center">
        {!onSearchPage ? (
          //Not inside search page
          <div onClick={handleSearch}>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000,
                'Search "bread"',
                1000,
                'Search "suger"',
                1000,
                'Search "paneer"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
                1000,
                'Search "curd"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //Inside search page
          <div className=" w-full h-full">
            <input
              className=" bg-transparent w-full h-full outline-none"
              type="text"
              placeholder="Search for items"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
