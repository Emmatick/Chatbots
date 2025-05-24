import React from "react";
import Logo from "../Logo";
import { AiOutlinePhone } from "react-icons/ai";
import { AiFillCamera } from "react-icons/ai";
const Header = () => {
  return (
    <div>
      <div className="container text-center mx-auto bg:dark-background sticky top-0 z-[20] flex w-full items center justify-between border-b border-gray-500 ps-8">
        <Logo />
        {/* Navbar Right Section */}
        <div className="flex justify-between items-center gap-4">
          {/*Search Bar section */}
          <div className="relative group hidden sm:block">
            <AiOutlinePhone className=" text-xl text-gray-600 dark:text-gray-400  duration-200" />
          </div>
          {/* Order-button section */}
          <button className="relative p-3">
            <AiFillCamera className="text-xl text-gray-600 dark:text-gray-400" />
            <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
              4
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
