import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/blinkit.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import Search from "./Search";
import { useMobile } from "../utils/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const isSearchPage = location.pathname === "/search";
  const redirctToLoginPage = () => {
    navigate("/login");
  };
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
            {/* This icon only visible in Mobile version */}
            <button className=" text-neutral-600 lg:hidden">
              <FaRegCircleUser size={20} />
            </button>
            {/* For Desktop version */}
            <div className=" hidden lg:flex items-center gap-10">
              <button onClick={redirctToLoginPage} className=" text-lg px-2">
                Login
              </button>
              <button className=" flex items-center gap-2 bg-[#0C831F] rounded-md text-white px-2 py-0.5 font-semibold">
                <div>
                  <IoCartOutline size={28} className=" cart-icon" />
                </div>
                <div>
                  <p className=" text-semibold">My Cart</p>
                  {/* <p className=" text-sm"> ₹100</p> */}
                </div>
              </button>
            </div>
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
