"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const UserHeader = () => {
  const { user } = useKindeBrowserClient();
  return (
    user && (
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center float-right p-4 ">
            {" "}
            <Image
              src={user?.picture ?? ""}
              alt="profile-photo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <LogoutLink>Log out</LogoutLink>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  );
};

export default UserHeader;
