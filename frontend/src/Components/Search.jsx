import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useMobile } from "../utils/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation(); //shows current url
  const [isMobile] = useMobile();

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
    <div className=" w-full min-w-[300px] lg:min-w-[430px] h-11 lg:h-12 rounded-lg border p-1 overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-yellow-500">
      <div>
        {isMobile && onSearchPage ? (
          <Link
            to={"/"}
            className=" flex items-center justify-center h-full p-2 m-1 text-neutral-600 group-focus-within:text-yellow-500 bg-white rounded-full"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >
            <FaArrowLeft size={18} />
          </Link>
        ) : (
          <button className=" flex items-center justify-center h-full p-3 text-neutral-600 group-focus-within:text-yellow-500">
            <IoSearch size={23} />
          </button>
        )}
      </div>
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
