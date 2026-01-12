"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/app/config/firebaseConsole";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

const CreatingMeetingForm = () => {
  const [meetingName, setMeetingName] = useState("");
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMeetingName(e.target.value);
  };
  const onCreateMeeting = async () => {
    if (!user?.email) {
      return;
    }
    await setDoc(doc(db, "Meeting", user?.email), {
      meetingName: meetingName,
      email: user?.email,
      userName: user?.given_name + " " + user?.family_name,
    }).then((res) => {
      console.log(res);
      router.push("/dashboard");
    });
  };
  return (
    <div className="flex flex-col items-center gap-20 my-10">
      <Image src={"/logo.png"} alt="logo-png" width={200} height={200} />
      <div className="flex flex-col items-center max-w-3xl mt-4 gap-4">
        <h2 className="font-bold text-3xl text-[#039c96] ">
          What Your Meeting About
        </h2>
        <p className="text-slate-400 font-bold">Create Your Meeting Here</p>
        <div className="w-full">
          <label className="text-slate-400">Meeting Name</label>
          <Input
            placeholder="Add Your Meeting Here"
            onChange={onInputChange}
            className="mt-4"
          />
        </div>
        <Button
          className="w-full text-white"
          disabled={!meetingName}
          onClick={onCreateMeeting}
        >
          Creating Meeting
        </Button>
      </div>
    </div>
  );
};

export default CreatingMeetingForm;
