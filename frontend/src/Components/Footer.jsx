import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" border-t">
      <div className=" container mx-auto p-4 text-center flex flex-col gap-2 lg:flex-row lg:justify-between">
        <p>© All rights reserved 2025</p>
        <div className=" flex items-center gap-4 justify-center text-2xl">
          <a href="https://www.facebook.com">
            <FaFacebookSquare color=" #316FF6" />
          </a>
          <a href="https://www.instagram.com">
            <FaInstagramSquare color="#E1306C" />
          </a>
          <a href="https://www.linkedin.com">
            <FaLinkedin color="#0077B5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
