"use client";
import { useState } from "react";
import MeetingFrom from "./_components/MeetingFrom";
import { FormValue } from "@/interfaces";
import PreviewMeeting from "./_components/PreviewMeeting";

const CreateMeeting = () => {
  const [formValue, setFormValue] = useState<FormValue | null>(null);
  return (
    <div className="grid md:grid-cols-3  grid-cols-1">
      <div className="border border-slate-300 p-3 shadow-md">
        <MeetingFrom setFormValue={setFormValue} />
      </div>
      <div className="col-span-2">
        <PreviewMeeting formValue={formValue} />
      </div>
    </div>
  );
};

export default CreateMeeting;
