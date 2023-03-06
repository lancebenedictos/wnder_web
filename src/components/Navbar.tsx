import React, { useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiSearchAlt2, BiMessageSquareDots } from "react-icons/bi";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { RiNotification2Line } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    // fixed bottom-0
    <nav className="bg-green-500 overflow-hidden  w-full h-full z-10">
      <div className="container mx-auto p-3 flex md:flex-col justify-around md:items-center lg:items-start">
        <header className="gap-2 p-1 hidden md:flex ">
          <img
            src={process.env.PUBLIC_URL + "/minimal-logo.png"}
            alt="logo"
            className="h-6 aspect-square rounded "
          />
          <p className="text-xl hidden lg:block text-white">wnder</p>
        </header>

        <Link className="flex w-full gap-2 md:mt-9 p-1 md:p-3" to="home">
          <AiOutlineHome className="h-6 w-6 rounded text-white" />
          <p className="text-xl hidden lg:block text-white">Home</p>
        </Link>

        <Link className="flex w-full gap-2 p-1 md:p-3 " to="search">
          <BiSearchAlt2 className="h-6 w-6 rounded text-white " />
          <p className="text-xl hidden lg:block text-white">Search</p>
        </Link>

        <Link className="flex w-full gap-2 p-1 md:p-3 " to="plan">
          <BsFillCalendarCheckFill className="h-6 w-6 rounded text-white" />
          <p className="text-xl hidden lg:block text-white">Plan</p>
        </Link>

        <Link className="flex w-full gap-2  p-1 md:p-3 " to="messages">
          <BiMessageSquareDots className="h-6 w-6 rounded text-white" />
          <p className="text-xl hidden lg:block text-white">Messages</p>
        </Link>

        <Link className="flex w-full gap-2 p-1 md:p-3 " to="notifications">
          <RiNotification2Line className="h-6 w-6 rounded text-white" />
          <p className="text-xl hidden lg:block text-white">Notifications</p>
        </Link>

        <Link className="flex w-full gap-2 p-1 md:p-3 " to="account">
          <MdOutlineAccountCircle className="h-6 w-6 rounded text-white" />
          <p className="text-xl hidden lg:block text-white">Account</p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
