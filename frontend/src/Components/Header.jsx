import { Link, useLocation } from "react-router-dom";
import logo from "../assets/blinkit.png";
import { FaRegCircleUser } from "react-icons/fa6";
import Search from "./Search";
import { useMobile } from "../utils/useMobile";
const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex justify-center flex-col">
      {!(isSearchPage && isMobile) && (
        <div className=" container mx-auto flex items-center px-2 py-2 justify-between">
          {/* logo */}
          <div className=" h-full">
            <Link to={"/"} className="h-full flex items-center">
              <img
                src={logo}
                alt="logo"
                className=" w-32 h-auto hidden lg:block"
              />
              <img src={logo} alt="logo" className=" w-20 lg:hidden" />
            </Link>
          </div>
          {/* Search */}
          <div className=" hidden lg:block">
            <Search />
          </div>
          {/* login and Cart */}
          <div className=" flex">
            <button className=" text-neutral-600 lg:hidden">
              <FaRegCircleUser size={20} />
            </button>
            <div className=" hidden lg:block">Login and my cart</div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
