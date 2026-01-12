"use client";
/*
--- 01 TYPOGRAPHY SYSTEM

- Font sizes (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98


- Spacing system (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
*/
import Image from "next/image";
import { Button } from "./ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4 shadow-md">
        <Image
          className="width-[70px] md:width-[100px]"
          src={"/logo.png"}
          width={70}
          height={70}
          alt="logo"
        />
        <ul className="hidden md:flex gap-14 text-[#039c96] font-bold">
          <li className="hover:bg-[#d0efee] transition-all duration-300 p-2 cursor-pointer">
            Product
          </li>
          <li className="hover:bg-[#d0efee] transition-all duration-300 p-2 cursor-pointer">
            Pricing
          </li>
          <li className="hover:bg-[#d0efee] transition-all duration-300 p-2 cursor-pointer">
            Abput Us
          </li>
          <li className="hover:bg-[#d0efee] transition-all duration-300 p-2 cursor-pointer">
            Contact Us
          </li>
        </ul>
        <div>
          <LoginLink>
            <Button className="bg-[#039c96] mr-3 cursor-pointer">Login</Button>
          </LoginLink>

          <RegisterLink>
            <Button className="bg-[#febf2f] cursor-pointer">Get Started</Button>
          </RegisterLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
