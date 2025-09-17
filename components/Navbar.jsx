import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-24 py-4 border-b border-secondary bg-white  shadow-md">
      <Link href={"/"}>
        <h1 className="text-blue-500 text-2xl font-semibold">DTM</h1>
      </Link>
      <div className="capitalize font-medium text-gray-800 items-center gap-3 flex">
        <NavLink href={"/"}>Home</NavLink>
        <NavLink href={"/add-task"}>Add-Task</NavLink>
      </div>
      <Button>Logout</Button>
    </nav>
  );
};

export default Navbar;
