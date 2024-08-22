import React from "react";
import { Button } from "./ui/button";
import ThemeSwitch from "./ThemeSwitch";
import { Bird, Github } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

function NavBar() {
  return (
    <div className="flex absolute w-full justify-center">
      <div className="flex max-w-[900px] w-full justify-between items-center p-2 border-b-2">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">zefi</h1>
          <Bird className="h-[30px] w-[30px]" />
        </div>
        <div className="flex gap-6">
          <Link href="https://github.com/zenithexe/zefi" passHref={true}>
            <FaGithub className="w-6 h-6 cursor-pointer"/>
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
