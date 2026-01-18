"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { programs } from "@/data";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FormValue } from "@/interfaces";
import { app } from "@/app/config/firebaseConsole";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type MeetingFromProps = {
  setFormValue: React.Dispatch<React.SetStateAction<FormValue | null>>;
};
const MeetingFrom = ({ setFormValue }: MeetingFromProps) => {
  const [program, setProgram] = useState("");
  const [meeting, setMeeting] = useState("");
  const [duration, setDuration] = useState(30);
  const [programUrl, setProgramUrl] = useState("");
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    setFormValue({
      program,
      meeting,
      duration,
      programUrl,
    });
  }, [program, meeting, duration, programUrl, setFormValue]);
  const onCreateMeeting = async () => {
    if (!user?.email) {
      console.log("No user email available");
      return;
    }
    const date = Date.now().toString();
    await setDoc(doc(db, "Event", date), {
      program,
      meeting,
      duration,
      programUrl,
      meetingId: doc(db, "Meeting", user?.email),
      createdBy: user?.email,
      id: date,
    }).then((res) => {
      toast("new meeting aded!");
      router.push("/dashboard/meeting-type");
    });
  };
  return (
    <div className="p-4">
      <h1 className="flex gap-2 cursor-pointer">
        <ChevronLeft /> cancle{" "}
      </h1>
      <div>
        <p className="text-2xl font-bold mt-4">Create new Meeting</p>
      </div>
      <hr className="text-slate-300" />
      <div className="flex flex-col gap-4 my-4">
        <h2>Meeting name*</h2>
        <Input
          placeholder="Meeting Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMeeting(e.target.value)
          }
        />
      </div>
      <div className="flex flex-col gap-4 my-4">
        <h2>Duration</h2>
        <Button className="max-w-40 text-white">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={() => setDuration(30)}>
              {duration} min
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md p-2 w-40">
              <DropdownMenuItem onClick={() => setDuration(15)}>
                15 Min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDuration(30)}>
                30 Min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDuration(45)}>
                45 Min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDuration(60)}>
                60 Min
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </div>
      <div>
        <h2>Choose Program *</h2>
        <div className="grid grid-cols-3 gap-2">
          {programs.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setProgram(item.name)}
              className={`hover:bg-[#e8f7f6] cursor-pointer flex flex-col gap-3 items-center justify-center border border-slate-200 p-2 ${
                program === item.name && "bg-[#e8f7f6]"
              }`}
            >
              <Image src={item.icon} alt={item.name} width={70} height={70} />
              <h2>{item.name}</h2>
            </div>
          ))}
        </div>
        {program && (
          <>
            <h2 className="mt-4">Add {program} Url*</h2>
            <Input
              placeholder="add url"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProgramUrl(e.target.value)
              }
            />
          </>
        )}
      </div>
      <Button
        className="w-full mt-5"
        disabled={!(meeting && program && programUrl && duration)}
        onClick={onCreateMeeting}
      >
        Create
      </Button>
    </div>
  );
};

export default MeetingFrom;
