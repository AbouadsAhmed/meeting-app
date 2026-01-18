"use client";
import { Input } from "@/components/ui/input";
import MeetingEventList from "./_components/MeetingEventList";
import { ChangeEvent, useState } from "react";

const MeetintType = () => {
  const [searhTerm, setSearchTearm] = useState("");
  return (
    <div className="p-7">
      <div className="flex flex-col gap-5 mt-10">
        <h2 className="text-4xl font-bold">Your Meeting List</h2>
        <Input
          placeholder="serch event"
          className="max-w-sm border-slate-400"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTearm(e.target.value)
          }
        />
        <hr className="text-slate-400" />
      </div>
      <MeetingEventList searhTerm={searhTerm} setSearchTearm={setSearchTearm} />
    </div>
  );
};

export default MeetintType;
