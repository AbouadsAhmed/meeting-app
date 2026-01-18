"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  });
  return (
    <div className="text-center mt-20 mx-auto max-w-3xl">
      <h1 className="text-[36px] md:text-[62px] text-[#039c96] ">
        make scheduling effortless
      </h1>
      <p className="text-[24px] text-slate-400">
        our smart scheduling tool helps you find prefect time in seconds
      </p>
      <div className="mt-5 p-5">
        <Button className="bg-[#039c96] mr-3 cursor-pointer">
          Sign in with Google
        </Button>
        <Button className="bg-[#febf2f] cursor-pointer">
          Sign in with Facebook
        </Button>
      </div>
      <hr className="text-slate-400" />
      <h2>
        <Link href={""}>Sign in with Email</Link>
      </h2>
    </div>
  );
};
