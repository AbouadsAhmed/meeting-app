"use client";
import { Button } from "@/components/ui/button";
import { menu } from "@/data";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideNavbar = () => {
  const path = usePathname();
  const [currentpath, setCurrentPath] = useState(path);
  useEffect(() => {
    setCurrentPath(path);
  }, [path]);
  return (
    <div className="p-5 py-15">
      <div className="flex flex-col items-center">
        <Image src={"/logo.png"} alt="logo-photo" width={150} height={150} />
      </div>
      <Link href={"/create-meeting"}>
        <Button className="mt-5 w-full flex  items-center text-white gap-2">
          <Plus /> Create
        </Button>
      </Link>
      <div>
        {menu.map((item) => (
          <Link key={item.id} href={item.path}>
            <Button
              className={`w-full gap-4 mt-4 bg-transparent border border-[#febf30] hover:bg-[#febf30] text-black ${
                currentpath === item.path && "bg-[#febf30]"
              }`}
            >
              <item.icon />
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavbar;
