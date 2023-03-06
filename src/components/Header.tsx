import React from "react";

function Header() {
  return (
    <div className="md:hidden w-screen p-3 flex justify-center gap-2 items-center sticky top-0 bg-white border-b-2 z-10">
      <img
        src={process.env.PUBLIC_URL + "/minimal-logo.png"}
        alt="logo"
        className="h-6 aspect-square rounded "
      />
      <p className="text-xl">wnder</p>
    </div>
  );
}

export default Header;
